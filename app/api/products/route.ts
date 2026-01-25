import connectToDatabase from '@/lib/db';
import Product from '@/lib/models/Product';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    await connectToDatabase();
    const products = await Product.find({});
    return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
    await connectToDatabase();
    const data = await req.json();
    const product = await Product.create(data);
    return NextResponse.json(product, { status: 201 });
}
