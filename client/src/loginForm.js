import React, { useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Stack, Text, PrimaryButton, DefaultButton } from '@fluentui/react';

function LoginForm({ loggedUser, setLoggedUser }) {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      const result = await signInWithPopup(auth, provider);
      setLoggedUser(result.user);
      console.log("User signed in:", result.user);
    } catch (e) {
      console.error("Sign-in error:", e);
    }
  };

  const logoutGoogle = async () => {
    const auth = getAuth();
    try {
      await auth.signOut();
      setLoggedUser(null);
      console.log("User signed out.");
    } catch (e) {
      console.error("Sign-out error:", e);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedUser(user);
        console.log("User is signed in:", user);
      } else {
        setLoggedUser(null);
        console.log("No user is signed in.");
      }
    });
    return unsubscribe;
  }, [setLoggedUser]);

  return (
    <Stack horizontalAlign="center" tokens={{ childrenGap: 20, padding: 40 }}>
      {loggedUser ? (
        <>
          <Text variant="large">Welcome, {loggedUser.displayName || loggedUser.email}!</Text>
          <DefaultButton onClick={logoutGoogle} text="Log out" />
        </>
      ) : (
        <PrimaryButton onClick={signInWithGoogle} text="Sign in with Google" />
      )}
    </Stack>
  );
}

export default LoginForm;
