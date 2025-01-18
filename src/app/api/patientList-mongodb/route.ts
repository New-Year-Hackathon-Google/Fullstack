import { connectMongoDB } from '@/lib/mongodb';
import Patient from '@/model/patient';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectMongoDB();

    const patients = await Patient.find({});

    return NextResponse.json(patients, { status: 200 });
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patients' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const body = await request.json();

    const {
      name,
      dateOfBirth,
      height,
      weight,
      roomNumber,
      bloodType,
      status,
      nurseName,
    } = body;
    if (
      !name ||
      !dateOfBirth ||
      !height ||
      !weight ||
      !roomNumber ||
      !bloodType ||
      !status ||
      !nurseName
    ) {
      return NextResponse.json(
        {
          error:
            'All fields (name, dateOfBirth, roomNumber, bloodType, status, nurseName) are required',
        },
        { status: 400 },
      );
    }

    const newPatient = await Patient.create({
      name,
      dateOfBirth,
      roomNumber,
      bloodType,
      status,
      nurseName,
    });

    return NextResponse.json(
      {
        message: '새로운 환자의 정보가 정상적으로 등록되었습니다.',
        patient: newPatient,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('새로운 환자 정보 등록 실패:', error);
    return NextResponse.json(
      { error: '새로운 환자 정보 등록 실패' },
      { status: 500 },
    );
  }
}
