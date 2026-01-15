import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiting (reset on server restart)
const ipRequestCounts = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_MAX = 100; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour window

// Check rate limit for an IP address
function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = ipRequestCounts.get(ip);

    if (!record) {
        ipRequestCounts.set(ip, { count: 1, timestamp: now });
        return true;
    }

    // Reset if window has passed
    if (now - record.timestamp > RATE_LIMIT_WINDOW_MS) {
        ipRequestCounts.set(ip, { count: 1, timestamp: now });
        return true;
    }

    // Check if limit exceeded
    if (record.count >= RATE_LIMIT_MAX) {
        return false;
    }

    // Increment count
    record.count += 1;
    ipRequestCounts.set(ip, record);
    return true;
}

export async function POST(request: NextRequest) {
    try {
        // Get IP address for rate limiting
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
            request.headers.get('x-real-ip') ||
            'unknown-ip';

        // Check rate limit
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: 'Rate limit exceeded. Please try again later.' },
                { status: 429 }
            );
        }

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
