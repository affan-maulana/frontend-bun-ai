'use client';
import { useState } from 'react';
import DOMPurify from 'dompurify';
import axiosInstance from '@/utils/axios';
import { apiErrorHandler } from '@/utils/apiHandlers';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verifyPage, setVerifyPage] = useState(false);
  const [token, setToken] = useState('');
  const [phone, setPhone] = useState('');

  // Sanitize input
  const sanitizeInput = (input: string) => {
    return DOMPurify.sanitize(input);
  };

  // Handle register Logic
  const handleRegister = async (e: any) => {
    e.preventDefault();

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedName = sanitizeInput(name);
    const sanitizedPassword = sanitizeInput(password);

    // checker for password and confirm password
    if (sanitizedPassword !== confirmPassword) {
      alert('Password and Confirm Password must be the same');
      return;
    }

    // check for email format
    if (!sanitizedEmail.includes('@') && !sanitizedEmail.includes('.')) {
      alert('Email must be in the correct format');
      return;
    }

    try {
      // Register
      const register = await axiosInstance.post('/auth/register', {
        name: sanitizedName,
        email: sanitizedEmail,
        password: sanitizedPassword,
      });

      if (register.status !== 200) {
        const message = register.data?.data?.message || 'Something went wrong';
        alert(message);
        return;
      }

      // Request Token
      await axiosInstance.post('/auth/request', {
        email: sanitizedEmail,
      });
    } catch (error: any) {
      alert(apiErrorHandler(error));
      return;
    }

    setVerifyPage(true);
  };

  const handleResend = async () => {
    try {
      await axiosInstance.post('/auth/resend', {
        email: sanitizeInput(email),
      });
    } catch (error) {
      alert(apiErrorHandler(error));
      return;
    }
  };

  const handleVerify = async (updatedToken: string) => {
    try {
      const intToken = parseInt(updatedToken);
      console.log('intToken', intToken);

      if (isNaN(intToken) || updatedToken.length !== 6) {
        alert('Token must be a 6 digit number');
        return;
      }
      const response = await axiosInstance.post('/auth/verify', {
        email: sanitizeInput(email),
        tokenVerif: intToken,
      });
      console.log(response.data);

      // save token to local storage
      localStorage.setItem('token', response.data.data.token);

      // redirect to chat page
      window.location.href = '/chat';
    } catch (error) {
      alert(apiErrorHandler(error));
      return;
    }
  };

  if (!verifyPage) {
    return (
      <div className="bg-slate-200 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-gray-700 text-2xl font-bold mb-6 text-center">Bun AI Chat Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              autoComplete="off"
              type="text"
              id="name"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none text-gray-800 focus:ring focus:border-blue-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              autoComplete="off"
              type="email"
              id="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              autoComplete="off"
              type="text"
              id="phone"
              maxLength={15}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-800"
              value={phone}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[0-9()+\s]*$/.test(value)) {
                  setPhone(value);
                }
              }}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              autoComplete="off"
              type="password"
              id="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              autoComplete="off"
              id="confirmPassword"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-gray-800"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-500 text-white p-2 rounded-md hover:bg-slate-700 transition-colors"
          >
            Register
          </button>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account? <a href="/auth/login" className="text-blue-500">Login here</a>
          </p>
        </form>
      </div>
    );
  } else {
    return (
      <div className="bg-slate-200 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-gray-700 text-2xl font-bold mb-6 text-center">Token Validation</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVerify(token);
          }}
        >
          <div className="mb-4">
            <div className="flex justify-center space-x-2 mx-auto">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  autoComplete="off"
                  className="w-10 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring focus:border-blue-300"
                  value={token[index] || ''}
                  onChange={(e) => {
                    const newToken = token.split('');
                    newToken[index] = e.target.value;
                    const updatedToken = newToken.join('');
                    setToken(updatedToken);
                    if (e.target.value && index < 5) {
                      document.getElementById(`pin-${index + 1}`)?.focus();
                    } else if (index === 5 && updatedToken.length === 6) {
                      handleVerify(updatedToken);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace') {
                      e.preventDefault();
                      const newToken = token.split('');
                      if (token[index]) {
                        newToken[index] = '';
                        setToken(newToken.join(''));
                      } else if (index > 0) {
                        newToken[index - 1] = '';
                        setToken(newToken.join(''));
                        document.getElementById(`pin-${index - 1}`)?.focus();
                      }
                    } else if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  id={`pin-${index}`}
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-slate-500 text-white p-2 rounded-md hover:bg-slate-700 transition-colors"
          >
            Verify
          </button>
          <p className="mt-4 text-center text-sm text-gray-600">
            Didn't receive an email?{' '}
            <button
              type="button"
              onClick={handleResend}
              className="text-blue-500 underline"
            >
              Click here to resend the token
            </button>
          </p>
        </form>
      </div>
    );
  }
}