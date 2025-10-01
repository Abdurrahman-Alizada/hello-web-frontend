'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import { store } from '@/redux/store';
import { setUser } from '@/redux/reducers/auth/authSlice';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Restore auth state from localStorage on app load
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      const user = localStorage.getItem('authUser');
      
      if (token && user) {
        try {
          const parsedUser = JSON.parse(user);
          dispatch(setUser(parsedUser));
        } catch (error) {
          // Clear invalid data
          localStorage.removeItem('authToken');
          localStorage.removeItem('authUser');
        }
      }
    }
  }, [dispatch]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </Provider>
  );
}