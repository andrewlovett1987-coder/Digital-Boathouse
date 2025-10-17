import React from 'react';
import { LogOut } from 'lucide-react';

const Header = ({ onLogout, branding }) => (
  <header className="bg-white shadow-sm p-4 flex justify-between items-center z-10 sticky top-0">
    <div className="flex items-center space-x-3">
      <img src={branding.logo} alt="WRC Logo" className="w-10 h-10" />
      <h1 className="text-2xl font-bold" style={{color: branding.colors.primary}}>WRC Rowing App</h1>
    </div>
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium">Welcome, Coach!</span>
      <button onClick={onLogout} className="flex items-center space-x-2 text-sm text-gray-600 hover:text-red-600 transition-colors">
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    </div>
  </header>
);

export default Header;