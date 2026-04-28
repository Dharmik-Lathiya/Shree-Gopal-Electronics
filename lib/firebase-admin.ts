import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
        });
        console.log('✅ Firebase Admin initialized');
    } catch (error) {
        console.error('❌ Firebase Admin initialization error:', error);
    }
}

export async function sendFCMNotification(fcmToken: string, otp: string) {
    try {
        const message = {
            notification: {
                title: 'Your OTP Code',
                body: `Your Jay Gopal Electronics OTP is: ${otp}. Valid for 10 minutes.`,
            },
            data: {
                otp: otp,
                type: 'otp_verification',
            },
            token: fcmToken,
        };

        const response = await admin.messaging().send(message);
        console.log('✅ FCM notification sent:', response);
        return { success: true, messageId: response };
    } catch (error) {
        console.error('❌ FCM notification error:', error);
        throw error;
    }
}

export default admin;
