'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Sprawdź czy jesteśmy na kliencie
    if (typeof window === 'undefined') return;

    // Pobierz ustawienie z localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    
    
    setIsDark(shouldBeDark);

    // Zastosuj theme do dokumentu NATYCHMIAST
    const html = document.documentElement;
    if (shouldBeDark) {
      html.classList.add('dark');
      html.style.setProperty('--bg-color', '#0a0a0a');
      html.style.setProperty('--text-color', '#ededed');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      html.style.setProperty('--bg-color', '#ffffff');
      html.style.setProperty('--text-color', '#171717');
      localStorage.setItem('theme', 'light');
    }

    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    const html = document.documentElement;
    
    if (newIsDark) {
      html.classList.add('dark');
      html.style.setProperty('--bg-color', '#0a0a0a');
      html.style.setProperty('--text-color', '#ededed');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      html.style.setProperty('--bg-color', '#ffffff');
      html.style.setProperty('--text-color', '#171717');
      localStorage.setItem('theme', 'light');
    }
    
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, isMounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme musi być używany wewnątrz ThemeProvider');
  }
  return context;
}
