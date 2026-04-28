import connectToDatabase from '@/lib/db';
import Blog from '@/lib/models/Blog';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    await connectToDatabase();
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
}

export async function POST(req: NextRequest) {
    // Add auth check here in real app
    await connectToDatabase();
    const data = await req.json();
    // Simple slug generation
    if (!data.slug) {
        data.slug = data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }
    const blog = await Blog.create(data);
    return NextResponse.json(blog, { status: 201 });
}
