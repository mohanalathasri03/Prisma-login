
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../api';

interface User {
  id: number;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  register: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAdmin: boolean;
  setAuthToken: (token: string | null) => void;
  getProfile: () => Promise<User | null>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => null,
  register: async () => {},
  logout: () => {},
  loading: true,
  isAdmin: false,
  setAuthToken: () => {},
  getProfile: async () => null,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      getProfile().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const setAuthToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      setIsAuthenticated(false);
    }
  };

  const getProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      logout();
      return null;
    }
  };

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const { access_token } = response.data;
    setAuthToken(access_token);
    const user = await getProfile();
    return user;
  };

  const register = async (email: string, password: string, role: string) => {
    await api.post('/auth/register', { email, password, role });
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        register,
        logout,
        loading,
        isAdmin,
        setAuthToken,
        getProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
