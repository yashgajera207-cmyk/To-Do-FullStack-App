"use client";

import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-mist-50/60">
      <Sidebar />
      <div className="flex min-h-screen flex-col md:pl-64">
        <Navbar />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
