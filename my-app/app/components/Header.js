'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link href="/" className="logo-link">
          <div className="logo-container">
            <Image
              src="/logo.webp"
              alt="NotesApp logo"
              width={40}
              height={40}
              className="logo-image"
            />
          </div>
          <span className="logo-text">NotesApp</span>
        </Link>

        <nav className="nav">
          <ThemeToggle />

          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="user-info">
                <p className="user-name">{user?.name || 'Użytkownik'}</p>
                <p className="user-email">{user?.email}</p>
              </div>
              <button onClick={handleLogout} className="btn btn-danger">
                Wyloguj
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link href="/login" className="btn btn-secondary">
                Zaloguj
              </Link>
              <Link href="/register" className="btn btn-primary">
                Rejestruj
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
