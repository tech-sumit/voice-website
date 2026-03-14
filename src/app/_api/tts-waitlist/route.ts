import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Google Apps Script endpoint
    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbzBvj7eK1jPGywwbZhWSTzsdzRPTpHGXSS8twOvhT6i6IIzrhVtrMNA3eSAwBMpZx6dfw/exec';
    const token = 'REPLACE_WITH_LONG_RANDOM_SECRET';

    // Send data to Google Sheets
    const response = await fetch(`${googleScriptUrl}?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'TTS Waitlist',
        email: email,
        score: new Date().toISOString(),
      }),
      redirect: 'follow',
    });

    if (!response.ok) {
      console.error('Google Script Error:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to process waitlist signup' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist!'
    });

  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
