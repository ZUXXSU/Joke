import { useState, useEffect, useCallback } from 'react'
import './App.css'

interface Joke {
  setup: string;
  punchline: string;
}

function App() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [error, setError] = useState<string | null>(null);

  const fetchJoke = useCallback(async () => {
    setLoading(true);
    setReveal(false);
    setError(null);
    try {
      const response = await fetch('/api/joke');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setJoke(data);
    } catch (err) {
      console.error("Failed to fetch joke:", err);
      setError("Failed to fetch a joke. Is the server running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJoke();
  }, [fetchJoke]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <div className="app-container">
        <div className="joke-card">
          <h1>JokeVault</h1>

          {loading ? (
            <div style={{ padding: '40px 0' }}>
              <div className="loader"></div>
            </div>
          ) : error ? (
            <div style={{ color: 'var(--text-muted)' }}>
              <p>{error}</p>
              <button className="btn" onClick={fetchJoke}>Try Again</button>
            </div>
          ) : joke ? (
            <>
              <p className="setup">{joke.setup}</p>

              {reveal ? (
                <p className="punchline">{joke.punchline}</p>
              ) : (
                <button
                  className="btn btn-secondary"
                  onClick={() => setReveal(true)}
                >
                  Reveal Punchline
                </button>
              )}

              {reveal && (
                <button className="btn" onClick={fetchJoke}>
                  Get Another Joke
                </button>
              )}
            </>
          ) : (
            <p>Ready to laugh?</p>
          )}
        </div>
      </div>
    </>
  )
}

export default App
