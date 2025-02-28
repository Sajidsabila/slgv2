import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import hamburgerIcon from "../../assets/icons8-hamburger.svg";
import closeIcon from "../../assets/close.svg";
import style from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPianoOpen, setIsPianoOpen] = useState(false);
  const [isDrumOpen, setIsDrumOpen] = useState(false);
  const [isGuitarOpen, setIsGuitarOpen] = useState(false);
  const [isVocalOpen, setIsVocalOpen] = useState(false);
  const [isFomOpen, setIsFomOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(false);


  const dropdownTimer = useRef(null);
  const submenuTimer = useRef(null);

  const handleMouseEnterDropdown = (menu) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    if (menu === "piano") {
      setIsPianoOpen(true);
      setIsDrumOpen(false);
      setIsGuitarOpen(false);
      setIsVocalOpen(false);
      setIsFomOpen(false);
    } else if (menu === "drum") {
      setIsDrumOpen(true);
      setIsPianoOpen(false);
      setIsGuitarOpen(false);
      setIsVocalOpen(false);
      setIsFomOpen(false);
    }else if (menu === "guitar") {
      setIsGuitarOpen(true);
      setIsPianoOpen(false);
      setIsDrumOpen(false);
      setIsVocalOpen(false);
      setIsFomOpen(false);
    }else if(menu === "vocal"){
      setIsVocalOpen(true);
      setIsPianoOpen(false);
      setIsDrumOpen(false);
      setIsGuitarOpen(false);
      setIsFomOpen(false);
    }else{
      setIsFomOpen(true);
      setIsPianoOpen(false);
      setIsDrumOpen(false);
      setIsGuitarOpen(false);
      setIsVocalOpen(false);
    }
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimer.current = setTimeout(() => {
      setIsPianoOpen(false);
      setIsDrumOpen(false);
      setIsPianoOpen(false);
      setIsVocalOpen(false);
    }, 300);
  };

  const handleMouseEnterSubmenu = (submenu) => {
    if (submenuTimer.current) clearTimeout(submenuTimer.current);
    setActiveSubmenu(submenu);
  };

  const handleMouseLeaveSubmenu = () => {
    submenuTimer.current = setTimeout(() => setActiveSubmenu(null), 300);
  };

  return (
    <nav className="bg-white shadow-lg fixed relative">
      <div className="max-w-screen-lg mx-auto px-4 flex justify-between items-center py-4 lg:px-1">
        <p className="text-xl font-bold"></p>

        {/* Toggle Menu Button (Mobile) */}
        <div className="md:hidden">
          <img
            src={isOpen ? closeIcon : hamburgerIcon}
            alt="Menu Icon"
            width="30px"
            className="cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg text-gray-800">
          <li className="hover:text-blue-600 cursor-pointer">
           <Link to="/"> Home</Link>
            </li>

          {/* Dropdown Piano */}
          <li
            className="relative cursor-pointer"
            onMouseEnter={() => handleMouseEnterDropdown("piano")}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <span className="hover:text-blue-600">Piano ▾</span>
            {isPianoOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`${style.dropdown} absolute left-0 mt-2 w-48 bg-[#454545] border-t-4 border-orange-500 text-white rounded-md shadow-lg`}
              >
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-black border-b border-gray-100 relative"
                  onMouseEnter={() => handleMouseEnterSubmenu("private")}
                  onMouseLeave={handleMouseLeaveSubmenu}
                >
                  Private Class ▾
                  {activeSubmenu === "private" && (
                    <ul className="absolute left-full top-0 mt-0 w-48 bg-[#454545] border-t-4 border-orange-500 text-white rounded-md shadow-lg">
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">CFK 1 PIANO</li>
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">CFK 2 PIANO</li>
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">JC PIANO</li>
                    </ul>
                  )}
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-black border-b border-gray-100 relative"
                  onMouseEnter={() => handleMouseEnterSubmenu("harmoni")}
                  onMouseLeave={handleMouseLeaveSubmenu}
                >
                  Harmoni Class ▾
                  {activeSubmenu === "harmoni" && (
                    <ul className="absolute left-full top-0 mt-0 w-48 bg-[#454545] border-t-4 border-orange-500 text-white rounded-md shadow-lg">
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">CFK 1 PIANO</li>
                    </ul>
                  )}
                </li>
              </motion.ul>
            )}
          </li>

          {/* Dropdown Drum */}
          <li
            className="relative cursor-pointer"
            onMouseEnter={() => handleMouseEnterDropdown("drum")}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <span className="hover:text-blue-600">Drum ▾</span>
            {isDrumOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`${style.dropdown} absolute left-0 mt-2 w-48 bg-[#454545] border-t-4 border-orange-500 text-white rounded-md shadow-lg`}
              >
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-black border-b border-gray-100 relative"
                  onMouseEnter={() => handleMouseEnterSubmenu("privateDrum")}
                  onMouseLeave={handleMouseLeaveSubmenu}
                >
                  Private Class ▾
                  {activeSubmenu === "privateDrum" && (
                    <ul className="absolute left-full top-0 mt-0 w-48 bg-[#454545] border-t-4 border-orange-500 text-white rounded-md shadow-lg">
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">CFK 1 DRUM</li>
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">JC 1 Drum</li>
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">JC 2 Drum</li>
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">JC 3 Drum</li>
                    </ul>
                  )}
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-black border-b border-gray-100 relative"
                  onMouseEnter={() => handleMouseEnterSubmenu("harmonidrum")}
                  onMouseLeave={handleMouseLeaveSubmenu}
                >
                  Harmoni Class ▾
                  {activeSubmenu === "harmonidrum" && (
                    <ul className="absolute left-full top-0 mt-0 w-50 bg-[#454545] border-t-4 border-orange-500 text-white rounded-md shadow-lg">
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">VLP HC DRUM  Kids</li>
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">VLP HC DRUM  Beginner</li>
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">VLP HC DRUM  Intermedi</li>
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">VLP HC DRUM  Advance</li>
                    </ul>
                  )}
                </li>
              </motion.ul>
            )}
          </li>

          <li
            className="relative cursor-pointer"
            onMouseEnter={() => handleMouseEnterDropdown("guitar")}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <span className="hover:text-blue-600">Guitar ▾</span>
            {isGuitarOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`${style.dropdown} absolute left-0 mt-2 w-48 bg-[#454545] border-t-4 border-orange-500 text-white rounded-md shadow-lg`}
              >
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-black border-b border-gray-100 relative"
                  onMouseEnter={() => handleMouseEnterSubmenu("privateGuitar")}
                  onMouseLeave={handleMouseLeaveSubmenu}
                >
                  Private Class ▾
                  {activeSubmenu === "privateGuitar" && (
                    <ul className="absolute left-full top-0 mt-0 w-48 bg-[#454545] border-t-4 border-orange-500 text-white rounded-md shadow-lg">
                 
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">JC 1 Guitar</li>
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">JC 2 Guitar</li>
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">JC 3 Drum</li>
                    </ul>
                  )}
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-black border-b border-gray-100 relative"
                  onMouseEnter={() => handleMouseEnterSubmenu("harmoniguitar")}
                  onMouseLeave={handleMouseLeaveSubmenu}
                >
                  Harmoni Class ▾
                  {activeSubmenu === "harmoniguitar" && (
                    <ul className="absolute left-full top-0 mt-0 w-50 bg-[#454545] border-t-4 border-orange-500 text-white rounded-md shadow-lg">
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">HC Guitar  Beginner</li>
                    
                    </ul>
                  )}
                </li>
              </motion.ul>
            )}
          </li>

       

          <li
            className="relative cursor-pointer"
            onMouseEnter={() => handleMouseEnterDropdown("vocal")}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <span className="hover:text-blue-600">Vocal ▾</span>
            {isVocalOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`${style.dropdown} absolute left-0 mt-2 w-48 bg-[#454545] border-t-4 border-orange-500 text-white rounded-md shadow-lg`}
              >
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-black border-b border-gray-100 relative"
                  onMouseEnter={() => handleMouseEnterSubmenu("privateVocal")}
                  onMouseLeave={handleMouseLeaveSubmenu}
                >
                  Private Class ▾
                  {activeSubmenu === "privateVocal" && (
                    <ul className="absolute left-full top-0 mt-0 w-48 bg-[#454545] border-t-4 border-orange-500 text-white rounded-md shadow-lg">
                 
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">CFK 1 Vocal</li>
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">CFK 2 Vocal</li>
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">JC 1 Vocal</li>
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">JC 2 Vocal</li>
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">JC 3 Vocal</li>
                    </ul>
                  )}
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-black border-b border-gray-100 relative"
                  onMouseEnter={() => handleMouseEnterSubmenu("harmonivocal")}
                  onMouseLeave={handleMouseLeaveSubmenu}
                >
                  Harmoni Class ▾
                  {activeSubmenu === "harmonivocal" && (
                    <ul className="absolute left-full top-0 mt-0 w-50 bg-[#454545] border-t-4 border-orange-500 text-white rounded-md shadow-lg">
                     
                    
                    </ul>
                  )}
                </li>
              </motion.ul>
            )}
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
          <Link to="/violin">Violin</Link></li>
          <li className="hover:text-blue-600 cursor-pointer">
          <Link to="/saxophone"> Saxophone</Link></li>

          <li
            className="relative cursor-pointer"
            onMouseEnter={() => handleMouseEnterDropdown("fom")}
            onMouseLeave={handleMouseLeaveDropdown}
       >
      <span className="hover:text-blue-600">Fom ▾</span>
      {isFomOpen && (
      <motion.ul
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute left-0 mt-2 w-48 bg-[#454545] border-t-4 border-orange-500 text-white rounded-md shadow-lg"
    >
      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">FOM Learn</li>
      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">FOM Funl</li>
      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">VLP FOM</li>
      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">Additional</li>
    </motion.ul>
  )}
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
