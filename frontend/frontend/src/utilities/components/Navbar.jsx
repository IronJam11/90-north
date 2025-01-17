import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-24 bg-gray-800 text-white shadow-lg z-50">
      <div className="flex justify-between items-center h-full px-4">
        <div className="text-xl font-bold">90 NORTH ASSIGNMENT WEBSITE</div>
        <div>
          <button className="lg:hidden text-white p-2 hover:bg-gray-700 rounded">
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}