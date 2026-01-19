'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white px-4 py-20 dark:from-slate-800 dark:to-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8 inline-flex items-center justify-center rounded-full bg-blue-100 px-4 py-2 dark:bg-blue-900">
          <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
            ✨ Witaj w NotesApp - Twój osobisty notatnik
          </span>
        </div>

        <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
          Twoje notatki,{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            zawsze w zasięgu
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-xl text-slate-600 dark:text-slate-300">
          Łatwe zarządzanie notatkami tekstowymi z możliwością dodawania zdjęć. Bezpieczne
          przechowywanie w chmurze i dostęp z dowolnego urządzenia.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Daj się poznać za darmo
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-8 py-3 text-lg font-medium text-slate-900 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
          >
            Zaloguj się
          </Link>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="pointer-events-none absolute -right-20 top-20 h-96 w-96 rounded-full bg-gradient-to-br from-blue-200 to-transparent opacity-20 dark:from-blue-500 dark:to-transparent"></div>
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-gradient-to-tr from-purple-200 to-transparent opacity-20 dark:from-purple-500 dark:to-transparent"></div>
    </section>
  );
}
