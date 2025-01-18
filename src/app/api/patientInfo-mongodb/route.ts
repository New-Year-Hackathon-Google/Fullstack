import { connectMongoDB } from '@/lib/mongodb';
import Patient from '@/model/patient';
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

    console.log('Received ID:', id); // 프론트엔드에서 받은 ID 확인

    const existingRecord = await Patient.findById(id);

    console.log('테스트@@@@', existingRecord);

    if (!existingRecord) {
      return NextResponse.json(
        { error: 'Patients not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(existingRecord, { status: 200 });
  } catch (error) {
    console.error('Error fetching Patients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Patients' },
      { status: 500 },
    );
  }
}
