'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import ThemeToggle from './ThemeToggle';
import styles from './css/Header.module.css';

export default function Header() {
  const router = useRouter();
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContent}`}>
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logoContainer}>
            <Image
              src="/logo.webp"
              alt="NotesApp logo"
              width={40}
              height={40}
              className={styles.logoImage}
            />
          </div>
          <span className={styles.logoText}>NotesApp</span>
        </Link>

        <nav className={styles.nav}>
          <ThemeToggle />

          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className={styles.userInfo}>
                <p className={styles.userName}>{user?.name || 'Użytkownik'}</p>
                <p className={styles.userEmail}>{user?.email}</p>
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
