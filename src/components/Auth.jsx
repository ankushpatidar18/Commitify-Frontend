import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import useUserStore from '../stores/useUserStore'; 
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { ChromeIcon as Google } from 'lucide-react'

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
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      window.location.href = `${apiUrl}/auth/google`;
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="bg-[#F2EFEF] w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-inter mb-1">
            Welcome to <span className='text-3xl ml-1'>Commitify</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-y-4">
            <p className="text-sm text-gray-500 font-poppin">
              Join our community of achievers today!
            </p>
            <Button 
              onClick={handleLogin}
              className="w-full bg-[#8046F3] text-white font-inter hover:bg-[#6A35D9] transition-colors"
            >
              <Google className="mr-2 h-4 w-4" /> Sign in with Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-xs text-gray-500 font-poppin">
            By signing in, you agree to our{' '}
            <a href="#" className="text-[#8046F3] hover:underline">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-[#8046F3] hover:underline">Privacy Policy</a>.
          </p>
        </CardFooter>
      </Card>
      <p className="mt-8 text-sm text-gray-500 font-inter">
        &copy; {new Date().getFullYear()} Commitify. All rights reserved.
      </p>
    </div>
  );
};

export default Auth;