import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/User';
import { sendOTPEmail } from '@/lib/email';

// Generate a random 6-digit OTP
function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Validate email format
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export async function POST(req: NextRequest) {
    try {
        const { email, phone } = await req.json();

        // Validate email
        if (!email || !isValidEmail(email)) {
            return NextResponse.json(
                { error: 'Valid email address is required' },
                { status: 400 }
            );
        }

        // Validate phone (optional but recommended)
        if (phone && phone.length < 10) {
            return NextResponse.json(
                { error: 'Invalid phone number' },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // Generate OTP
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Find or create user by email
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                email,
                phone: phone || undefined,
                otp,
                otpExpiry,
                role: 'user',
            });
        } else {
            user.otp = otp;
            user.otpExpiry = otpExpiry;
            if (phone) {
                user.phone = phone;
            }
            await user.save();
        }

        console.log(`🔐 OTP for ${email}: ${otp}`);

        // Send OTP via email
        try {
            await sendOTPEmail(email, otp, user.name);
            console.log('✅ OTP email sent successfully');

            return NextResponse.json({
                success: true,
                message: 'OTP sent to your email address',
                sentVia: 'email',
                email: email,
            });
        } catch (emailError: any) {
            console.error('❌ Email send failed:', emailError);

            // In development, still return success but log the OTP
            if (process.env.NODE_ENV === 'development') {
                console.log('📧 DEV MODE - OTP:', otp);
                return NextResponse.json({
                    success: true,
                    message: 'OTP generated (check console in dev mode)',
                    sentVia: 'console',
                    devOTP: otp, // Only in development
                });
            }

            return NextResponse.json(
                { error: 'Failed to send OTP email. Please try again.' },
                { status: 500 }
            );
        }

    } catch (error: any) {
        console.error('Send OTP error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to send OTP' },
            { status: 500 }
        );
    }
}
