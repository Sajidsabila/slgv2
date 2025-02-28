import React, { useState } from "react";
import hamburgerIcon from "../../assets/icons8-hamburger.svg";
import closeIcon from "../../assets/close.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-screen-lg mx-auto px-4 flex justify-between items-center py-4 sm:px-8">
        {/* Logo */}
        <p className="text-xl font-bold">Test</p>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <img
            src={isOpen ? closeIcon : hamburgerIcon}
            alt="Menu Icon"
            width="30px"
            className="cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        {/* Menu Utama (Desktop) */}
        <ul className="hidden md:flex space-x-6 text-lg text-gray-800">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>

          {/* Dropdown Menu */}
          <li
            className="relative group cursor-pointer"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <span className="hover:text-blue-600">Instrumen ▾</span>
            {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
                <li className="px-4 py-2 hover:bg-gray-200">Piano</li>
                <li className="px-4 py-2 hover:bg-gray-200">Drum</li>
                <li className="px-4 py-2 hover:bg-gray-200">Guitar</li>
                <li className="px-4 py-2 hover:bg-gray-200">Violin</li>
                <li className="px-4 py-2 hover:bg-gray-200">Saxophone</li>
                <li className="px-4 py-2 hover:bg-gray-200">Fom</li>
              </ul>
            )}
          </li>

          <li className="hover:text-blue-600 cursor-pointer">About</li>
          <li className="hover:text-blue-600 cursor-pointer">Contact</li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul className="text-lg text-black flex flex-col gap-2 bg-gray-100 shadow-md p-4">
          <li className="bg-black px-4 text-white py-2 rounded">Home</li>

          {/* Dropdown Menu di Mobile */}
          <li>
            <button
              className="bg-white w-full text-left px-4 py-2 border-b border-gray-300"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Instrumen ▾
            </button>
            {isDropdownOpen && (
              <ul className="bg-white border rounded-md shadow-md mt-1">
                <li className="px-4 py-2 hover:bg-gray-200">Piano</li>
                <li className="px-4 py-2 hover:bg-gray-200">Drum</li>
                <li className="px-4 py-2 hover:bg-gray-200">Guitar</li>
                <li className="px-4 py-2 hover:bg-gray-200">Violin</li>
                <li className="px-4 py-2 hover:bg-gray-200">Saxophone</li>
                <li className="px-4 py-2 hover:bg-gray-200">Fom</li>
              </ul>
            )}
          </li>

          <li className="bg-white px-4 py-2 border-b border-gray-300">About</li>
          <li className="bg-white px-4 py-2 border-b border-gray-300">Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
