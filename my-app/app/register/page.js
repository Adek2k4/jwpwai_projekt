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

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
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

      await register({ email, password, name });
      router.push('/notes');
    } catch (err) {
      setError(err.message || 'Błąd podczas rejestracji. Spróbuj ponownie.');
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
          <h1 className={styles.authTitle}>Utwórz konto</h1>
          <p className={styles.authSubtitle}>
            Dołącz do nas i zacznij organizować swoje notatki
          </p>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AuthForm title={loading ? 'Rejestrowanie...' : 'Zarejestruj się'} onSubmit={handleSubmit} />

          <div className={styles.divider}>
            <span className={styles.dividerText}>Lub</span>
          </div>

          <GoogleButton />
        </div>

        <p className={styles.authLink}>
          Masz już konto?{' '}
          <Link href="/login">Zaloguj się</Link>
        </p>
      </div>
    </div>
  );
}
