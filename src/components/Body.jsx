import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '@/stores/useUserStore';

const Body = () => {
  const navigate = useNavigate();
  const {isAuthenticated} = useUserStore();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  const quotes = [
    "Transform your habits, transform your life.",
    "Your goals, our commitment."
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto"
      >
        <p className="text-xl text-[#8046F3] font-poppin font-bold mb-8">Track → Improve → Achieve</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-8 font-inter">
          Elevate Your{' '}
          <span className="relative inline-block">
            <span className="relative z-10">Productivity</span>
            <span className="absolute inset-0 bg-yellow-200 -rotate-2 z-0"></span>
          </span>{' '}
          with{' '}
          <span className="relative inline-block">
            <span className="relative z-10 text-white">Commitify</span>
            <span className="absolute inset-0 bg-blue-500 rotate-2 z-0"></span>
          </span>
        </h1>
        
        <div className="">
      {quotes.map((quote, index) => (
        <motion.p 
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="text-xl text-gray-700 font-poppin opacity-5"
        >
          {quote}
        </motion.p>
      ))}
    </div>

        <p className="text-base text-gray-600 my-8 font-inter">
          Commitify empowers you to build lasting habits, achieve your goals, and unlock your full potential.
          Our intuitive platform combines cutting-edge technology with proven productivity techniques.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to='/auth'>
          <Button className="bg-[#8046F3] text-white font-inter text-lg px-8 py-6 rounded-full hover:bg-[#6A35D9] transition duration-300">
            Get Started
          </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Body;

