import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

import { AppEnviroment } from '@/constants';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const cookieEnviroment = request.headers.get('App-Enviroment');
  const isTelegram = cookieEnviroment && cookieEnviroment === AppEnviroment.TELEGRAM;

  return isTelegram
    ? NextResponse.redirect('/mini-app')
    : NextResponse.redirect(`${requestUrl.origin}/auth/login/otp/phone`);
}
