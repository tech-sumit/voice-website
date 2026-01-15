import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { language, gender, text } = body;

        // Validate required fields
        if (!language || !gender || !text) {
            return NextResponse.json(
                { error: 'Missing required fields: language, gender, text' },
                { status: 400 }
            );
        }

        // Validate text length
        if (text.length > 5000) {
            return NextResponse.json(
                { error: 'Text exceeds maximum length of 5000 characters' },
                { status: 400 }
            );
        }

        // Call internal TTS API
        const ttsApiUrl = 'https://67c8f5b65b0f.ngrok-free.app';
        const response = await fetch(`${ttsApiUrl}/synthesize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                language,
                gender,
                text,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                { error: errorData.message || 'TTS synthesis failed' },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json({
            audio: data.audio,
            tokens: data.tokens,
            timeCost: data.time_cost,
        });

    } catch (error) {
        console.error('TTS API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
