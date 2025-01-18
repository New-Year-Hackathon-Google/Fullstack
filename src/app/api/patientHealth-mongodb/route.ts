import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import HealthRecord from '@/model/healthRecord';

export const POST = async (req: Request) => {
  try {
    const { patientId } = await req.json();

    if (!patientId) {
      return NextResponse.json(
        { error: 'patientId is required' },
        { status: 400 },
      );
    }

    // MongoDB 연결
    await connectMongoDB();

    // 건강 기록 검색
    const healthRecord = await HealthRecord.findOne({ patientId });

    if (!healthRecord) {
      return NextResponse.json(
        { error: 'Health record not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(healthRecord, { status: 200 });
  } catch (error) {
    console.error('Error fetching health record:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};
