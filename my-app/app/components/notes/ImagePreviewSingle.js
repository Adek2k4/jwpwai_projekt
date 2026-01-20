import styles from '@/app/notes/notes.module.css';

export default function ImagePreviewSingle({ image, onClose }) {
  return (
    <div className={styles.imagePreviewModal} onClick={onClose}>
      <div className={`${styles.modalContent} ${styles.single}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>✕</button>
        
        <div className={styles.modalImageContainer}>
          <img src={image} alt="Podgląd zdjęcia" />
        </div>
      </div>
    </div>
  );
}
