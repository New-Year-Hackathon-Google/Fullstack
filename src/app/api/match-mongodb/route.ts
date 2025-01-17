import { NextResponse } from 'next/server';
import axios from 'axios';
import { connectMongoDB } from '@/lib/mongodb';
import FarmerForm from '@/model/farmerForm';

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Parse the request body to get youth input data
    const body = await request.json();

    const { name, skills, location, availability } = body;

    if (!name || !skills || !location || !availability) {
      return NextResponse.json(
        {
          error:
            'All fields (name, skills, location, availability) are required',
        },
        { status: 400 },
      );
    }

    // Fetch all farmer data
    const farmerData = await FarmerForm.find({});

    // Transform MongoDB _id field to id for compatibility
    const formattedFarmerData = farmerData.map((farmer) => ({
      ...farmer.toObject(),
      id: farmer._id,
    }));

    if (formattedFarmerData.length === 0) {
      return NextResponse.json(
        { error: 'No farmers available for matching' },
        { status: 400 },
      );
    }

    // Prepare the prompt for OpenAI API
    const prompt = `Match the following youth input with the most suitable farmers based on their requirements and capabilities.\n\nOnly provide the farmer's _id that best matches the youth input. Provide the output as a JSON array in the following format:\n\n[\n  { "farmer": "<farmer_id>", "youth": "<youth_name>" },\n  ...\n]\n\nYouth: ${JSON.stringify({ name, skills, location, availability })}\nFarmers: ${JSON.stringify(formattedFarmerData)}`;

    // Call OpenAI API to process the matching
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

    console.log(
      'OpenAI Response:',
      openAiResponse.data.choices?.[0]?.message?.content,
    );

    let matches = openAiResponse.data.choices?.[0]?.message?.content?.trim();

    // Extract JSON portion of the response
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

    // Validate the parsed matches
    if (!Array.isArray(parsedMatches)) {
      console.error('Invalid data format from OpenAI:', parsedMatches);
      return NextResponse.json(
        { error: 'Invalid data format from OpenAI', response: parsedMatches },
        { status: 500 },
      );
    }

    // Fetch farmer details from MongoDB using the matched ids
    const matchedFarmers = await Promise.all(
      parsedMatches.map(async (match) => {
        const farmer = await FarmerForm.findById(match.farmer);
        return farmer ? { farmer, youth: match.youth } : null;
      }),
    );

    // Filter out any null results (in case some farmers were not found)
    const validMatches = matchedFarmers.filter((item) => item !== null);

    // Return the matched data
    return NextResponse.json({ matches: validMatches });
  } catch (error) {
    console.error('Error matching data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
