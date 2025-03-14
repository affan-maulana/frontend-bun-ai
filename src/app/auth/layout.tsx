'use client';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loading } from '@/components/ui/Loading';
import { ToastContainer } from 'react-toastify';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/chat'); // Redirect to chat page if token exists
    } else {
      setLoading(false); // Set loading to false if no token is found
    }
  }, [router]);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <Head>
        <title>Bun AI Chat</title>
      </Head>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition={Bounce} 
      />
    </div>
  );
}