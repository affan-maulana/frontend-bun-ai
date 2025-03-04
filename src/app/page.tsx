'use client';

import { Loading } from "@/components/ui/Loading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login"); // Redirect to chat page if token exists
    } else {
      router.push("/chat"); // Redirect to chat page if token exists
    }
  }, [router]);

  return (
    <Loading />
  );
}
