import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import path from 'path';
import { writeFile, mkdir, unlink } from 'fs/promises';

export async function POST(req: NextRequest) {
    try {
        // Check authentication
        const session = await auth();
        if (!session?.user || (session.user as any).role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized. Admin access required.' },
                { status: 401 }
            );
        }

        const formData = await req.formData();
        const file = formData.get('file') as File;
        const folder = formData.get('folder') as string || 'general';

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize filename and add timestamp
        const timestamp = Date.now();
        const sanitizedName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
        const filename = `${timestamp}-${sanitizedName}`;
        
        // Define paths
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
        const absolutePath = path.join(uploadDir, filename);
        const relativePath = `/uploads/${folder}/${filename}`;

        // Ensure directory exists
        await mkdir(uploadDir, { recursive: true });

        // Save file
        await writeFile(absolutePath, buffer);

        return NextResponse.json({
            url: relativePath,
            publicId: `${folder}/${filename}`, // Keep for compatibility with existing UI logic
            width: 0,
            height: 0,
            format: file.type.split('/')[1]
        });
    } catch (error: any) {
        console.error('Image upload error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to upload image' },
            { status: 500 }
        );
    }
}

// DELETE endpoint to remove locally stored images
export async function DELETE(req: NextRequest) {
    try {
        // Check authentication
        const session = await auth();
        if (!session?.user || (session.user as any).role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized. Admin access required.' },
                { status: 401 }
            );
        }

        const { publicId } = await req.json();

        if (!publicId) {
            return NextResponse.json(
                { error: 'No public ID (filename) provided' },
                { status: 400 }
            );
        }

        // publicId is "folder/filename"
        const absolutePath = path.join(process.cwd(), 'public', 'uploads', publicId);
        
        await unlink(absolutePath);

        return NextResponse.json({ message: 'Image deleted successfully from local storage' });
    } catch (error: any) {
        console.error('Image delete error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to delete image' },
            { status: 500 }
        );
    }
}
