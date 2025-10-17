import React from 'react';

const LoginScreen = ({ onLogin, branding }) => (
  <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: branding.colors.primary }}>
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl">
      <div className="text-center">
        <img src={branding.logo} alt="WRC Logo" className="w-24 h-24 mx-auto" />
        <h1 className="mt-4 text-4xl font-bold tracking-tight" style={{ color: branding.colors.primary }}>WRC Rowing App</h1>
        <p className="mt-2 text-gray-600">Worcester Rowing Club Management</p>
      </div>
      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
          <input id="email" type="email" required className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" placeholder="coach@wrc1874.co.uk" defaultValue="coach@wrc1874.co.uk" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input id="password" type="password" required className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" placeholder="••••••••" defaultValue="password" />
        </div>
        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200" style={{ backgroundColor: branding.colors.accent, color: branding.colors.primary }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b89b31'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = branding.colors.accent}>
          Sign in
        </button>
      </form>
    </div>
  </div>
);

export default LoginScreen;