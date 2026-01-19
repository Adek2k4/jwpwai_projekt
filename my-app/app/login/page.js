'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import AuthForm from '@/app/components/AuthForm';
import GoogleButton from '@/app/components/GoogleButton';
import useInteractiveGradient from '@/app/hooks/useInteractiveGradient';

export default function LoginPage() {
  const router = useRouter();
  const { setIsLoggedIn, setUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const pageRef = useInteractiveGradient();

  const handleSubmit = async (formData) => {
    setError('');
    setLoading(true);

    try {
      const email = formData.get('email');
      const password = formData.get('password');

      // Walidacja
      if (!email || !password) {
        setError('Wypełnij wszystkie pola');
        setLoading(false);
        return;
      }

      // Symulacja logowania - backend będzie dodany później
      console.log('Dane logowania:', { email, password });

      // Tymczasowo: ustawimy użytkownika w state (bez backend)
      setUser({
        email,
        name: email.split('@')[0],
        id: Math.random().toString(),
      });

      setIsLoggedIn(true);
      router.push('/notes');
    } catch (err) {
      setError('Błąd podczas logowania. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={pageRef} className="auth-page" style={{ '--hero-mouse-x': '50%', '--hero-mouse-y': '50%' }}>
      <div className="auth-container">
        <div className="auth-header">
          <Link href="/" className="auth-logo">
            <div className="logo-container">
              <Image
                src="/logo.webp"
                alt="NotesApp logo"
                width={40}
                height={40}
                className="logo-image"
              />
            </div>
          </Link>
          <h1 className="auth-title">Zaloguj się</h1>
          <p className="auth-subtitle">Wróć do swoich notatek</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AuthForm 
            title={loading ? 'Logowanie...' : 'Zaloguj się'} 
            onSubmit={handleSubmit}
            isLogin={true}
          />

          <div style={{ textAlign: 'center' }}>
            <Link href="#" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--blue-primary)', textDecoration: 'none' }}>
              Zapomniałeś hasła?
            </Link>
          </div>

          <div className="divider">
            <span className="divider-text">Lub</span>
          </div>

          <GoogleButton />
        </div>

        <p className="auth-link">
          Nie masz jeszcze konta?{' '}
          <Link href="/register">Zarejestruj się</Link>
        </p>
      </div>
    </div>
  );
}
