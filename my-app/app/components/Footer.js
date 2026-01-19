'use client';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>O Aplikacji</h3>
            <p>
              NotesApp to aplikacja do zarządzania notatkami tekstowymi z obsługą zdjęć i
              synchronizacją w chmurze.
            </p>
          </div>

          <div className="footer-section">
            <h3>Funkcje</h3>
            <ul>
              <li>📝 Tworzenie notatek</li>
              <li>🖼️ Dodawanie zdjęć</li>
              <li>🔒 Bezpieczne dane</li>
              <li>🌙 Tryb ciemny</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Kontakt</h3>
            <p>
              📧 contact@notesapp.pl
              <br />
              🌐 www.notesapp.pl
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 NotesApp. Wszystkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
}
