import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const enhancedPrompt = `
        당신은 전문적이고 매우 지식이 풍부한 AI 어시스턴트입니다.
    당신의 임무는 환자의 건강 상태 데이터를 바탕으로 실시간 모니터링 대시보드에서 사용할 분석 결과를 생성하는 것입니다.
    응답은 항상 한국어로 작성되며, 명확하고 간결하며 정중한 어조를 유지합니다.

    환자의 데이터를 기반으로 다음 항목을 작성하십시오:
    1. Current Condition:
        - 환자의 데이터가 정상 범위 내에 있는 경우: 건강 상태가 안정적이며 생활에 지장이 없음을 설명하세요.
        - 일부 데이터가 비정상인 경우: 문제되는 점과 예상되는 영향을 설명하고, 현재 상태가 개선될 가능성을 서술하세요.
        - 데이터가 전반적으로 비정상인 경우: 건강 상태가 좋지 않음을 강조하고, 우려되는 점과 필요한 조치를 명시하세요.

    2. Potential Illnesses:
        - 데이터를 바탕으로 발병 가능성이 높은 질병을 구체적으로 설명하세요.

    3. Recommendations:
        - 환자의 상태를 개선하기 위한 구체적인 조치를 명확히 제안하세요.

    4. Additional Info:
        - 환자 상태와 관련된 중요한 세부사항 또는 주의해야 할 점을 작성하세요.
    참고할 prompt: ${prompt}

    `;

    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ response: text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || '오류가 발생했습니다.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
