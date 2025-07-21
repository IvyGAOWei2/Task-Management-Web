import React from 'react';

const Footer = () => (
  <footer className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white py-6 mt-auto shadow-inner">
    <div className="container mx-auto px-6 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} <span className="font-bold">TaskManager</span>. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
