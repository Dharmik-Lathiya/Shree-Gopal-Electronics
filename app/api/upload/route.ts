import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
    try {
        // Check authentication
        const session = await auth();
        if (!session?.user || !('role' in session.user) || session.user.role !== 'admin') {
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

        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString('base64');
        const dataURI = `data:${file.type};base64,${base64}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: `jay-gopal-electronics/${folder}`,
            resource_type: 'auto',
            transformation: [
                { width: 1200, height: 1200, crop: 'limit' },
                { quality: 'auto:good' },
                { fetch_format: 'auto' }
            ]
        });

        return NextResponse.json({
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format
        });
    } catch (error: any) {
        console.error('Image upload error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to upload image' },
            { status: 500 }
        );
    }
}

// DELETE endpoint to remove images from Cloudinary
export async function DELETE(req: NextRequest) {
    try {
        // Check authentication
        const session = await auth();
        if (!session?.user || !('role' in session.user) || session.user.role !== 'admin') {
            return NextResponse.json(
                { error: 'Unauthorized. Admin access required.' },
                { status: 401 }
            );
        }

        const { publicId } = await req.json();

        if (!publicId) {
            return NextResponse.json(
                { error: 'No public ID provided' },
                { status: 400 }
            );
        }

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(publicId);

        return NextResponse.json({ message: 'Image deleted successfully' });
    } catch (error: any) {
        console.error('Image delete error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to delete image' },
            { status: 500 }
        );
    }
}
