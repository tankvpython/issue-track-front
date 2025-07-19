import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from '../api/client';
import { useSnackbar } from './SnackbarContext';
import axios from 'axios';


interface AuthContextType {
  user: any;
  authTokens: any;
  setAuthTokens: (tokens: any) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showSnackbar } = useSnackbar();
  const url = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [authTokens, setAuthTokens] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated]= useState(false)

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError('');
    try {

      const response = await apiClient.post('/auth/login/', { username, password });
      console.log('Login response:', response);
      setAuthTokens(response.data.access);
      const token = response.data.access;
      sessionStorage.setItem('token', token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      navigate('/dashboard');
      showSnackbar('Login successful!', 'success');
    } catch (err: any) {
      setIsAuthenticated(false);
      if (err.response.data.error){
          showSnackbar(err.response.data.error, 'error');
      }
      if (typeof err === 'object' && err !== null && 'response' in err && typeof (err as any).response === 'object' && (err as any).response !== null && 'data' in (err as any).response) {
          setError((err as any).response.data);
      } else {
          setError('Login failed');
          showSnackbar('Login failed', 'error');
      }
    } finally {
        setLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setLoading(true);
    setError('');
    try {
      const userData = { username, email, password };
      const response = await apiClient.post('/auth/register/', userData);
      console.log('Register response:', response);
      setAuthTokens(response.data.access);
      const token = response.data.access;
      sessionStorage.setItem('token', token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      navigate('/dashboard');
      showSnackbar('Register successful!', 'success');
    } catch (err) {
      setIsAuthenticated(false);
      if (typeof err === 'object' && err !== null && 'response' in err && typeof (err as any).response === 'object' && (err as any).response !== null && 'data' in (err as any).response) {
          setError((err as any).response.data);
      } else {
          setError('Registration failed');
      }
    } finally {
        setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setAuthTokens(null);
    setUser(null);
    setIsAuthenticated(false);
    // showSnackbar('Logout successful!', 'success');
    navigate('/login');
  };

  const getUser = async () => {
    if (authTokens) {
      try {
        const response = await apiClient.get('/auth/user/', {
          headers: { Authorization: `Bearer ${authTokens}` },
        });
        console.log('User data: ===>', response.data);
        setUser(response.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setError('Failed to fetch user data');
      }
    }
  };

  useEffect(() => {
    if (authTokens) {
      getUser();
      setIsAuthenticated(true);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${authTokens}`;
      // Optionally fetch user data here
    } else {
      setIsAuthenticated(false);
      delete apiClient.defaults.headers.common['Authorization'];
    }
  }, [authTokens]);

  useEffect(() => {
    // console.log('url ===>', location);
    if (isAuthenticated && authTokens && location.pathname.includes('/login') && !location.pathname.includes('/register')) {
      navigate('/dashboard');
    } 
  }, [isAuthenticated, authTokens]);

  useEffect(() => {
    if (!isAuthenticated){
      const token = sessionStorage.getItem('token');
      if (token) {
        setAuthTokens(token);
        setIsAuthenticated(true);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        setIsAuthenticated(false);
        delete apiClient.defaults.headers.common['Authorization'];
      }
    }
  }, []);



  return (
    <AuthContext.Provider
      value={{
        user,
        authTokens,
        setAuthTokens,
        login,
        register,
        logout,
        setLoading,
        isAuthenticated,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };

