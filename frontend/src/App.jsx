import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage';
import AuthPage from './pages/AuthPage';

export default function App() {
  const [user, setUser] = useState(null);
  const [currentSpec, setCurrentSpec] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentSpec(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div>
      {!currentSpec ? (
        <HomePage
          user={user}
          onLogout={handleLogout}
          onSpecGenerated={setCurrentSpec}
        />
      ) : (
        <ResultPage spec={currentSpec} onBack={() => setCurrentSpec(null)} />
      )}
    </div>
  );
}
