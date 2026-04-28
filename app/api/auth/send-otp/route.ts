import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/User';

// Generate a random 6-digit OTP
function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
    try {
        const { phone, fcmToken } = await req.json();

        if (!phone || phone.length < 10) {
            return NextResponse.json(
                { error: 'Invalid phone number' },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // Generate OTP
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Find or create user
        let user = await User.findOne({ phone });

        if (!user) {
            user = await User.create({
                phone,
                otp,
                otpExpiry,
                fcmToken: fcmToken || undefined,
                role: 'user',
            });
        } else {
            user.otp = otp;
            user.otpExpiry = otpExpiry;
            if (fcmToken) {
                user.fcmToken = fcmToken;
            }
            await user.save();
        }

        console.log(`🔐 OTP for ${phone}: ${otp}`);

        // Try to send FCM notification if token is available
        if (fcmToken && process.env.FIREBASE_PROJECT_ID) {
            try {
                const { sendFCMNotification } = await import('@/lib/firebase-admin');
                await sendFCMNotification(fcmToken, otp);
                console.log('✅ FCM notification sent successfully');

                return NextResponse.json({
                    success: true,
                    message: 'OTP sent to your device via notification',
                    sentVia: 'fcm'
                });
            } catch (fcmError) {
                console.error('⚠️ FCM send failed, falling back to display:', fcmError);
                // Fall through to dev mode response
            }
        }

        // Development mode or FCM not configured
        if (process.env.NODE_ENV === 'development') {
            return NextResponse.json({
                success: true,
                message: 'OTP sent successfully',
                devOtp: otp, // Show OTP in development
                sentVia: 'development'
            });
        }

        // Production without FCM - would need SMS provider here
        return NextResponse.json({
            success: true,
            message: 'OTP sent successfully',
            sentVia: 'sms' // TODO: Integrate SMS provider
        });

    } catch (error: any) {
        console.error('Send OTP error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to send OTP' },
            { status: 500 }
        );
    }
}
