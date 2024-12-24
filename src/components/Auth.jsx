import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import useUserStore from '../stores/useUserStore'; 

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get Zustand store actions
  const { setUser, setToken } = useUserStore();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      // Store token in both localStorage and Zustand
      localStorage.setItem('authToken', token);
      setToken(token);
      
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      
      // Fetch user data
      axios.get(`${apiUrl}/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Store user data in Zustand
        setUser(response.data);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Auth error:', error);
        navigate('/login'); // Redirect to login on error
      });
    }
  }, [searchParams, navigate, setUser, setToken]);

  const handleLogin = () => {
    try {
      const apiUrl = 'http://localhost:3000';
      window.location.href = `${apiUrl}/auth/google`;
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Authenticate with Google</h1>
        <button 
          onClick={handleLogin}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;