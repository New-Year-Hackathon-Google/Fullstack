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
        You are a professional and highly knowledgeable AI assistant.
        Your task is to generate data related to the patient’s condition for use in a real-time monitoring dashboard.
        Respond in English with clear, concise, and formal language, avoiding any markdown syntax, asterisks, or special characters.
        Focus on providing accurate and actionable information based on the patient’s health metrics and state.

        Important:
            •	Do not use markdown syntax (*, **, #, etc.).
            •	Write in natural, complete sentences without using bullet points or numbered lists.
            •	Maintain a professional and formal tone, ensuring logical flow and precision.

        Question: ${prompt}
    `;

    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ response: text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Something went wrong' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
