import { NextResponse } from 'next/server';

let youthData: any[] = []; // 간단히 메모리로 저장, 실제 서비스에서는 DB 사용

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 필수 필드 검증
    if (
      !data.availableHelp ||
      !data.location ||
      !data.availability ||
      !data.skills
    ) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 },
      );
    }

    // 데이터 저장
    youthData.push(data);

    return NextResponse.json({ message: 'Youth data saved successfully!' });
  } catch (error) {
    console.error('Error saving youth data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function GET() {
  // 저장된 청년 데이터 반환
  return NextResponse.json(youthData);
}
