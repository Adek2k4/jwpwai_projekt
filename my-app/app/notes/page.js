'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import useInteractiveGradient from '@/app/hooks/useInteractiveGradient';
import NotesHeader from '@/app/components/notes/NotesHeader';
import NotesControls from '@/app/components/notes/NotesControls';
import NotesList from '@/app/components/notes/NotesList';
import ImagePreviewModal from '@/app/components/notes/ImagePreviewModal';
import ImagePreviewSingle from '@/app/components/notes/ImagePreviewSingle';
import styles from '@/app/notes/notes.module.css';

export default function NotesPage() {
  const router = useRouter();
  const { isLoggedIn, authReady } = useAuth();
  const pageRef = useInteractiveGradient();
  
  const [notes, setNotes] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [imagePreviewModal, setImagePreviewModal] = useState(null); // { images: [], currentIndex: 0 }
  const [previewImage, setPreviewImage] = useState(null); // Single image fullscreen preview
  const [loadingNotes, setLoadingNotes] = useState(true);

  // Pobierz notatki z bazy danych
  useEffect(() => {
    const loadNotes = async () => {
      setLoadingNotes(true);
      try {
        const response = await fetch('/api/notes');
        if (response.ok) {
          const data = await response.json();
          setNotes(data);
        }
      } catch (error) {
        console.error('Error loading notes:', error);
      } finally {
        setLoadingNotes(false);
      }
    };

    if (isLoggedIn) {
      loadNotes();
    } else {
      setLoadingNotes(false);
    }
  }, [isLoggedIn]);

  const handleCreateNote = () => {
    const tempId = `temp-${Date.now()}`;
    const newNote = {
      id: tempId,
      title: '',
      content: '',
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setEditingId(tempId);
    setIsCreating(true);
  };

  const handleSaveNote = async (id, title, content, images) => {
    try {
      const isTemp = id.startsWith('temp-');
      let updatedNote = null;

      if (isTemp) {
        // Nowa notatka – zapisz do bazy
        const response = await fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content, images }),
        });

        if (response.ok) {
          updatedNote = await response.json();
        } else {
          throw new Error('Failed to create note');
        }
      } else {
        // Istniejąca notatka – zaktualizuj
        const response = await fetch(`/api/notes/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content, images }),
        });

        if (response.ok) {
          updatedNote = await response.json();
        } else {
          throw new Error('Failed to update note');
        }
      }

      if (updatedNote) {
        setNotes(notes.map(note => (note.id === id ? updatedNote : note)));
        setEditingId(null);
        setIsCreating(false);
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    if (!confirm('Czy na pewno chcesz usunąć tę notatkę?')) return;

    const isTemp = id.startsWith('temp-');

    if (isTemp) {
      setNotes(notes.filter(note => note.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setIsCreating(false);
      }
      return;
    }

    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotes(notes.filter(note => note.id !== id));
        if (editingId === id) {
          setEditingId(null);
          setIsCreating(false);
        }
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleCancelEdit = () => {
    if (isCreating && editingId) {
      // Lokalna, jeszcze niezapisana notatka – usuń tylko ze stanu
      setNotes(notes.filter(note => note.id !== editingId));
    }
    setEditingId(null);
    setIsCreating(false);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={pageRef} className={styles.notesPage} style={{ '--hero-mouse-x': '50%', '--hero-mouse-y': '50%' }}>
      <div className={styles.notesContainer}>
        {/* Image Preview Modal */}
        {imagePreviewModal && (
          <ImagePreviewModal
            images={imagePreviewModal.images}
            currentIndex={imagePreviewModal.currentIndex}
            onClose={() => setImagePreviewModal(null)}
            onNext={() => setImagePreviewModal(prev => ({
              ...prev,
              currentIndex: (prev.currentIndex + 1) % prev.images.length
            }))}
            onPrev={() => setImagePreviewModal(prev => ({
              ...prev,
              currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
            }))}
          />
        )}

        {/* Single Image Fullscreen Preview */}
        {previewImage && (
          <ImagePreviewSingle
            image={previewImage}
            onClose={() => setPreviewImage(null)}
          />
        )}

        {/* Header */}
        <NotesHeader onCreateNote={handleCreateNote} />

        {/* Search and View Controls */}
        <NotesControls 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Notes Grid/List */}
        {loadingNotes && (
          <div className={styles.loadingNotes}>Ładowanie notatek...</div>
        )}
        {!loadingNotes && (
          <NotesList
            notes={filteredNotes}
            editingId={editingId}
            viewMode={viewMode}
            onEdit={setEditingId}
            onSave={handleSaveNote}
            onDelete={handleDeleteNote}
            onCancel={handleCancelEdit}
            onImagePreview={(images, index) => setImagePreviewModal({ images, currentIndex: index })}
            onImageSinglePreview={setPreviewImage}
            loadingNotes={loadingNotes}
          />
        )}
      </div>
    </div>
  );
}
