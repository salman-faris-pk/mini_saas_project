'use client';

import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';

export default function useAuth() {
  const { data: session, status, update } = useSession();
  const user = session?.user;


  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';
  const isUnauthenticated = status === 'unauthenticated';

  const login = async (provider = 'credentials', options = {}) => {

    return await signIn(provider, {
      ...options
    });
  };

  const logout = async () => {
    await signOut({ callbackUrl: '/' })
  };



  return {
    // Session and user info
    session,
    user,
    status,

    // Status booleans
    isLoading,
    isAuthenticated,
    isUnauthenticated,

    // Auth methods
    login,
    logout,
    update,


    userId: user?.id,
    userEmail: user?.email,
  };
}