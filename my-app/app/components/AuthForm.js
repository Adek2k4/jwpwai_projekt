import styles from '@/app/components/css/AuthForm.module.css';

export default function AuthForm({ title, onSubmit, isLogin = false }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(new FormData(e.target));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.formLabel}>
          Adres Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={styles.formInput}
          placeholder="twoj.email@example.com"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.formLabel}>
          Hasło
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className={styles.formInput}
          placeholder="••••••••"
        />
      </div>

      {!isLogin && (
        <>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.formLabel}>
              Potwierdź hasło
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              className={styles.formInput}
              placeholder="••••••••"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              Imię i Nazwisko
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className={styles.formInput}
              placeholder="Jan Kowalski"
            />
          </div>
        </>
      )}

      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
        {title}
      </button>
    </form>
  );
}
