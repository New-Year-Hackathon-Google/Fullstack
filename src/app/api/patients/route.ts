import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // 클라이언트에서 accessToken을 전달받음 (쿼리 파라미터 또는 헤더)
    const accessToken = req.headers
      .get('authorization')
      ?.replace('Bearer ', '');

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: 'Access token is required' },
        { status: 401 },
      );
    }

    const response = await axios.get(
      'https://dev.silver-bridge.kr/api/v1/patients',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return NextResponse.json({
      success: true,
      data: response.data,
    });
  } catch (error: any) {
    console.error('Error:', error);

    return NextResponse.json(
      {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          'Unknown error occurred',
      },
      { status: error.response?.status || 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { memberId, accessToken } = body;

    if (!memberId) {
      return new Response(JSON.stringify({ error: 'memberId is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiUrl = `https://dev.silver-bridge.kr/api/v1/patients/member`;

    // POST 요청으로 memberId 전달
    const response = await axios.post(
      apiUrl,
      { memberId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Error fetching patient data:', error);

    return new Response(
      JSON.stringify({
        error: error.response
          ? `Failed to fetch patient data: ${error.response.statusText}`
          : 'An error occurred while fetching patient data',
      }),
      {
        status: error.response?.status || 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
