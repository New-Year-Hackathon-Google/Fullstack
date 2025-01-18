import axios from 'axios';

export async function POST(req: Request) {
  try {
    const body = await req.json(); // 요청 본문에서 데이터 추출
    const { patientId, accessToken } = body;

    console.log('환자 테스트 아이디!!!', patientId);

    if (!patientId) {
      return new Response(JSON.stringify({ error: 'patientId is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiUrl = `http://backya.duckdns.org:8080/api/v1/healthStatus`;

    // POST 요청으로 patientId 전달
    const response = await axios.post(
      apiUrl,
      { patientId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    console.log('테스트', response.data);

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error fetching health status data:', error);

    return new Response(
      JSON.stringify({
        error: error.response
          ? `Failed to fetch health status: ${error.response.statusText}`
          : 'An error occurred while fetching health status',
      }),
      {
        status: error.response?.status || 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
