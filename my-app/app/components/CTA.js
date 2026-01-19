'use client';

import Link from 'next/link';

export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-20 dark:from-blue-500 dark:to-purple-500 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold text-white">
          Gotowy na start?
        </h2>
        <p className="mt-4 text-lg text-blue-100">
          Zarejestruj się dzisiaj i zacznij organizować swoje notatki
        </p>

        <Link
          href="/register"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-lg font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-500"
        >
          Utwórz konto za darmo
        </Link>
      </div>
    </section>
  );
}
