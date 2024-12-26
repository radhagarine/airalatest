"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // You can add any logic here to check user authentication or fetch data
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
      <p className="mt-4">This is your dashboard where you can manage your account.</p>
      {/* Add more components or features as needed */}
    </main>
  );
} 