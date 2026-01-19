'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import AuthForm from '@/app/components/AuthForm';
import GoogleButton from '@/app/components/GoogleButton';
import useInteractiveGradient from '@/app/hooks/useInteractiveGradient';

export default function RegisterPage() {
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
      const confirmPassword = formData.get('confirmPassword');
      const name = formData.get('name');

      // Walidacja
      if (password !== confirmPassword) {
        setError('Hasła nie są identyczne');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Hasło musi mieć co najmniej 6 znaków');
        setLoading(false);
        return;
      }

      // Symulacja logowania - backend będzie dodany później
      console.log('Dane rejestracji:', { email, password, name });

      // Tymczasowo: ustawimy użytkownika w state (bez backend)
      setUser({
        email,
        name,
        id: Math.random().toString(),
      });

      setIsLoggedIn(true);
      router.push('/notes');
    } catch (err) {
      setError('Błąd podczas rejestracji. Spróbuj ponownie.');
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
          <h1 className="auth-title">Utwórz konto</h1>
          <p className="auth-subtitle">
            Dołącz do nas i zacznij organizować swoje notatki
          </p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AuthForm title={loading ? 'Rejestrowanie...' : 'Zarejestruj się'} onSubmit={handleSubmit} />

          <div className="divider">
            <span className="divider-text">Lub</span>
          </div>

          <GoogleButton />
        </div>

        <p className="auth-link">
          Masz już konto?{' '}
          <Link href="/login">Zaloguj się</Link>
        </p>
      </div>
    </div>
  );
}
