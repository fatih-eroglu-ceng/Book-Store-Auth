"use client";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
        <main>
          {children}
        </main>
    </SessionProvider>
  );
}
