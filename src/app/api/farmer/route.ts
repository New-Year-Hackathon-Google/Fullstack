import { NextResponse } from 'next/server';

let farmerData: any[] = []; // 간단히 메모리로 저장, 실제 서비스에서는 DB 사용

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 필수 필드 검증
    if (!data.helpType || !data.location || !data.duration || !data.skills) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 },
      );
    }

    // 데이터 저장
    farmerData.push(data);

    return NextResponse.json({ message: 'Farmer data saved successfully!' });
  } catch (error) {
    console.error('Error saving farmer data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function GET() {
  // 저장된 농부 데이터 반환
  return NextResponse.json(farmerData);
}
