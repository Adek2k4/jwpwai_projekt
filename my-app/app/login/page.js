'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import AuthForm from '@/app/components/AuthForm';
import GoogleButton from '@/app/components/GoogleButton';
import useInteractiveGradient from '@/app/hooks/useInteractiveGradient';
import styles from './page.module.css';

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
    <div ref={pageRef} className={styles.authPage} style={{ '--hero-mouse-x': '50%', '--hero-mouse-y': '50%' }}>
      <div className={styles.authContainer}>
        <div className={styles.authHeader}>
          <Link href="/" className={styles.authLogo}>
            <div className={styles.authLogoBox}>
              <Image
                src="/logo.webp"
                alt="NotesApp logo"
                width={40}
                height={40}
                className={styles.authLogoImage}
              />
            </div>
          </Link>
          <h1 className={styles.authTitle}>Zaloguj się</h1>
          <p className={styles.authSubtitle}>Wróć do swoich notatek</p>
        </div>

        {error && (
          <div className={styles.errorMessage}>
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

          <div className={styles.divider}>
            <span className={styles.dividerText}>Lub</span>
          </div>

          <GoogleButton />
        </div>

        <p className={styles.authLink}>
          Nie masz jeszcze konta?{' '}
          <Link href="/register">Zarejestruj się</Link>
        </p>
      </div>
    </div>
  );
}
