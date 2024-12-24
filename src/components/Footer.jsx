import React from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-black border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white font-inter mb-4">Commitify</h2>
            <p className="text-zinc-100 font-inter mb-4">Empowering you to build better habits and achieve your goals.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-inter">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {['Home', 'About','Pricing', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-base text-zinc-100 hover:underline font-inter">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-inter">Stay Updated</h3>
            <p className="mt-4 text-base text-zinc-100 font-inter">Subscribe to our newsletter for tips and updates.</p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                className="font-inter"
              />
              <Button type="submit" className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto font-inter">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 border-t border-gray-200 pt-8">
          <p className="text-base text-white font-inter text-center">
            &copy; {new Date().getFullYear()} Commitify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

