"use client";

import Carousel from './components/Carousel';
import React, { useEffect } from 'react';
import Categories from './components/HomeCategories';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {

    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <main className="w-full">
        {session ? (
          <>
            <section className="py-10 px-14 w-full max-w-7xl mx-auto">
              <Carousel />
            </section>

            <section className="px-14 w-full mx-auto">
              <Categories />
            </section>
          </>
        ) : null}
      </main>

      <footer></footer>
    </div>
  );
}
