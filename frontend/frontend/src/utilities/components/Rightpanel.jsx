import React from 'react';

export default function RightPanel() {
  return (
    <div className="fixed top-24 right-0 h-[calc(100vh-4rem)] w-72 bg-gray-200 shadow-lg overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">About this website</h2>
        <p className="mt-4 text-gray-700">- This offers seemless chat integration with people</p>
        <p className="mt-4 text-gray-700">- It also ensures the use of websockets</p>
      </div>
    </div>
  );
}