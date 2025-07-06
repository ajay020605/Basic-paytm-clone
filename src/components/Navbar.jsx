// components/Navbar.jsx

import React from "react";

export default function Navbar() {
  return (
    <div className="bg-black text-white text-xl flex justify-between items-center px-6 py-4">
      <h1 className="font-bold">Transfast</h1>
      <div className="cursor-pointer">Profile</div>
    </div>
  );
}
