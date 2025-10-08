import React, { useEffect } from 'react';
import { Stack, Text, PrimaryButton, DefaultButton } from '@fluentui/react';
import { signInWithGoogle, logout, listenToAuthChanges } from '../firebaseAuth';

function LoginForm({ loggedUser, setLoggedUser }) {

  useEffect(() => {
    const unsubscribe = listenToAuthChanges((user) => {
      setLoggedUser(user || null);
    });
    return unsubscribe;
  }, [setLoggedUser]);

  return (
    <Stack horizontalAlign="center" tokens={{ childrenGap: 20, padding: 40 }}>
      {loggedUser ? (
        <>
          <Text variant="large">
            Welcome, {loggedUser.displayName || loggedUser.email}!
          </Text>
          <DefaultButton onClick={logout} text="Log out" />
        </>
      ) : (
        <PrimaryButton onClick={signInWithGoogle} text="Sign in with Google" />
      )}
    </Stack>
  );
}

export default LoginForm;
