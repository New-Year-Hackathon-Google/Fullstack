import { connectMongoDB } from '@/lib/mongodb';
import HealthRecord from '@/model/healthRecord';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    // 요청 데이터 파싱
    const body = await request.json();
    const {
      patientId,
      heartRate,
      bloodPressure,
      bloodSugar,
      bodyTemperature,
      pulse,
      oxygenSaturation,
      additionalNotes,
      medications,
    } = body;

    // 필수 데이터 확인
    if (
      !patientId ||
      !heartRate ||
      !bloodPressure ||
      !bloodSugar ||
      !bodyTemperature ||
      !pulse ||
      !oxygenSaturation
    ) {
      return NextResponse.json(
        { error: 'All required fields must be provided.' },
        { status: 400 },
      );
    }

    // 환자의 건강 기록 생성
    const newRecord = await HealthRecord.create({
      patientId,
      heartRate,
      bloodPressure,
      bloodSugar,
      bodyTemperature,
      pulse,
      oxygenSaturation,
      additionalNotes: additionalNotes || '',
      medications: medications || [],
    });

    return NextResponse.json(
      {
        message: 'Health record created successfully.',
        record: newRecord,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating health record:', error);
    return NextResponse.json(
      { error: 'Failed to create health record.' },
      { status: 500 },
    );
  }
}
