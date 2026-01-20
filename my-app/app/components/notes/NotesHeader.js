import styles from '@/app/notes/notes.module.css';

export default function NotesHeader({ onCreateNote }) {
  return (
    <div className={styles.notesHeader}>
      <h1 className={styles.notesTitle}>Moje Notatki</h1>
      <button onClick={onCreateNote} className="btn btn-primary">
        <span>+</span> Nowa notatka
      </button>
    </div>
  );
}
