import { connectMongoDB } from '@/lib/mongodb';
import FarmerForm from '@/model/farmerForm';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectMongoDB();
    const farmers = await FarmerForm.find({});

    const formattedFarmers = farmers.map((farmer) => ({
      ...farmer.toObject(),
      id: farmer._id,
    }));

    return NextResponse.json({ farmers: formattedFarmers }, { status: 200 });
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
    const body = await request.json();

    const { name, type, imageUrl, duration } = body;

    if (!name || !type || !imageUrl || !duration) {
      return NextResponse.json(
        { error: 'All fields (name, type, imageUrl, duration) are required' },
        { status: 400 },
      );
    }

    const newFarmer = await FarmerForm.create({
      name,
      type,
      imageUrl,
      duration,
    });
    return NextResponse.json(
      { message: 'Farmer created successfully!', farmer: newFarmer },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating farmer:', error);
    return NextResponse.json(
      { error: 'Failed to create farmer' },
      { status: 500 },
    );
  }
}
