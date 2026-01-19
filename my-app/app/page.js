import Link from 'next/link';

export const metadata = {
  title: 'NotesApp - Zarządzanie notatkami',
  description: 'Szybka aplikacja do notatek tekstowych i zdjęć',
};

export default function Home() {
  return (
    <section className="hero">
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
