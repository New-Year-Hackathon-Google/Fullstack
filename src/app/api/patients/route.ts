import { NextResponse } from 'next/server';
import axios from 'axios';

const apiUrl = 'http://backya.duckdns.org:8080/api/v1/patients';

export async function GET() {
  try {
    const response = await axios.get(apiUrl);

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Error fetching patients data:', error);

    return NextResponse.json(
      {
        error: error.response
          ? `Failed to fetch patients data: ${error.response.statusText}`
          : 'An error occurred while fetching patients data',
      },
      { status: error.response ? error.response.status : 500 },
    );
  }
}

export async function POST(req: Request) {
  const apiUrl = 'http://backya.duckdns.org:8080/api/v1/patients';

  try {
    // Parse the incoming request body
    const body = await req.json();

    // Send the data to the external API using Axios
    const response = await axios.post(apiUrl, body);

    // Return the response data as a JSON response
    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    console.error('Error creating patient data:', error);

    // Handle HTTP errors and network errors
    return NextResponse.json(
      {
        error: error.response
          ? `Failed to create patient data: ${error.response.statusText}`
          : 'An error occurred while creating patient data',
      },
      { status: error.response ? error.response.status : 500 },
    );
  }
}
