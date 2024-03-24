import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import { handleLogin, handleGuestLogin, handleLogout } from './apiClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState('');
  const [profilePictureURL, setProfilePictureURL] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setAuthData(decodedToken);
      } catch (error) {
        console.error('Error decoding token: ', error);
        handleLogout();
      }
    }
  }, [isLoggedIn]);

  const setAuthData = (decodedToken) => {
    setIsLoggedIn(true);
    setUser(decodedToken.name);
    setIsAdmin(decodedToken.isAdmin);
    setUserId(decodedToken.userId);
    setProfilePictureURL(decodedToken.profilePicture);
  };

  const login = useCallback(async (username, password) => {
    try {
      const response = await handleLogin({ username, password });
      localStorage.setItem('token', response.accessToken);
      setAuthData(response.user);
    } catch (error) {
      console.error('Error during login: ', error);
      throw error;
    }
  }, []);

  const guestLogin = useCallback(async () => {
    try {
      const response = await handleGuestLogin();
      localStorage.setItem('token', response.accessToken);
      setAuthData(response.user);
    } catch (error) {
      console.error('Error during guest login: ', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await handleLogout();
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error during logout: ', error);
      throw error;
    }
    setIsLoggedIn(false);
    setUser('');
    setIsAdmin(false);
    setUserId('');
    setProfilePictureURL('');
  }, []);

  const updateLocalProfilePictureURL = useCallback(async (newURL) => {
    setProfilePictureURL(newURL);
  }, []);

  const authContextValue = useMemo(
    () => ({
      isLoggedIn,
      login,
      guestLogin,
      logout,
      isAdmin,
      userId,
      user,
      profilePictureURL,
      updateLocalProfilePictureURL,
    }),
    [
      isLoggedIn,
      login,
      guestLogin,
      logout,
      isAdmin,
      userId,
      user,
      profilePictureURL,
      updateLocalProfilePictureURL,
    ],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
