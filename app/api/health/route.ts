import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    app: 'Kadadi Motors & Insurance Advisory Desk',
    framework: 'Next.js 15 App Router',
    timestamp: new Date().toISOString(),
  });
}
