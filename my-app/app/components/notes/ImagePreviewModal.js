import styles from '@/app/notes/notes.module.css';

export default function ImagePreviewModal({ images, currentIndex, onClose, onNext, onPrev }) {
  return (
    <div className={styles.imagePreviewModal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>✕</button>
        
        <div className={styles.modalImageContainer}>
          <img src={images[currentIndex]} alt={`Zdjęcie ${currentIndex + 1}`} />
        </div>
        
        <div className={styles.modalControls}>
          <button onClick={onPrev} className={styles.modalBtn}>◀</button>
          <span className={styles.modalCounter}>{currentIndex + 1} / {images.length}</span>
          <button onClick={onNext} className={styles.modalBtn}>▶</button>
        </div>
      </div>
    </div>
  );
}
