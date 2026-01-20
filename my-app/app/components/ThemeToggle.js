'use client';

import { useTheme } from '@/app/context/ThemeContext';
import styles from './css/ThemeToggle.module.css';

export default function ThemeToggle() {
  const { isDark, toggleTheme, isMounted } = useTheme();

  if (!isMounted) {
    return <div className={styles.themeToggle} aria-hidden />;
  }

  return (
    <button
      onClick={toggleTheme}
      className={styles.themeToggle}
      aria-label="Przełącz między trybem jasnym i ciemnym"
    >
      <span
        className={`${styles.themeToggleSlider} ${isDark ? styles.dark : ''}`.trim()}
      />
      <span className={`${styles.themeIcon} ${styles.themeIconSun}`}>☀️</span>
      <span className={`${styles.themeIcon} ${styles.themeIconMoon}`}>🌙</span>
    </button>
  );
}
