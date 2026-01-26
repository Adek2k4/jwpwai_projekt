import NoteCard from './NoteCard';
import styles from '@/app/components/css/NotesList.module.css';

export default function NotesList({ notes, editingId, viewMode, onEdit, onSave, onDelete, onCancel, onImagePreview, onImageSinglePreview }) {
  if (notes.length === 0) {
    return (
      <div className={styles.notesEmpty}>
        <p>Brak notatek. Utwórz swoją pierwszą notatkę!</p>
      </div>
    );
  }

  return (
    <div className={styles[`notes${viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}`]}>
      {notes.map(note => (
        <NoteCard
          key={note.id}
          note={note}
          isEditing={editingId === note.id}
          onEdit={() => onEdit(note.id)}
          onSave={onSave}
          onDelete={onDelete}
          onCancel={onCancel}
          onImagePreview={onImagePreview}
          onImageSinglePreview={onImageSinglePreview}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
}
