"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <button
        onClick={() => signIn("google")}
        className="bg-red-500 text-white px-6 py-2 rounded mb-4"
      >
        Sign in with Google
      </button>
    </div>
  );
}
