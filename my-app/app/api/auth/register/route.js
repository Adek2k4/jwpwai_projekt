import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { applyAuthCookie, createAuthToken, sanitizeUser } from '@/lib/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const email = body?.email?.toLowerCase().trim();
    const password = body?.password;
    const name = body?.name?.trim();

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Brakuje wymaganych pól' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Hasło musi mieć co najmniej 6 znaków' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Użytkownik o podanym e-mailu już istnieje' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const token = createAuthToken(user);
    const response = NextResponse.json({ user: sanitizeUser(user) }, { status: 201 });
    applyAuthCookie(response, token);
    return response;
  } catch (error) {
    console.error('Register error', error);
    return NextResponse.json({ error: 'Nie udało się zarejestrować' }, { status: 500 });
  }
}
