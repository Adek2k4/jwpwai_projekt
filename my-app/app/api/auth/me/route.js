import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthCookieName, sanitizeUser, verifyAuthToken } from '@/lib/auth';

export async function GET(request) {
  try {
    const token = request.cookies.get(getAuthCookieName())?.value;

    if (!token) {
      return NextResponse.json({ error: 'Brak tokenu' }, { status: 401 });
    }

    const decoded = verifyAuthToken(token);
    const user = await prisma.user.findUnique({ where: { id: decoded.sub } });

    if (!user) {
      return NextResponse.json({ error: 'Użytkownik nie istnieje' }, { status: 401 });
    }

    return NextResponse.json({ user: sanitizeUser(user) });
  } catch (error) {
    console.error('Me error', error);
    return NextResponse.json({ error: 'Sesja wygasła lub token jest nieprawidłowy' }, { status: 401 });
  }
}
