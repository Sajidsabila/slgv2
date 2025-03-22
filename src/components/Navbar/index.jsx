import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import hamburgerIcon from "../../assets/icons8-hamburger.svg";
import closeIcon from "../../assets/close.svg";


const Navbar = () => {
  const [program, setProgram] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 
  console.log(location);
  const dropdownTimer = useRef(null);
  const submenuTimer = useRef(null);

const  replaceTitle2 = (title) => {
    if (!title) return ""; 
    return title.split("-")[1]?.trim() || ""; 
};
  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-screen-lg mx-auto px-1 flex justify-between items-center py-3">

      <div className="md:hidden ml-auto px-4">
          <img
            src={isOpen ? closeIcon : hamburgerIcon}
            alt="Menu Icon"
            width="25px"
            className="cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        <ul className="hidden md:flex space-x-5 text-base text-gray-800">
          <li className="hover:text-blue-600 cursor-pointer px-2 py-1">
            <Link to="/">Home</Link>
          </li>

        
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
  <div className="md:hidden bg-white shadow-lg p-1 border-t-2 border-orange-700">
    <ul className="space-y-1">
      <li className="hover:text-blue-600 cursor-pointer px-2 py-1 py-2 border-b border-gray-900 text-xs font-semibold">
        <Link to="/">Home</Link>
      </li>

    
    </ul>
  </div>
)}


    </nav>
  );
};

export default Navbar;