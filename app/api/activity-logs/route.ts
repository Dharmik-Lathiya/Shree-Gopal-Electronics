import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import ActivityLog from '@/lib/models/ActivityLog';

// GET activity logs
export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get('limit') || '50');
        const resource = searchParams.get('resource');
        const action = searchParams.get('action');

        const query: any = {};
        if (resource) query.resource = resource;
        if (action) query.action = action;

        const logs = await ActivityLog.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean();

        return NextResponse.json(logs);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to fetch activity logs' },
            { status: 500 }
        );
    }
}

// POST - Create activity log
export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const body = await req.json();
        const log = await ActivityLog.create(body);

        return NextResponse.json(log, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to create activity log' },
            { status: 500 }
        );
    }
}
