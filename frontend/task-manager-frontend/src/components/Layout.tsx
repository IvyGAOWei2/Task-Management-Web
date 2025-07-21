import React from 'react';
import Header from './Header';
import Footer from './Footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 via-indigo-50 to-purple-100 font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex justify-center items-start">
        <section className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 min-h-[400px] border border-indigo-100">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  );
};