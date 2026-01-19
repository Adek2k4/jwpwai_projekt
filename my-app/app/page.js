'use client';

import Link from 'next/link';
import useInteractiveGradient from '@/app/hooks/useInteractiveGradient';

export default function Home() {
  const heroRef = useInteractiveGradient();

  return (
    <section
      ref={heroRef}
      className="hero"
      style={{ '--hero-mouse-x': '50%', '--hero-mouse-y': '50%' }}
    >
      <div className="hero-content">
        <h1 className="hero-title">NotesApp</h1>
        <p className="hero-description">
          Twórz, organizuj i miej swoje notatki oraz zdjęcia zawsze pod ręką. Zaloguj się lub załóż konto, aby zacząć.
        </p>
        <div className="hero-buttons">
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
