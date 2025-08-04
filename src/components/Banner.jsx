import React from 'react';

export default function Banner() {
  return (
    <div className="w-full h-64 md:h-80 bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white text-center px-4">
      <div>
        <h1 className="text-3xl md:text-5xl font-bold mb-2">Welcome to ShopSage</h1>
        <p className="text-md md:text-lg">Find the best products at unbeatable prices!</p>
      </div>
    </div>
  );
}
