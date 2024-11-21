import { useContext, createContext, useState, useEffect } from 'react';

import Cookies from 'js-cookie';
import axios from 'axios';
import API_BASE_URL from '../constant/api';
import { handleServerError } from '../utils/server.error';
import notifySuccessMsg from '../utils/notify';

// Create context for user authentication
const AuthContext = createContext();

// Provider component to manage auth state
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);

  // Fetch user from local storage on page load
  useEffect(() => {
    const userLs = localStorage.getItem('user');

    if (userLs) setUser(JSON.parse(userLs));
    setLoading(false);
  }, [user]);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL.prod}/api/user/login`, {
        email,
        password,
      });

      if (!response) return false;

      // console.log(response);

      const { data } = response;

      Cookies.set('token', data.data.access_token);

      setLoading(false);
      setUser(data.data.user);
      notifySuccessMsg('You are now logged in');
      localStorage.setItem('user', JSON.stringify(data.data.user));
      return true;
    } catch (error) {
      // console.error('Login failed', error.response);
      setLoading(false);
      handleServerError(error.response?.status, error.response?.data?.message);
    }
  };

  // Sign-up function
  const signup = async (username, email, password, confirmPassword) => {
    setLoading(true);

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

      // console.log(response);
      const { data } = response;
      setLoading(false);
      setUser(data);
      notifySuccessMsg('Sign Up is complete');
      return true;
    } catch (error) {
      setLoading(false);
      console.error('Sign up failed', error.response);
      handleServerError(error.response?.status, error.response?.data?.message);
    }
  };

  //  update user function
  const updateUser = async (jwtToken, username = '', email = '') => {
    setLoading(true);

    try {
      const requestData = {
        username,
        email,
      };

      const headers = {
        Authorization: `Bearer ${jwtToken}`,
      };

      const response = await axios.patch(
        `${API_BASE_URL.prod}/api/user/update`,
        requestData,
        { headers }
      );

      if (response.status === 200) {
        setUser(response.data);
        notifySuccessMsg('User details updated successfully');
        console.log(response.data.data);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        setLoading(false);
        return true;
      }
    } catch (error) {
      // Log response data or call error handler
      if (error.response) {
        handleServerError(
          error.response.status,
          error.response.data?.message || 'An error occurred'
        );
      } else {
        console.error('Network or unknown error:', error.message);
      }
    } finally {
      // Ensure loading is stopped in all cases
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    setUser(null);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isLoading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext in other components
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
