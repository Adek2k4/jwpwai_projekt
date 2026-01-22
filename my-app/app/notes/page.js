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
import styles from '@/app/components/css/Notes.module.css';

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

  // Przekieruj do logowania po ustaleniu stanu sesji, poza fazą renderu
  useEffect(() => {
    if (authReady && !isLoggedIn) {
      router.replace('/login');
    }
  }, [authReady, isLoggedIn, router]);

  if (!authReady) {
    return null;
  }

  if (!isLoggedIn) {
    return null;
  }

  const handleCreateNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: '',
      content: '',
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setEditingId(newNote.id);
    setIsCreating(true);
  };

  const handleSaveNote = (id, title, content, images) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, title, content, images, updatedAt: new Date().toISOString() }
        : note
    ));
    setEditingId(null);
    setIsCreating(false);
  };

  const handleDeleteNote = (id) => {
    if (confirm('Czy na pewno chcesz usunąć tę notatkę?')) {
      setNotes(notes.filter(note => note.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setIsCreating(false);
      }
    }
  };

  const handleCancelEdit = () => {
    if (isCreating) {
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
        />
      </div>
    </div>
  );
}
