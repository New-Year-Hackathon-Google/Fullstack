import { connectMongoDB } from '@/lib/mongodb';
import YouthForm from '@/model/youthForm';
import { NextResponse } from 'next/server';

// GET: Fetch all youth data
export async function GET() {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Fetch all documents from the youthForm collection
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

// POST: Add new youth data
export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Parse the JSON body from the request
    const body = await request.json();

    // Validate required fields
    const { id, name, skills, location, availability } = body;
    if (!id || !name || !skills || !location || !availability) {
      return NextResponse.json(
        {
          error:
            'All fields (id, name, skills, location, availability) are required',
        },
        { status: 400 },
      );
    }

    // Create a new youth document
    const newYouth = await YouthForm.create({
      id,
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
