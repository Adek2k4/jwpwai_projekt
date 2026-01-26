'use client';

import { useState } from 'react';
import styles from '@/app/components/css/NoteCard.module.css';

export default function NoteCard({ note, isEditing, onEdit, onSave, onDelete, onCancel, onImagePreview, onImageSinglePreview, viewMode }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [images, setImages] = useState(note.images || []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length >= 5) {
      alert('Możesz dodać maksymalnie 5 zdjęć do jednej notatki.');
      return;
    }
    const availableSlots = 5 - images.length;
    const filesToAdd = files.slice(0, availableSlots);
    const readers = filesToAdd.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then((results) => {
      setImages([...images, ...results]);
    });
  };

  const handleRemoveImage = (index) => {
    if (confirm('Czy na pewno chcesz usunąć to zdjęcie?')) {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  const handleSave = () => {
    if (!title.trim() && !content.trim()) {
      alert('Notatka musi mieć tytuł lub treść');
      return;
    }
    onSave(note.id, title, content, images);
  };

  if (isEditing) {
    return (
      <div className={`${styles.noteCard} ${styles.editing} ${styles[viewMode]}`}>
        <input
          type="text"
          placeholder="Tytuł notatki..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.noteTitleInput}
          autoFocus
        />
        <textarea
          placeholder="Treść notatki..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.noteContentInput}
          rows="6"
        />
        
        {/* Images Gallery in Edit Mode */}
        {images.length > 0 && (
          <div className={styles.noteImagesGallery}>
            <p className={styles.imagesCount}>Zdjęcia ({images.length}/5)</p>
            <div className={styles.imagesGrid}>
              {images.map((img, index) => (
                <div key={index} className={styles.imageItem}>
                  <img 
                    src={img} 
                    alt={`Zdjęcie ${index + 1}`}
                    onClick={() => onImageSinglePreview(img)}
                    style={{ cursor: 'pointer' }}
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className={styles.removeImageBtn}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Add Images Button */}
        <div className={styles.noteActions}>
          <label className="btn btn-secondary btn-sm">
            📷 Dodaj zdjęcia
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button onClick={handleSave} className="btn btn-primary btn-sm">
            Zapisz
          </button>
          <button onClick={onCancel} className="btn btn-ghost btn-sm">
            Anuluj
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.noteCard} ${styles[viewMode]}`} onClick={onEdit}>
      {images.length > 0 && (
        <div className={styles.noteImage}>
          <img 
            src={images[0]} 
            alt="Główne zdjęcie"
            onClick={(e) => {
              e.stopPropagation();
              onImagePreview(images, 0);
            }}
            style={{ cursor: 'pointer' }}
          />
          {images.length > 1 && (
            <div className={styles.imageCountBadge}>{images.length}</div>
          )}
        </div>
      )}
      <div className={styles.noteBody}>
        <h3 className={styles.noteTitle}>{note.title || 'Bez tytułu'}</h3>
        <p className={styles.noteContent}>{note.content}</p>
        <div className={styles.noteMeta}>
          <span className={styles.noteDate}>
            {new Date(note.updatedAt).toLocaleDateString('pl-PL')}
          </span>
        </div>
      </div>
      <div className={styles.noteActionsOverlay}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="btn btn-secondary btn-sm"
        >
          Edytuj
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(note.id);
          }}
          className="btn btn-danger btn-sm"
        >
          Usuń
        </button>
      </div>
    </div>
  );
}
