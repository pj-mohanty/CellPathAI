import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth';

function ForgotPW() {
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("Already signed in: ", user);
                navigate('/');
            }
        })
    }, [auth, navigate]);

    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [infoMsg, setinfoMsg] = useState('');
    const [valid, setValid] = useState(false);

    const sendEmail = async (e) => {
        e?.preventDefault();
        setErrorMsg('');
        setinfoMsg('');

        setValid(true);
        try {
            await sendPasswordResetEmail(auth, email);

            setinfoMsg('If an account exists for that email, we\'ve sent password reset instructions');
            navigate('/login');
        } catch (error) {
            console.error('Password reset error:', error);
            let msg;
            switch (error?.code) {
                case 'auth/invalid-email':
                case 'auth/missing-email':
                    msg = 'Please enter a valid email address.';
                    break;
                case 'auth/network-request-failed':
                    msg = 'Network error. Check your connection and try again.';
                    break;
                case 'auth/too-many-requests':
                    msg = 'Too many attempts. Please wait a bit and try again.';
                    break;
                // Optional: keep enumeration-safe by *not* differentiating user-not-found
                case 'auth/user-not-found':
                default:
                    // Enumeration-safe message (recommended)
                    msg = 'If an account exists for that email, we’ve sent password reset instructions.';
                    // If you prefer to be explicit (NOT recommended for security):
                    // msg = 'No account found with that email.';
                    break;
            }
            setinfoMsg(msg);
        } finally {
            setValid(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="rounded-2xl shadow-xl ring-1 ring-black/5 bg-white/80 backdrop-blur p-6 sm:p-8">
                    {/* Top icon */}
                    <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-white">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="2" />
                            <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>

                    <h1 className="text-center text-xl font-semibold text-gray-900">Reset your password</h1>
                    <p className="mt-1 text-center text-sm text-gray-500">
                        Enter your account email and we’ll send you a reset link.
                    </p>

                    <form onSubmit={sendEmail} className="mt-6 space-y-4" noValidate>
                        {/* Email */}
                        <div>
                            <label className="block text-sm mb-1 text-gray-700" htmlFor="email">Email</label>
                            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="2" />
                  <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    className="w-full rounded-md border border-gray-200 bg-white px-10 py-2.5 text-sm outline-none focus:border-gray-400"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Status messages */}
                        {errorMsg && (
                            <p className="text-red-600 text-sm" role="alert">
                                {errorMsg}
                            </p>
                        )}
                        {infoMsg && (
                            <p className="text-green-700 text-sm">
                                {infoMsg}
                            </p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={valid}
                            className="w-full rounded-md bg-gray-900 px-4 py-2.5 text-white transition hover:bg-black disabled:opacity-50"
                        >
                            {valid ? 'Sending…' : 'Send reset link'}
                        </button>
                    </form>

                    {/* Footer links */}
                    <div className="mt-6 text-center text-sm text-gray-500">
                        <a href="/login" className="font-medium text-gray-700 hover:text-gray-900">
                            Back to login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPW;