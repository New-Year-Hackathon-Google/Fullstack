import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Patient from '@/model/patient';

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

    // 환자 정보 검색
    const patient = await Patient.findOne({ patientId });

    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }

    return NextResponse.json(patient, { status: 200 });
  } catch (error) {
    console.error('Error fetching patient info:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};
