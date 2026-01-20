import './globals.css';
import RootLayoutClient from '@/app/components/RootLayoutClient';

export const metadata = {
  title: 'NotesApp - Zarządzanie notatkami',
  description: 'Aplikacja do zarządzania notatkami tekstowymi z możliwością dodawania zdjęć',
};

export default function RootLayout({ children }) {
  return <RootLayoutClient>{children}</RootLayoutClient>;
}
