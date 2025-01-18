import { connectMongoDB } from '@/lib/mongodb';
import HealthRecord from '@/model/healthRecord';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'ID parameter is required' },
        { status: 400 },
      );
    }

    // MongoDB에서 HealthRecord 조회
    const existingRecord = await HealthRecord.findById(id);

    if (!existingRecord) {
      return NextResponse.json(
        { error: 'Health record not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(existingRecord, { status: 200 });
  } catch (error) {
    console.error('Error fetching health record:', error);
    return NextResponse.json(
      { error: 'Failed to fetch health record' },
      { status: 500 },
    );
  }
}
