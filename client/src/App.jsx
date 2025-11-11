import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Topics from './pages/Topics';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import ForgotPW from "./pages/Forgotpw";
import Analytics from './pages/Analytics'; 
import QuizPage from "./pages/QuizPage";
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
    const isLoginPage = location.pathname === '/login';
    const isSignUp = location.pathname === '/signup';
    const isforgot = location.pathname === '/forgotpw';

  return (
    <div className="min-h-screen bg-gray-50">
        {!isLoginPage && !isSignUp && !isforgot && <Navbar />}

        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route
                path="/login"
                element={
                    loggedUser ? (
                        <Navigate to="/dashboard" replace />
                    ) : (
                        <Login loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
                    )
                }
            />

            <Route
                path="/signup"
                element={
                    <SignUp />
                }
            />

            <Route
                path="/forgotpw"
                element={
                    <ForgotPW />
                }
            />
        <Route
          path="/dashboard"
          element={
            loggedUser ? (
              <Dashboard loggedUser={loggedUser} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
       
        <Route path="/quiz/:topic/:category" element={<QuizPage />} />
       
        
        <Route
          path="/quiz-analytics"
          element={
            loggedUser ? (
              <Analytics loggedUser={loggedUser} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/topics"
          element={
            loggedUser ? (
              <Topics loggedUser={loggedUser} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

      </Routes>
    </div>
  );
}

export default App;