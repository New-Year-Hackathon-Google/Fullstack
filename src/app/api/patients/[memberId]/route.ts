import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(
  req: Request,
  { params }: { params: { memberId: string } },
) {
  const apiUrl = `http://backya.duckdns.org:8080/api/v1/patients/${params.memberId}`;

  try {
    // Fetch data from the external API using Axios
    const response = await axios.get(apiUrl);

    // Return the data as a JSON response
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching patient data:', error);

    // Handle HTTP errors and network errors
    return NextResponse.json(
      {
        error: error.response
          ? `Failed to fetch patient data: ${error.response.statusText}`
          : 'An error occurred while fetching patient data',
      },
      { status: error.response ? error.response.status : 500 },
    );
  }
}
