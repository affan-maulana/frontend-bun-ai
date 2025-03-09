"use client";
import { Loading } from "@/components/ui/Loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const ChatLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login"); // Redirect to chat page if token exists
    } else {
      setLoading(false); // Set loading to false if no token is found
    }
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
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
    </>
  );
};

export default ChatLayout;
