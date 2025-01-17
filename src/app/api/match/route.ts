import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const farmerData = await getFarmerData();
    const youthData = await getYouthData();

    if (farmerData.length === 0 || youthData.length === 0) {
      return NextResponse.json(
        { error: 'No data available for matching', matches: [] },
        { status: 400 },
      );
    }

    const prompt = `
        Match farmers and youths based on their requirements and capabilities.
        Only provide the output as a JSON array in the following format, without any additional text or explanation:
  
        [
          { "farmer": "<farmer_id>", "youth": "<youth_id>" },
          ...
        ]
  
        Farmers: ${JSON.stringify(farmerData)}
        Youths: ${JSON.stringify(youthData)}
      `;

    const openAiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a smart matchmaker between farmers and youths.',
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    let matches = openAiResponse.data.choices?.[0]?.message?.content?.trim();

    if (!matches.startsWith('[')) {
      const matchStartIndex = matches.indexOf('[');
      matches = matches.slice(matchStartIndex);
    }

    let parsedMatches = [];
    try {
      parsedMatches = JSON.parse(matches);
    } catch (error) {
      console.error('Failed to parse OpenAI response:', matches, error);
      return NextResponse.json(
        { error: 'Failed to parse OpenAI response', response: matches },
        { status: 500 },
      );
    }

    if (!Array.isArray(parsedMatches)) {
      console.error('Invalid data format from OpenAI:', parsedMatches);
      return NextResponse.json(
        { error: 'Invalid data format from OpenAI', response: parsedMatches },
        { status: 500 },
      );
    }

    return NextResponse.json({ matches: parsedMatches });
  } catch (error) {
    console.error('Error matching data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
