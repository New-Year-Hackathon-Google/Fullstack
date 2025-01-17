import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. 요청 본문에서 프롬프트 데이터 가져오기
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 },
      );
    }

    // 2. OpenAI API 호출
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 1000, // 응답의 최대 토큰 길이
        temperature: 0.7, // 창의성 조정 (0~1 사이값)
      }),
    });

    // 3. OpenAI 응답 처리
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error.message },
        { status: response.status },
      );
    }

    const data = await response.json();

    // 4. 응답 데이터 반환
    return NextResponse.json({
      response: data.choices[0]?.message?.content || 'No response from AI',
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
