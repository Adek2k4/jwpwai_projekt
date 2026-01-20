'use client';

import styles from './css/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>O Aplikacji</h3>
            <p>
              NotesApp to aplikacja do zarządzania notatkami tekstowymi z obsługą zdjęć i
              synchronizacją w chmurze.
            </p>
          </div>

          <div className={styles.footerSection}>
            <h3>Funkcje</h3>
            <ul>
              <li>📝 Tworzenie notatek</li>
              <li>🖼️ Dodawanie zdjęć</li>
              <li>🔒 Bezpieczne dane</li>
              <li>🌙 Tryb ciemny</li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>Kontakt</h3>
            <p>
              📧 contact@notesapp.pl
              <br />
              🌐 www.notesapp.pl
            </p>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2026 NotesApp. Wszystkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
}
