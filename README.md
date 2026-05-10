# NotesApp
Projekt aplikacji do notatek z logowaniem i obsluga obrazow, zbudowany w Next.js. Dane notatek sa powiazane z uzytkownikami i zapisywane w MongoDB przez Prisma. Aplikacja oferuje logowanie e-mail i haslo oraz Google OAuth.

Demo: https://jwpwai-projekt.vercel.app/

## Funkcje
- rejestracja i logowanie (email/haslo) oraz Google OAuth
- tworzenie, edycja i usuwanie notatek
- zalaczanie obrazow do notatek i podglad
- wyszukiwanie, widok siatki i listy

## Stack
- Next.js 16 (App Router), React
- Prisma + MongoDB
- JWT, bcryptjs

## Uruchomienie lokalne
```
cd my-app
npm install
```

Utworz plik .env i ustaw:
```
DATABASE_URL=...
JWT_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REDIRECT_URI=...
```

```
npx prisma generate
npx prisma db push
npm run dev
```

Aplikacja startuje domyslnie na http://localhost:3000.
