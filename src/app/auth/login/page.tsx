'use client';

import { useState } from 'react';
import axiosInstance from '@/utils/axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for email format
    if (!email.includes('@') && !email.includes('.')) {
      alert('Email must be in the correct format');
    }

    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password
      });
      console.log(response.data);

      // save token to local storage
      localStorage.setItem('token', response.data.data.token);

      // redirect to chat page
      window.location.href = '/chat';
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-200 p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-gray-700 text-2xl font-bold mb-6 text-center">Bun AI Chat Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-slate-500 text-white p-2 rounded-md hover:bg-slate-700 transition-colors"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          {`Don't have an account?`} <a href="/auth/register" className="text-blue-500">Register here</a>
        </p>  
      </form>
    </div>
  );
};

export default LoginPage;