'use client';

import { useTheme } from '@/app/context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme, isMounted } = useTheme();

  if (!isMounted) {
    return <div className="theme-toggle" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Przełącz między trybem jasnym i ciemnym"
    >
      <span className={`theme-toggle-slider ${isDark ? 'dark' : ''}`} />
      <span className="theme-icon theme-icon-sun">☀️</span>
      <span className="theme-icon theme-icon-moon">🌙</span>
    </button>
  );
}
