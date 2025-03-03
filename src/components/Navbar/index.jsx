import React, { useState, useRef, useEffect } from "react";
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
  const [activeSubmenu, setActiveSubmenu] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const dropdownTimer = useRef(null);
  const submenuTimer = useRef(null);
  
  // Event listener untuk cek apakah layar mobile atau tidak
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);
  
  // Fungsi untuk menangani hover (desktop) atau klik (mobile)
  const handleMouseEnterDropdown = (menu) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
  
    setIsOpen(true);
    setIsPianoOpen(menu === "piano");
    setIsDrumOpen(menu === "drum");
    setIsGuitarOpen(menu === "guitar");
    setIsVocalOpen(menu === "vocal");
    setIsFomOpen(menu === "fom");
  };
  
  // Fungsi untuk menutup dropdown setelah delay (hanya untuk desktop)
  const handleMouseLeaveDropdown = () => {
    if (submenuTimer.current) clearTimeout(submenuTimer.current); // Mencegah delay submenu
    dropdownTimer.current = setTimeout(() => {
      setIsOpen(false);
      setIsPianoOpen(false);
      setIsDrumOpen(false);
      setIsGuitarOpen(false);
      setIsVocalOpen(false);
      setIsFomOpen(false);
    }, 300);
  };
  
  // Fungsi untuk toggle dropdown di mobile
  const toggleDropdown = (menu) => {
    if (menu === "piano") {
      setIsPianoOpen(!isPianoOpen);
      setIsDrumOpen(false);
      setIsGuitarOpen(false);
      setIsVocalOpen(false);
      setIsFomOpen(false);
    }
    if (menu === "drum") {
      setIsPianoOpen(false);
      setIsDrumOpen(!isDrumOpen);
      setIsGuitarOpen(false);
      setIsVocalOpen(false);
      setIsFomOpen(false);
    }
    if (menu === "guitar") {
      setIsPianoOpen(false);
      setIsDrumOpen(false);
      setIsGuitarOpen(!isGuitarOpen);
      setIsVocalOpen(false);
      setIsFomOpen(false);
    }
    if (menu === "vocal") {
      setIsPianoOpen(false);
      setIsDrumOpen(false);
      setIsGuitarOpen(false);
      setIsVocalOpen(!isVocalOpen);
      setIsFomOpen(false);
    }
    if (menu === "fom") {
      setIsPianoOpen(false);
      setIsDrumOpen(false);
      setIsGuitarOpen(false);
      setIsVocalOpen(false);
      setIsFomOpen(!isFomOpen);
    }
  };
  
  // Fungsi untuk menangani hover submenu
  const handleMouseEnterSubmenu = (submenu) => {
    if (submenuTimer.current) clearTimeout(submenuTimer.current);
    setActiveSubmenu(submenu);
  };
  
  // Fungsi untuk menutup submenu setelah delay
  const handleMouseLeaveSubmenu = () => {
    submenuTimer.current = setTimeout(() => setActiveSubmenu(""), 300);
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
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">
                        <Link to="/cfk-1-piano">
                        CFK 1 PIANO
                        </Link>
                     
                        </li>
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
                      <li className="px-4 py-2 hover:bg-black border-b border-gray-100">HC Piano Beginner</li>
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
                >
                  <Link>Group Class</Link>
                 
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
      {/*  mobile view */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden"}`}>
       <ul className="flex flex-col space-y-2 border-t-2 border-orange-500">
       <li className="hover:text-blue-600 py-2 px-3 cursor-pointer text-xl font-bold border-b-1 border-gray-500">
        <Link to="/">Home</Link>
       </li>
       <li className="cursor-pointer py-2 px-3  border-b border-gray-500">
      <div
        className="flex justify-between items-center"
        onClick={() => toggleDropdown("piano")}
      >
        <span className="hover:text-blue-600 text-xl font-bold">Piano</span>
        <i className={`fa-solid fa-chevron-${isPianoOpen ? "up" : "down"} pr-2`}></i>
      </div>

      {isPianoOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-2 w-full bg-white text-black border border-gray-300 shadow-lg rounded-md"
        >
          {/* Private Class */}
          <li
            className="px-4 py-2 cursor-pointer text-l font-bold flex justify-between border-b border-gray-300"
            onClick={() => setActiveSubmenu(activeSubmenu === "private" ? "" : "private")}
          >
            Private Class 
            <i className={`fa-solid pl-2 fa-chevron-${activeSubmenu === "private" ? "up" : "down"} pr-2`}></i>
          </li>
          {activeSubmenu === "private" && (
            <ul className="mt-1 w-full bg-white text-black rounded-md shadow-lg">
          <li className="px-4 py-2 hover:bg-gray-200 active:bg-gray-300 transition duration-300 ease-in-out text-lg border-b border-gray-300">
    <Link to="/cfk-1-piano" className="block w-full h-full focus:outline-none">
        CFK 1 PIANO
    </Link>
</li>


              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">CFK 2 PIANO</li>
              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">JC PIANO</li>
            </ul>
          )}

          {/* Harmoni Class */}
          <li
            className="px-4 py-2 cursor-pointer text-l font-bold flex justify-between border-b border-gray-300"
            onClick={() => setActiveSubmenu(activeSubmenu === "harmoni" ? "" : "harmoni")}
          >
            Harmoni Class 
            <i className={`fa-solid fa-chevron-${activeSubmenu === "harmoni" ? "up" : "down"} pr-2`}></i>
          </li>
          {activeSubmenu === "harmoni" && (
            <ul className="mt-1 w-full bg-white text-black  rounded-md shadow-lg">
              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">
                <Link to="/cfk-1-piano">CFK 1 PIANO</Link>
              </li>
            </ul>
          )}
        </motion.ul>
      )}
      </li>
      <li className="cursor-pointer py-2 px-3  border-b border-gray-500">
      <div
        className="flex justify-between items-center"
        onClick={() => toggleDropdown("drum")}
      >
        <span className="hover:text-blue-600 text-xl font-bold">Drum</span>
        <i className={`fa-solid fa-chevron-${isDrumOpen ? "up" : "down"} pr-2`}></i>
      </div>

      {isDrumOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-2 w-full bg-white text-black border border-gray-300 shadow-lg rounded-md"
        >
          {/* Private Class */}
          <li
            className="px-4 py-2 cursor-pointer text-l font-bold flex justify-between border-b border-gray-300"
            onClick={() => setActiveSubmenu(activeSubmenu === "private" ? "" : "private")}
          >
            Private Class 
            <i className={`fa-solid pl-2 fa-chevron-${activeSubmenu === "private" ? "up" : "down"} pr-2`}></i>
          </li>
          {activeSubmenu === "private" && (
            <ul className="mt-1 w-full bg-white text-black rounded-md shadow-lg">
              <li className="px-4 py-2 hover:bg-gray-200 text-l border-b border-gray-300">CFK 1 DRUM</li>
              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">JC 1 DRUM</li>
              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">JC 2 DRUM</li>
              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">JC 3 DRUM</li>
            </ul>
          )}

          {/* Harmoni Class */}
          <li
            className="px-4 py-2 cursor-pointer text-l font-bold flex justify-between border-b border-gray-300"
            onClick={() => setActiveSubmenu(activeSubmenu === "harmoni" ? "" : "harmoni")}
          >
            Harmoni Class 
            <i className={`fa-solid fa-chevron-${activeSubmenu === "harmoni" ? "up" : "down"} pr-2`}></i>
          </li>
          {activeSubmenu === "harmoni" && (
            <ul className="mt-1 w-full bg-white text-black  rounded-md shadow-lg">
              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">VLC HC Drum Kids</li>
              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">VLC HC Drum Beginner</li>
              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">VLC HC Drum Intermed</li>
              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">VLC HC Drum Advance</li>
            </ul>
          )}
        </motion.ul>
      )}
      </li>
      <li className="cursor-pointer py-2 px-3  border-b border-gray-500">
      <div
        className="flex justify-between items-center"
        onClick={() => toggleDropdown("guitar")}
      >
        <span className="hover:text-blue-600 text-xl font-bold">Guitar</span>
        <i className={`fa-solid fa-chevron-${isGuitarOpen ? "up" : "down"} pr-2`}></i>
      </div>

      {isGuitarOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-2 w-full bg-white text-black border border-gray-300 shadow-lg rounded-md"
        >
          {/* Private Class */}
          <li
            className="px-4 py-2 cursor-pointer text-l font-bold flex justify-between border-b border-gray-300"
            onClick={() => setActiveSubmenu(activeSubmenu === "private" ? "" : "private")}
          >
            Private Class 
            <i className={`fa-solid pl-2 fa-chevron-${activeSubmenu === "private" ? "up" : "down"} pr-2`}></i>
          </li>
          {activeSubmenu === "private" && (
            <ul className="mt-1 w-full bg-white text-black rounded-md shadow-lg">
            
              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">JC 1 Guitar</li>
              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">JC 2 Guitar</li>
            </ul>
          )}

          {/* Harmoni Class */}
          <li
            className="px-4 py-2 cursor-pointer text-l font-bold flex justify-between border-b border-gray-300"
            onClick={() => setActiveSubmenu(activeSubmenu === "harmoni" ? "" : "harmoni")}
          >
            Harmoni Class 
            <i className={`fa-solid fa-chevron-${activeSubmenu === "harmoni" ? "up" : "down"} pr-2`}></i>
          </li>
          {activeSubmenu === "harmoni" && (
            <ul className="mt-1 w-full bg-white text-black  rounded-md shadow-lg">
              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">HC Guitar Beginner</li>
            
            </ul>
          )}
        </motion.ul>
      )}
      </li>
      <li className="cursor-pointer py-2 px-3  border-b border-gray-500">
      <div
        className="flex justify-between items-center"
        onClick={() => toggleDropdown("vocal")}
      >
        <span className="hover:text-blue-600 text-xl font-bold">Vocal</span>
        <i className={`fa-solid fa-chevron-${isVocalOpen ? "up" : "down"} pr-2`}></i>
      </div>

      {isVocalOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-2 w-full bg-white text-black border border-gray-300 shadow-lg rounded-md"
        >
          {/* Private Class */}
          <li
            className="px-4 py-2 cursor-pointer text-l font-bold flex justify-between border-b border-gray-300"
            onClick={() => setActiveSubmenu(activeSubmenu === "private" ? "" : "private")}
          >
            Private Class 
            <i className={`fa-solid pl-2 fa-chevron-${activeSubmenu === "private" ? "up" : "down"} pr-2`}></i>
          </li>
          {activeSubmenu === "private" && (
            <ul className="mt-1 w-full bg-white text-black rounded-md shadow-lg">
            
              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">CFK 1 Vocal</li>
              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">CFK 2 Vocal</li>
              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">CFK 3 Vocal</li>
              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">JC 1 Vocal</li>
              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">JC 2 Vocal</li>
            </ul>
          )}

          {/* Harmoni Class */}
          <li
            className="px-4 py-2 cursor-pointer text-l font-bold flex justify-between border-b border-gray-300"
            onClick={() => setActiveSubmenu(activeSubmenu === "harmoni" ? "" : "harmoni")}
          >
            Harmoni Class 
           
          </li>
        
        </motion.ul>
      )}
      </li>
       <li className="hover:text-blue-600 py-2 px-3 text-xl font-bold cursor-pointer border-b-1 border-gray-500">
        <Link to="/">Violin</Link>
       </li>
       <li className="hover:text-blue-600 py-2 px-3 text-xl font-bold cursor-pointer border-b-1 border-gray-500">
        <Link to="/">Saxophone</Link>
       </li>
       <li className="cursor-pointer py-2 px-3  border-b border-gray-500">
      <div
        className="flex justify-between items-center"
        onClick={() => toggleDropdown("fom")}
      >
        <span className="hover:text-blue-600 text-xl font-bold">FOM</span>
        <i className={`fa-solid fa-chevron-${isFomOpen ? "up" : "down"} pr-2`}></i>
      </div>

      {isFomOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-2 w-full bg-white text-black border border-gray-300 shadow-lg rounded-md"
        >

            <ul className="mt-1 w-full bg-white text-black rounded-md shadow-lg">
            
              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">FOM Learn</li>
              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">FOM FUN</li>
              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">VLP FOMl</li>
              <li className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300">Additional</li>
            </ul>
          

        
        </motion.ul>
      )}
      </li>
       </ul>

      </div>
    </nav>

    // mobile menu

  );
};

export default Navbar;
