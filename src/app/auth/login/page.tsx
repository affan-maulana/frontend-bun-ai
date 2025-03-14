"use client";

import { useState } from "react";
import { apiErrorHandler } from "@/utils/apiHandlers";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axios";
import Image from "next/image";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for email format
    if (!email.includes("@") && !email.includes(".")) {
      toast.error("Email must be in the correct format");
    }

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      // save token to local storage
      localStorage.setItem("token", response.data.data.token);

      // redirect to chat page
      window.location.href = "/chat";
    } catch (error: unknown) {
      apiErrorHandler(error);
      return;
    }
  };

  return (
    <div className="bg-slate-200 p-8 rounded-lg shadow-md w-full max-w-md">
      {/* <h2 className="text-gray-700 text-2xl font-bold mb-6 text-center">Login</h2> */}
      <Image
        src="/bunchat-logo.png"
        alt="Bun AI"
        width={200}
        height={200}
        className="mx-auto"
      />
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
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
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
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
          {`Don't have an account?`}{" "}
          <a href="/auth/register" className="text-blue-500 hover:underline">
            Register here
          </a>
        </p>

        {/* Contact Information Section */}
        <div className="mt-6 flex flex-col items-center gap-3 text-gray-700">
          <a
            href="mailto:affan.m1993@gmail.com"
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src="/email.png" alt="Email" width={24} height={24} />
            <span className="text-sm font-medium">affan.m1993@gmail.com</span>
          </a>
          <a
            href="https://www.linkedin.com/in/affan-maulana/"
            className="flex items-center gap-2 hover:text-gray-900 transition"
            target="_blank"
          >
            <Image src="/linkedin.png" alt="LinkedIn" width={24} height={24} />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
          <a
            href="https://github.com/affan-maulana"
            className="flex items-center gap-2 hover:text-gray-900 transition"
            target="_blank"
          >
            <Image src="/github.png" alt="GitHub" width={24} height={24} />
            <span className="text-sm font-medium">GitHub</span>
          </a>

        </div>
      </form>
    </div>
  );
};

export default LoginPage;
