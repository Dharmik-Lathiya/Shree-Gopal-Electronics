// Force rebuild
import NextAuth, { DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import connectToDatabase from './db';
import User from './models/User';
import { nextAuthConfig } from './auth.config';

import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...nextAuthConfig,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                identifier: { label: 'Username or Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.identifier || !credentials?.password) {
                    throw new Error('Username/Email and password are required');
                }

                await connectToDatabase();

                // Find user by email or username
                const user = await User.findOne({
                    $or: [
                        { email: credentials.identifier },
                        { username: credentials.identifier }
                    ]
                });

                if (!user) {
                    throw new Error('No user found with this email or username');
                }

                if (!user.password) {
                    throw new Error('This account does not have a password set. Please sign in with Google or reset your password.');
                }

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isPasswordCorrect) {
                    throw new Error('Invalid password');
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                };
            },
        }) as any,
    ],
    callbacks: {
        ...nextAuthConfig.callbacks,
        async signIn({ user, account }) {
            if (account?.provider === 'google') {
                await connectToDatabase();
                const existingUser = await User.findOne({ email: user.email });
                
                if (!existingUser) {
                    // Create a new user for Google sign-in if they don't exist
                    const newUser = new User({
                        name: user.name,
                        email: user.email,
                        username: user.email?.split('@')[0], // Default username
                        role: 'user',
                    });
                    await newUser.save();
                    user.id = newUser._id.toString();
                    user.role = newUser.role;
                    user.username = newUser.username;
                } else {
                    user.id = existingUser._id.toString();
                    user.role = existingUser.role;
                    user.username = existingUser.username;
                }
            }
            return true;
        },
    },
    secret: process.env.AUTH_SECRET,
});

