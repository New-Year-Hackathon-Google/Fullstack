let farmerData: any[] = []; // 메모리에 저장

export async function POST(request: Request) {
  const data = await request.json();
  farmerData.push(data);
  return new Response(
    JSON.stringify({ message: 'Farmer data saved successfully!' }),
    { status: 200 },
  );
}

export async function GET() {
  return new Response(JSON.stringify(farmerData), { status: 200 });
}

// farmer 데이터를 가져오는 함수 export
export function getFarmerData() {
  return farmerData;
}
