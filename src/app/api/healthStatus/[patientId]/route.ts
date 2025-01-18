import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { patientId: string } },
) {
  const apiUrl = `http://backya.duckdns.org:8080/api/v1/healthStatus/${params.patientId}`;

  try {
    // Fetch health status data from the external API
    const response = await axios.get(apiUrl);

    // Return the health status data as a JSON response
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching health status data:', error);

    // Handle HTTP errors and network errors
    return NextResponse.json(
      {
        error: error.response
          ? `Failed to fetch health status: ${error.response.statusText}`
          : 'An error occurred while fetching health status',
      },
      { status: error.response ? error.response.status : 500 },
    );
  }
}
