'use client';

import { useSession } from '@clerk/nextjs';
import { createContext, useEffect, useState } from 'react';

export const AuthTokenContext = createContext<null | string>(null);

export function AuthTokenProvider({ children }: { children: React.ReactNode }) {
  let [authToken, setAuthToken] = useState<null | string>(null);
  const { session } = useSession();

  useEffect(() => {
    async function loadAuthToken() {
      if (session) {
        authToken = await session.getToken();
        console.log('authToken', authToken);

        if (authToken) {
          setAuthToken(authToken);
        }
      }
    }

    loadAuthToken();
  }, [session]);

  return (
    <AuthTokenContext.Provider value={authToken}>
      {children}
    </AuthTokenContext.Provider>
  );
}
