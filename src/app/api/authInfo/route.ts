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
      'https://dev.silver-bridge.kr/api/v1/member/me',
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
