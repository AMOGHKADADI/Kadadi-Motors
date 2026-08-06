import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: 'Policy inquiry successfully received by Kadadi Motors Next.js API desk.',
      receivedData: body,
      processedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid payload submitted.' },
      { status: 400 }
    );
  }
}
