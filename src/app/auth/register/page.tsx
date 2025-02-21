'use client';

import { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle register Logic
  const handleRegister = (e:any) => {
    e.preventDefault();
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    // checker for password and confirm password
    if (password !== confirmPassword) {
      alert('Password and Confirm Password must be the same');
    }

    // check for email format
    if (!email.includes('@') && !email.includes('.')) {
      alert('Email must be in the correct format');
    }

    // axios post request to register
    const url = process.env.NEXT_PUBLIC_API_URL;
    axios.post(`${url}/auth/register`, {
      name,
      email,
      password,
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.error(err);
    });

  };

  return (
    // give register form, there are name, email, password, and confirm password
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>Bun AI Chat</title>
      </Head>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-gray-700 text-2xl font-bold mb-6 text-center">Bun AI Chat Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none text-gray-800 focus:ring focus:border-blue-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-800"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Register
          </button>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account? <a href="/auth/login" className="text-blue-500">Login here</a>
          </p>
        </form>
      </div>
    </div>

  );
}

