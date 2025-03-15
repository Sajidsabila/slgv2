import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import hamburgerIcon from "../../assets/icons8-hamburger.svg";
import closeIcon from "../../assets/close.svg";
import { apiGetProgramMateriPublic } from "../../api/apiPublic";
import style from "./Navbar.module.css";
import ProgramMateri from "../../pages/Admin/programMateri";

const Navbar = () => {
  const [program, setProgram] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownTimer = useRef(null);
  const submenuTimer = useRef(null);

  useEffect(() => {
    const controller = new AbortController(); // Buat instance AbortController
    const signal = controller.signal; // Ambil signal untuk request
  
    const getProgram = async () => {
      try {
        const programData = await apiGetProgramMateriPublic({ signal }); // Kirim signal ke API
        setProgram(programData);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Terjadi kesalahan", error?.response?.data || error.message);
        }
      }
    };
  
    getProgram();
  
    return () => {
      controller.abort(); // Hentikan request jika komponen unmount
    };
  }, []);
  

  const uniqueCourses = [...new Set(program.map(item => item.class_course))];
  const uniqueFormats = [...new Set(program.map(item => item.class_format))];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnterDropdown = (menu) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 300);
  };

  const handleMouseEnterSubmenu = (submenu) => {
    if (submenuTimer.current) clearTimeout(submenuTimer.current);
    setActiveSubmenu(submenu);
  };

  const handleMouseLeaveSubmenu = () => {
    submenuTimer.current = setTimeout(() => setActiveSubmenu(null), 300);
  };

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };


  const replaceTitle = (title) => {
    return (title || "").replace(/-\s*/, ""); 
};
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

          {uniqueCourses.map((course, index) => (
            <li
              key={index}
              className="relative cursor-pointer px-2 py-1 font-semibold font-sm"
              onMouseEnter={() => handleMouseEnterDropdown(course)}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <span className="hover:text-blue-600">{replaceTitle2(course)}</span>
              {activeDropdown === course && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`${style.dropdown} absolute left-0 mt-2 w-48 bg-[#454545] border-t-4 border-orange-500 text-white rounded-md shadow-lg`}
                >
                  {uniqueFormats.map((format, index) => (
                    <li
                      key={index}
                      className="px-3 py-2 cursor-pointer hover:bg-black border-b border-gray-100 relative"
                      onMouseEnter={() => handleMouseEnterSubmenu(format)}
                      onMouseLeave={handleMouseLeaveSubmenu}
                    >
                      {format === "Group" ? "Harmoni Class" : "Private Class"} 
                      {activeSubmenu === format && (
                        <ul className="absolute left-full top-0 mt-0 w-48 bg-[#454545] border-t-4 border-orange-500 text-white rounded-md shadow-lg">
                          {program
                            .filter(item => item.class_course === course && item.class_format === format)
                            .map((item, gIdx) => (
                              <li key={gIdx} className="px-4 py-2 hover:bg-black border-b border-gray-100">
                              <Link to={`/program-materi/${item.name}`}>
                        {replaceTitle2(item.class_grade) + " " + replaceTitle2(item.class_course)}
                        </Link>

                              </li>
                            ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </motion.ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
  <div className="md:hidden bg-white shadow-lg p-1 border-t-2 border-orange-700">
    <ul className="space-y-1">
      <li className="hover:text-blue-600 cursor-pointer px-2 py-1 py-2 border-b border-gray-900 text-xs font-semibold">
        <Link to="/">Home</Link>
      </li>

      {uniqueCourses.map((course, index) => (
        <li
          key={index}
          className="relative cursor-pointer px-2 py-2 border-b border-gray-900"
        >
          <div
            className="flex justify-between items-center"
            onClick={() => toggleDropdown(course)}
          >
            <span className="hover:text-blue-600 text-sm font-semibold">
              {replaceTitle2(course)}
            </span>
            <i className={`fa-solid fa-chevron-${activeDropdown === course ? "up" : "down"} pr-2`}></i>
          </div>

          {activeDropdown === course && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 w-full bg-white text-black border border-gray-300 shadow-lg rounded-md"
            >
              {uniqueFormats.map((format, fIndex) => (
                <li key={fIndex} className="relative">
                  <div
                    className="px-4 py-2 cursor-pointer text-sm font-normal flex justify-between border-b border-gray-300"
                    onClick={() => setActiveSubmenu(activeSubmenu === format ? "" : format)}
                  >
                    {format === "GR - Group" ? "Harmoni Class" : "Private Class"}
                    <i className={`fa-solid pl-2 fa-chevron-${activeSubmenu === format ? "up" : "down"} pr-2`}></i>
                  </div>
                  
                  {activeSubmenu === format && (
                    <ul className="mt-1 w-full bg-white text-black rounded-md shadow-lg">
                      {program
                        .filter(item => item.class_course === course && item.class_format === format)
                        .map((item, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-200 border-b border-gray-300"
                          >
                            <Link to={`/program-materi/${item.name}`} className="block w-full h-full focus:outline-none text-xs px-1">
                              {item.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              ))}
            </motion.ul>
          )}
        </li>
      ))}
    </ul>
  </div>
)}






    </nav>
  );
};

export default Navbar;