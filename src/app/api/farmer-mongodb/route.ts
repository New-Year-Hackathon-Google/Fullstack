import { connectMongoDB } from '@/lib/mongodb';
import FarmerForm, { IFarmerForm } from '@/model/farmerForm';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectMongoDB();

    // Fetch all documents from the farmerForm collection
    const farmers: IFarmerForm[] = await FarmerForm.find({});

    return NextResponse.json({ farmers }, { status: 200 });
  } catch (error) {
    console.error('Error fetching farmers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch farmers' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    // Parse the JSON body from the request
    const body = await request.json();

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
