import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, {useEffect, useState} from "react";
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {
    const auth = getAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [pw2, setPw2] = useState('');
    const [showPw, setShowPw] = useState('');
    const [showPw2, setShowPw2] = useState('');

    // if signed in already
    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            if (user) navigate ('/');
        });
    }, [auth, navigate]);

    // validate the email and password using regex
    /*
    password must conform to following restrictions
    - length of 6
    - must contain at least 1 special character, 1 uppercase, and 1 lowercase TODO
    - english only, no other language / symbols TODO
     */
    const validate = () => {
        if (!email) return 'Please enter your email';
        if (!/^\S+@\S+\.\S+$/.test(email)) return 'Please enter a valid email';
        if (pw.length < 6) return 'Password must be at least 6 characters'
        if (pw !== pw2) return 'Passwords do not match.';
        return '';
    };

    const [ErrorMsg, setErrorMsg] = useState('');
    const [InfoMsg,setInfoMsg] = useState('');
    const [Submitting, setSubmitting] = useState(false);

    const createUser = async(e) => {
        e?.preventDefault();

        const problem = validate();
        if (problem) {
            setErrorMsg(problem);
            return;
        }

        setSubmitting(true);
        try {
            const cred = await createUserWithEmailAndPassword(auth, email.trim(), pw);
        } catch (error) {
            console.error('Sign-up error: ', error);
            let msg = error?.message || 'Sign-up failed.';
            switch(error?.code) {
                case 'auth/email-already-in-use':
                    msg = 'Email already in use';
                    break;
                case 'auth/invalid-email':
                    msg = "Invalid email address";
                    break;
                case 'auth/operation-not-allowed':
                    msg = 'Email/password sign-up is disabled for this project'
                    break;
                case 'auth/weak-password':
                    msg = 'Password is too weak.';
            }
            setErrorMsg(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div class="min-h-screen bg-gradient-to-b from-sky-100 to-white flex items-center justify-center p-4">
            <div class="w-full max-w-md">
                <div class="rounded-2xl shadow-xl ring-1 ring-black/5 bg-white/80 backdrop-blur p-6 sm:p-8">
                    <div class="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-white">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 12v8M8 16h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M12 12a4 4 0 10-4-4 4 4 0 004 4z" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </div>

                    <h1 class="text-center text-xl font-semibold text-gray-900">Create your account</h1>
                    <p class="mt-1 text-center text-sm text-gray-500">Start using CellpathAI</p>

                    <form class="mt-6 space-y-4" action="#" method="post" novalidate>
                        <div>
                            <label class="block text-sm mb-1 text-gray-700" for="email">Email</label>
                            <div class="relative">
            <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16v12H4z" stroke="currentColor" stroke-width="2"/>
                <path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="2"/>
              </svg>
            </span>
                                <input
                                    value={email}
                                    type="email"
                                    required
                                    autocomplete="email"
                                    placeholder="you@example.com"
                                    class="w-full rounded-md border border-gray-200 bg-white px-10 py-2.5 text-sm outline-none focus:border-gray-400"
                                />
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm mb-1 text-gray-700" for="password">Password</label>
                            <div class="relative">
            <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M8 10V7a4 4 0 118 0v3" stroke="currentColor" stroke-width="2"/>
              </svg>
            </span>
                                <input
                                    value={pw}
                                    type={showPw ? 'text' : 'password'}
                                    onChange={(e) => setPw(e.target.value)}
                                    required
                                    minlength="6"
                                    autocomplete="new-password"
                                    placeholder="••••••••"
                                    class="w-full rounded-md border border-gray-200 bg-white px-10 py-2.5 text-sm outline-none focus:border-gray-400"
                                />
                                <button
                                    type="button"
                                    onclick={() => setShowPw((s) => !s )}
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

                        <div>
                            <label class="block text-sm mb-1 text-gray-700" for="confirm_password">Confirm password</label>
                            <div class="relative">
            <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" stroke-width="2"/>
                <path d="M8 10V7a4 4 0 118 0v3" stroke="currentColor" stroke-width="2"/>
              </svg>
            </span>
                                <input
                                    value={pw2}
                                    type={showPw2 ? 'text' : 'password'}
                                    onChange={(e) => setPw2(e.target.value)}
                                    required
                                    minlength="6"
                                    autocomplete="new-password"
                                    placeholder="••••••••"
                                    class="w-full rounded-md border border-gray-200 bg-white px-10 py-2.5 text-sm outline-none focus:border-gray-400"
                                />
                                <button
                                    type="button"
                                    onclick={() => setShowPw2((s) => !s )}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                    aria-label={showPw2 ? 'Hide password' : 'Show password'}
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
                        <p class="hidden text-red-600 text-sm" id="form-error">Passwords don’t match.</p>

                        <button
                            type="submit"
                            class="w-full rounded-md bg-gray-900 px-4 py-2.5 text-white transition hover:bg-black"
                        >
                            Get Started
                        </button>
                    </form>
                    <p class="mt-6 text-center text-sm text-gray-500">
                        Already have an account?
                        <a href="/login" class="font-medium text-gray-700 hover:text-gray-900"> Log in</a>
                    </p>
                </div>
            </div>
        </div>

    );
}

export default SignUp;