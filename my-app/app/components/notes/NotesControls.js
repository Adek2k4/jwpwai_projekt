import styles from '@/app/notes/notes.module.css';

export default function NotesControls({ searchQuery, onSearchChange, viewMode, onViewModeChange }) {
  return (
    <div className={styles.notesControls}>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Szukaj notatek..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.viewToggle}>
        <button
          onClick={() => onViewModeChange('grid')}
          className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
          title="Widok siatki"
        >
          ⊞
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
          title="Widok listy"
        >
          ☰
        </button>
      </div>
    </div>
  );
}
