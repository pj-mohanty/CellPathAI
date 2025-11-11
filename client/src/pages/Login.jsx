
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function Login() {
  const auth = getAuth();
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
      navigate('/'); 
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Already signed in:", user);
        navigate('/'); 
      }
    });
    return unsubscribe;
  }, [auth, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80 text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          CellpathAI
        </h1>
        <button
          onClick={signInWithGoogle}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
