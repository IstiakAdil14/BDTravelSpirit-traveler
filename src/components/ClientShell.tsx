// components/ClientShell.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Loading from "@/components/shared/Loading";
import { useLoading } from "@/components/LoadingProvider";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isLoading, setIsLoading } = useLoading();
  const isAuthPage = pathname?.startsWith("/auth");
  const hasMountedRef = useRef(false);

  useEffect(() => {
    // Skip showing the global loader on the very first page load
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [pathname, setIsLoading]);

  return (
    <>
      {isLoading && <Loading />}
      {!isAuthPage && <Header />}
      {children}
      {!isAuthPage && <Footer />}
    </>
  );
}
