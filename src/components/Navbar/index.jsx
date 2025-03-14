import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import hamburgerIcon from "../../assets/icons8-hamburger.svg";
import closeIcon from "../../assets/close.svg";
import { apiGetProgramMateriPublic } from "../../api/apiPublic";
import style from "./Navbar.module.css";

const Navbar = () => {
  const [program, setProgram] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownTimer = useRef(null);
  const submenuTimer = useRef(null);

  useEffect(() => {
    const getProgram = async () => {
      try {
        const programData = await apiGetProgramMateriPublic();
        setProgram(programData);
      } catch (error) {
        console.error("Terjadi kesalahan", error?.response?.data || error.message);
      }
    };
    getProgram();
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

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-screen-lg mx-auto px-6 flex justify-between items-center py-3">

      <div className="md:hidden ml-auto">
          <img
            src={isOpen ? closeIcon : hamburgerIcon}
            alt="Menu Icon"
            width="28px"
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
              className="relative cursor-pointer px-2 py-1"
              onMouseEnter={() => handleMouseEnterDropdown(course)}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <span className="hover:text-blue-600">{course}</span>
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
                      {format === "Group" ? "Harmoni Class" : "Private Class"} ▾
                      {activeSubmenu === format && (
                        <ul className="absolute left-full top-0 mt-0 w-48 bg-[#454545] border-t-4 border-orange-500 text-white rounded-md shadow-lg">
                          {program
                            .filter(item => item.class_course === course && item.class_format === format)
                            .map((item, gIdx) => (
                              <li key={gIdx} className="px-4 py-2 hover:bg-black border-b border-gray-100">
                              <Link to={`/program-materi/${item.name}`}>
  {item.class_grade}
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
    </nav>
  );
};

export default Navbar;