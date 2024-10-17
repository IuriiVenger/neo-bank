import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);

  return NextResponse.redirect(`${requestUrl.origin}/auth/login/otp`);
}
