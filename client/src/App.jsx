import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './firebase';

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-lg">Loading...</div>;
  }

  return (
    <Router>
      <MainContent loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
    </Router>
  );
}

function MainContent({ loggedUser, setLoggedUser }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoginPage && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            loggedUser ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            loggedUser ? (
              <Dashboard loggedUser={loggedUser} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
