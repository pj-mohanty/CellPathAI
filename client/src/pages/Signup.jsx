import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

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
        setInfoMsg('');

        const problem = validate();
        if (problem) {
            setErrorMsg(problem);
            return;
        }

        setSubmitting(true);
        try {
            await createUserWithEmailAndPassword(auth, email.trim(), pw);
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
                    break;
                default:
                    msg = error?.code;
            }
            setErrorMsg(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
               <div className="min-h-screen bg-gradient-to-b from-emerald-700 to-emerald-600 flex flex-col">
                 {/* Header */}
                 <header className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-4 shadow">
                   <h1 className="text-center text-2xl font-semibold tracking-tight">CellPathAI</h1>
                 </header>

                 {/* Main form container */}
                 <main className="flex flex-1 items-center justify-center px-4 py-10 bg-gray-50">
                   <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                     <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
                       Create Your Account
                     </h2>
                     <p className="text-gray-500 text-sm text-center mb-6">
                       Start using CellPathAI
                     </p>

                     {InfoMsg && (
                       <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                         {InfoMsg}
                       </div>
                     )}

                     {ErrorMsg && (
                       <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                         {ErrorMsg}
                       </div>
                     )}

                     <form onSubmit={createUser} className="space-y-5">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                         <input
                           value={email}
                           type="email"
                           required
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="you@example.com"
                           className="w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                         />
                       </div>

                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                         <div className="relative">
                           <input
                             value={pw}
                             type={showPw ? 'text' : 'password'}
                             onChange={(e) => setPw(e.target.value)}
                             required
                             minLength="6"
                             placeholder="••••••••"
                             className="w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                           />
                           <button
                             type="button"
                             onClick={() => setShowPw(!showPw)}
                             className="absolute inset-y-0 right-3 text-gray-400 hover:text-gray-600"
                           >
                             {showPw ? '🙈' : '👁️'}
                           </button>
                         </div>
                       </div>

                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                         <div className="relative">
                           <input
                             value={pw2}
                             type={showPw2 ? 'text' : 'password'}
                             onChange={(e) => setPw2(e.target.value)}
                             required
                             minLength="6"
                             placeholder="••••••••"
                             className="w-full rounded-md border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                           />
                           <button
                             type="button"
                             onClick={() => setShowPw2(!showPw2)}
                             className="absolute inset-y-0 right-3 text-gray-400 hover:text-gray-600"
                           >
                             {showPw2 ? '🙈' : '👁️'}
                           </button>
                         </div>
                       </div>

                       <button
                         type="submit"
                         disabled={Submitting}
                         className="w-full rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 text-sm font-medium transition"
                       >
                         {Submitting ? 'Creating account...' : 'Sign Up'}
                       </button>
                     </form>

                     <p className="mt-6 text-center text-sm text-gray-500">
                       Already have an account?{' '}
                       <a href="/login" className="font-medium text-emerald-600 hover:text-emerald-700">
                         Log in
                       </a>
                     </p>
                   </div>
                 </main>
               </div>
             );
}

export default SignUp;