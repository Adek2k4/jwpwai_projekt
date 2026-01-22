import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { applyAuthCookie, createAuthToken, sanitizeUser } from '@/lib/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const email = body?.email?.toLowerCase().trim();
    const password = body?.password;

    if (!email || !password) {
      return NextResponse.json({ error: 'Brakuje wymaganych pól' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: 'Nieprawidłowy e-mail lub hasło' }, { status: 401 });
    }

    if (!user.password) {
      return NextResponse.json({ error: 'Konto zostało utworzone przez Google. Ustaw hasło, aby się zalogować.' }, { status: 400 });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return NextResponse.json({ error: 'Nieprawidłowy e-mail lub hasło' }, { status: 401 });
    }

    const token = createAuthToken(user);
    const response = NextResponse.json({ user: sanitizeUser(user) }, { status: 200 });
    applyAuthCookie(response, token);
    return response;
  } catch (error) {
    console.error('Login error', error);
    return NextResponse.json({ error: 'Nie udało się zalogować' }, { status: 500 });
  }
}
