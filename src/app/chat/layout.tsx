'use client'; 
import { Loading } from "@/components/ui/Loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    return (
      <Loading />
    );
  }

  return children;
};

export default ChatLayout;
