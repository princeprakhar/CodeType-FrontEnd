// src/components/layout/Layout.tsx
import React from 'react';
import { Header } from './Header';
import Footer from "./Footer"

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer></Footer>
    </div>
  );
};