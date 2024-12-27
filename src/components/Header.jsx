import React from 'react';
import { Button } from "@/components/ui/button"
import { Link, useLocation } from 'react-router-dom';
import useUserStore from '@/stores/useUserStore';

const Header = () => {
  const { user } = useUserStore();
  const location = useLocation();
  return (
    <header className="shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to='/'>
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-black font-inter">Commitify</h1>
          </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-4">
            {['How it works', 'Our Mission', 'FAQ'].map((item) => (
              <Link
                key={item}
                to="/"
                className="opacity-80 text-black font-inter text-xs font-medium hover:underline transition duration-150 ease-in-out"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Get Started Button */}
          { !user && location.pathname === '/' && (
          <div>
            <Link to='/auth'>
              <Button className="bg-black text-white font-inter hover:bg-gray-800">
                Get Started
              </Button>
            </Link>
          </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

