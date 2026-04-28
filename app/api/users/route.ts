import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/lib/models/User';

// GET all users with filtering, sorting, and pagination
export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const searchParams = req.nextUrl.searchParams;

        // Pagination
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        // Filtering
        const role = searchParams.get('role');
        const search = searchParams.get('search');

        // Sorting
        const sortBy = searchParams.get('sortBy') || 'createdAt';
        const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;

        // Build query
        const query: any = {};

        if (role && role !== 'all') {
            query.role = role;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } }
            ];
        }

        // Execute query with pagination
        const [users, total] = await Promise.all([
            User.find(query)
                .select('-otp -otpExpiry')
                .sort({ [sortBy]: sortOrder })
                .skip(skip)
                .limit(limit)
                .lean(),
            User.countDocuments(query)
        ]);

        return NextResponse.json({
            users,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error: any) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

// POST - Create new user (if needed for admin panel)
export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const body = await req.json();
        const { name, email, phone, role } = body;

        // Validation
        if (!email && !phone) {
            return NextResponse.json(
                { error: 'Either email or phone is required' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const orConditions = [];
        if (email) orConditions.push({ email });
        if (phone) orConditions.push({ phone });

        const existingUser = await User.findOne({
            $or: orConditions
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email or phone already exists' },
                { status: 409 }
            );
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            phone,
            role: role || 'user'
        });

        return NextResponse.json(
            user.toObject({
                versionKey: false, transform: (doc: any, ret: any) => {
                    delete ret.otp;
                    delete ret.otpExpiry;
                    return ret;
                }
            }),
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create user' },
            { status: 500 }
        );
    }
}
