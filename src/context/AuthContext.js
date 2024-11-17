import { useContext, createContext, useState, useEffect } from 'react';

import Cookies from 'js-cookie';
import axios from 'axios';
import API_BASE_URL from '../constant/api';

// Create context for user authentication
const AuthContext = createContext();

// Provider component to manage auth state
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL.prod}/api/user/login`, {
        email,
        password,
      });

      if (!response) return false;
      console.log(response);

      const { data } = response;

      console.log(data.data.access_token);
      Cookies.set('token', data.data.access_token);

      setUser(data.data.user);
      return true;
    } catch (error) {
      console.error('Login failed', error.response);
    }
  };

  // Sign-up function
  const signup = async (username, email, password, confirmPassword) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL.prod}/api/user/signup`,
        {
          username,
          email,
          password,
          confirmPassword,
        }
      );

      console.log(response);
      const { data } = response;
      setUser(data);
      return true;
    } catch (error) {
      console.error('Sign up failed', error.response);
    }
  };

  // Logout function
  const logout = () => {
    Cookies.remove('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext in other components
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
