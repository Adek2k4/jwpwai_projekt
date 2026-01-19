'use client';

export default function Features() {
  const features = [
    {
      icon: '📝',
      title: 'Notatki tekstowe',
      description: 'Twórz, edytuj i organizuj swoje notatki w prosty i intuicyjny sposób.',
    },
    {
      icon: '🖼️',
      title: 'Dodawaj zdjęcia',
      description: 'Dodawaj zdjęcia do swoich notatek, aby lepiej dokumentować swoje pomysły.',
    },
    {
      icon: '🔒',
      title: 'Bezpieczeństwo',
      description: 'Wszystkie Twoje dane są szyfrowane i przechowywane bezpiecznie w chmurze.',
    },
    {
      icon: '⚡',
      title: 'Szybki dostęp',
      description: 'Dostęp do swoich notatek z dowolnego urządzenia, w dowolnym miejscu.',
    },
    {
      icon: '🌙',
      title: 'Tryb ciemny',
      description: 'Wygodny tryb nocny, który chroni Twoje oczy podczas pracy w nocy.',
    },
    {
      icon: '👥',
      title: 'Współpraca',
      description: 'Udostępniaj notatki innym użytkownikom i pracuj razem w czasie rzeczywistym.',
    },
  ];

  return (
    <section className="bg-white py-20 dark:bg-slate-900 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
            Dlaczego wybrać NotesApp?
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Wszystkie funkcje, których potrzebujesz do efektywnego zarządzania notatkami
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-lg border border-slate-200 bg-slate-50 p-6 transition-all hover:border-blue-500 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-400"
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
