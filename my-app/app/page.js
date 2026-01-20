'use client';

import Link from 'next/link';
import useInteractiveGradient from '@/app/hooks/useInteractiveGradient';
import styles from './page.module.css';

export default function Home() {
  const heroRef = useInteractiveGradient();

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      style={{ '--hero-mouse-x': '50%', '--hero-mouse-y': '50%' }}
    >
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>NotesApp</h1>
        <p className={styles.heroDescription}>
          Twórz, organizuj i miej swoje notatki oraz zdjęcia zawsze pod ręką. Zaloguj się lub załóż konto, aby zacząć.
        </p>
        <div className={styles.heroButtons}>
          <Link href="/register" className="btn btn-primary btn-lg">
            Rejestracja
          </Link>
          <Link href="/login" className="btn btn-ghost btn-lg">
            Logowanie
          </Link>
        </div>
      </div>
    </section>
  );
}
