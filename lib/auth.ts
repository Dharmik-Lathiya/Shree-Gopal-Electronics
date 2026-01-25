import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectToDatabase from './db';
import User from './models/User';

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Phone OTP',
            credentials: {
                phone: { label: 'Phone', type: 'text' },
                otp: { label: 'OTP', type: 'text' },
            },
            async authorize(credentials) {
                if (!credentials?.phone || !credentials?.otp) {
                    throw new Error('Phone and OTP are required');
                }

                await connectToDatabase();

                // Find user by phone
                const user = await User.findOne({ phone: credentials.phone });

                if (!user) {
                    throw new Error('User not found. Please request OTP first.');
                }

                // Check if OTP is expired
                if (user.otpExpiry && new Date() > new Date(user.otpExpiry)) {
                    throw new Error('OTP has expired. Please request a new one.');
                }

                // Verify OTP
                if (user.otp !== credentials.otp) {
                    throw new Error('Invalid OTP');
                }

                // Clear OTP after successful verification
                user.otp = undefined;
                user.otpExpiry = undefined;

                // Set default name if not exists
                if (!user.name) {
                    user.name = `User ${credentials.phone.slice(-4)}`;
                }

                await user.save();

                return {
                    id: user._id.toString(),
                    name: user.name,
                    phone: user.phone,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.phone = token.phone as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.phone = user.phone;
            }
            return token;
        },
    },
    pages: {
        signIn: '/auth/login',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.AUTH_SECRET,
});
