import React from 'react';
import logo from '../assets/images/logo-navbar.svg';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#1a1f4e] h-16 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6">
      <div className="flex items-center">
        <img 
          src={logo} 
          alt="Be Kind Network" 
          className="h-10 w-auto"
        />
      </div>
      <button className="relative bg-yellow-400 hover:bg-yellow-500 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
        <span className="text-[#1a1f4e] font-bold text-lg">A</span>
      </button>
    </nav>
  );
};
