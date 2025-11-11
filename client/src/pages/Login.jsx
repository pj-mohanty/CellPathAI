import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword} from 'firebase/auth';

function Login() {
  const auth = getAuth();
  const navigate = useNavigate();

  // Google sign in
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

  // regular sign in
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const signInWithPW = async (e) => {
    e?.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      console.log('Email sign-in:', cred.user);
      navigate('/');
    } catch (error) {
      const msg =
          error?.code === 'auth/invalid-credential' || error?.code === 'auth/wrong-password'
            ? 'Invalid email or password' : error?.code === 'auth/user-not-found' ? 'No account found with that email' : error?.message || 'Sign-in failed'
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Already signed in:", user);
        navigate('/');
      }
    });
  }, [auth, navigate]);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-5">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-teal-600 text-white">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M10 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h1 className="mt-3 text-center text-xl font-semibold text-gray-900">Sign in</h1>
            <p className="mt-1 text-center text-sm text-gray-500">Continue to CellPathAI</p>
          </div>

          <div className="px-6 py-6">
            {/* Google first */}
            <button
              onClick={signInWithGoogle}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.2-1.6 3.5-5.5 3.5-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.7 2.5 14.5 1.6 12 1.6 6.9 1.6 2.8 5.7 2.8 10.8S6.9 20 12 20c6.9 0 9.2-4.8 8.6-9.2H12z"/>
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>

            {/* Email / Password */}
            <form onSubmit={signInWithPW} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-gray-700">Email</label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-gray-300 bg-white px-10 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="block text-sm text-gray-700">Password</label>
                  <a href="/forgotpw" className="text-xs font-medium text-green-700 hover:text-green-800">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M8 10V7a4 4 0 118 0v3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </span>
                  <input
                    type={showPw ? 'text' : 'password'}
                    className="w-full rounded-lg border border-gray-300 bg-white px-10 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                  >
                    {showPw ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2"/>
                        <path d="M10.6 10.6A3 3 0 0012 15a3 3 0 001.4-.4M5.1 7.5C3.8 8.7 2.9 10 2.5 10.6a1.2 1.2 0 000 1C4.6 15.7 8 18 12 18c1.4 0 2.7-.3 3.9-.9M18.9 16.5C20.2 15.3 21.1 14 21.5 13.4a1.2 1.2 0 000-1C19.4 8.3 16 6 12 6c-1.1 0-2.1.2-3.1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M2.5 11.6C4.6 8.3 8 6 12 6s7.4 2.3 9.5 5.6a1.2 1.2 0 010 1C19.4 15.7 16 18 12 18S4.6 15.7 2.5 12.6a1.2 1.2 0 010-1z" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <p className="text-sm text-red-600" role="alert">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-gradient-to-r from-green-600 to-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-green-700 hover:to-teal-700 disabled:opacity-60"
              >
                {submitting ? 'Signing in…' : 'Sign in'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don’t have an account?{' '}
              <a href="/signup" className="font-medium text-green-700 hover:text-green-800">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

