import FarmerForm from '@/app/match/farmer/_components/FarmerForm';
import { connectMongoDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

// GET: Fetch all farmer data
export async function GET() {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Fetch all documents from the farmerForm collection
    const farmers = await FarmerForm.find({});

    return NextResponse.json({ farmers }, { status: 200 });
  } catch (error) {
    console.error('Error fetching farmers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch farmers' },
      { status: 500 },
    );
  }
}

// POST: Add new farmer data
export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Parse the JSON body from the request
    const body = await request.json();

    // Validate required fields
    const { id, name, type, imageUrl, duration } = body;
    if (!id || !name || !type || !imageUrl || !duration) {
      return NextResponse.json(
        {
          error: 'All fields (id, name, type, imageUrl, duration) are required',
        },
        { status: 400 },
      );
    }

    // Create a new farmer document
    const newFarmer = await FarmerForm.create({
      id,
      name,
      type,
      imageUrl,
      duration,
    });

    return NextResponse.json(
      { message: 'Farmer data saved successfully!', farmer: newFarmer },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error saving farmer:', error);
    return NextResponse.json(
      { error: 'Failed to save farmer data' },
      { status: 500 },
    );
  }
}
