import { createContext, useEffect, useState } from 'react';

import { getApiRequest } from '../services/api';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    async function test() {
      const user = localStorage.getItem('paypost.user');
      console.log('user: ', user)
      if (user) {
        setUser(JSON.parse(user));
      }
    }
    test()
  }, []);

  async function signIn({ email, password }) {

    try {
      const api = getApiRequest();

      const response = await api.post('auth/signin', {
        email,
        password
      });

      const { token, user } = response.data;

      const userData = {
        email,
        name: user.name,
        id: user._id
      }

      setUser(userData);

      localStorage.setItem('paypost.token', token);
      localStorage.setItem("paypost.user", JSON.stringify(userData));
    } catch (err) {
      console.log('error: ', err);
    }
  }

  async function signOut() {
    setUser(null);

    await localStorage.removeItem('paypost.token');
    await localStorage.removeItem('paypost.user');
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user,
        isAuthenticated,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}