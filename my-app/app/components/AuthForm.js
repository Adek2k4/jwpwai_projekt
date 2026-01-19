'use client';

export default function AuthForm({ title, onSubmit, isLogin = false }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(new FormData(e.target));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Adres Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="form-input"
          placeholder="twoj.email@example.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Hasło
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="form-input"
          placeholder="••••••••"
        />
      </div>

      {!isLogin && (
        <>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Potwierdź hasło
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              className="form-input"
              placeholder="••••••••"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Imię i Nazwisko
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="form-input"
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
