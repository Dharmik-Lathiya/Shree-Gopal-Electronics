import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Blog from '@/lib/models/Blog';
import mongoose from 'mongoose';

// GET single blog
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: 'Invalid blog ID' },
                { status: 400 }
            );
        }

        const blog = await Blog.findById(id);

        if (!blog) {
            return NextResponse.json(
                { error: 'Blog not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(blog);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to fetch blog' },
            { status: 500 }
        );
    }
}

// UPDATE blog
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: 'Invalid blog ID' },
                { status: 400 }
            );
        }

        const body = await req.json();
        const blog = await Blog.findByIdAndUpdate(id, body, { new: true });

        if (!blog) {
            return NextResponse.json(
                { error: 'Blog not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(blog);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to update blog' },
            { status: 500 }
        );
    }
}

// DELETE blog
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: 'Invalid blog ID' },
                { status: 400 }
            );
        }

        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return NextResponse.json(
                { error: 'Blog not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Blog deleted successfully' });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to delete blog' },
            { status: 500 }
        );
    }
}
