let youthData: any[] = []; // 메모리에 저장

export async function POST(request: Request) {
  const data = await request.json();
  youthData.push(data);
  return new Response(
    JSON.stringify({ message: 'Youth data saved successfully!' }),
    { status: 200 },
  );
}

export async function GET() {
  return new Response(JSON.stringify(youthData), { status: 200 });
}

// youth 데이터를 가져오는 함수 export
export function getYouthData() {
  return youthData;
}
