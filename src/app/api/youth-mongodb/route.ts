import { connectMongoDB } from '@/lib/mongodb';
import YouthForm from '@/model/youthForm';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectMongoDB();

    const youths = await YouthForm.find({});

    return NextResponse.json({ youths }, { status: 200 });
  } catch (error) {
    console.error('Error fetching youths:', error);
    return NextResponse.json(
      { error: 'Failed to fetch youths' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const body = await request.json();

    // Validate required fields
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

    // Create a new youth document
    const newYouth = await YouthForm.create({
      name,
      skills,
      location,
      availability,
    });

    return NextResponse.json(
      { message: 'Youth data saved successfully!', youth: newYouth },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error saving youth:', error);
    return NextResponse.json(
      { error: 'Failed to save youth data' },
      { status: 500 },
    );
  }
}
