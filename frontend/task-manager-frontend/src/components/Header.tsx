import React from 'react';
import Link from 'next/link';

const Header = () => (
  <header className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white shadow-lg">
    <div className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-3xl font-extrabold tracking-tight hover:text-gray-200 transition">
          <span className="inline-flex items-center gap-2">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="inline-block"><circle cx="12" cy="12" r="10" fill="#fff" opacity="0.2"/><path d="M7 12h10M12 7v10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            TaskManager
          </span>
        </Link>
        <nav className="flex gap-2">
          <Link href="/tasks" className="px-4 py-2 rounded hover:bg-indigo-700 transition font-medium">
            Tasks
          </Link>
          <Link href="/tasks/new" className="px-4 py-2 rounded bg-white text-indigo-700 hover:bg-indigo-100 transition font-semibold shadow">
            + Create Task
          </Link>
        </nav>
      </div>
    </div>
  </header>
);

export default Header;
