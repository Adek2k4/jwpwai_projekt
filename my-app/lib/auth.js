import jwt from 'jsonwebtoken';

const AUTH_COOKIE_NAME = 'auth_token';
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

export function sanitizeUser(user) {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
}

export function createAuthToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyAuthToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

export function applyAuthCookie(response, token) {
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: WEEK_IN_SECONDS,
    path: '/',
  });
  return response;
}

export function clearAuthCookie(response) {
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: '',
    maxAge: 0,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  return response;
}

export function getAuthCookieName() {
  return AUTH_COOKIE_NAME;
}
