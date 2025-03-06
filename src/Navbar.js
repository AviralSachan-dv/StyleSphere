import React from "react";
import { FaSearch, FaHeart, FaShoppingBag } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md border-b">
      <div className="flex items-center space-x-4">
        <span className="font-bold text-xl">BEWAKOOF</span>
        <ul className="flex space-x-6 text-sm font-medium">
          <li>MEN</li>
          <li>WOMEN</li>
          <li>PLUS SIZE</li>
          <li>ACCESSORIES</li>
          <li>OFFICIAL MERCH</li>
          <li>SNEAKERS</li>
          <li>BEWAKOOF AIR</li>
          <li>HEAVY DUTY</li>
        </ul>
      </div>
      <div className="flex items-center border p-2 rounded-md w-1/3">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search by products"
          className="w-full outline-none"
        />
      </div>
      <div className="flex items-center space-x-4">
        <FaHeart className="text-lg cursor-pointer" />
        <FaShoppingBag className="text-lg cursor-pointer" />
        <button className="border px-4 py-1 rounded-md">LOGIN</button>
      </div>
    </nav>
  );
};

export default Navbar;
