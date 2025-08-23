import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import hamburgerIcon from "../../assets/icons8-hamburger.svg";
import closeIcon from "../../assets/close.svg";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 
  const dropdownTimer = useRef(null);
  const submenuTimer = useRef(null);

  const logoutStudent = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

const point =  JSON.parse(sessionStorage.getItem("token"))?.total_point ;
  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-screen-lg mx-auto px-1 flex justify-between items-center py-3">
          <p className="md:hidden py-2 px-3 text-sm bg-slate-700 text-white rounded-full mx-7">{point} poin</p>
        <div className="md:hidden ml-auto px-4">
          <img
            src={isOpen ? closeIcon : hamburgerIcon}
            alt="Menu Icon"
            width="25px"
            className="cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex text-base text-gray-800 w-full">
          <ul className="xl:ms-[-25%] 2xl:ms-[-30%] xl:text-xl flex gap-3">
            <li className="hover:text-blue-600 cursor-pointer px-2 py-1">
              <Link to={`${!sessionStorage.getItem("profileInstructor") ? "/" : "/teacher"}`}>Home</Link>
            </li>
            {sessionStorage.getItem("token") && (
              <>
              <li className="hover:text-blue-600 cursor-pointer px-2 py-1">
                <Link to="/history-absensi">History Attendance</Link>
              </li>
               <li className="hover:text-blue-600 cursor-pointer px-2 py-1">
                <Link to="/fees">Fees</Link>
              </li>
              </>
              
            )}
          </ul>

          {(sessionStorage.getItem("token") || sessionStorage.getItem("credentials")) && (
            <li className="hover:text-blue-600 px-2 py-1 ml-auto xl:me-[-30%] flex gap-2 items-center">
              {point && (
                   <p className="py-2 px-3 text-sm bg-slate-700 text-white rounded-full">{point} poin</p>
              )}
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to logout?")) logoutStudent();
                }}
                className="text-sm font-semibold bg-red-500 py-2 px-3 text-white rounded-md hover:bg-red-600 hover:cursor-pointer"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg p-3 border-t-2 border-orange-700">
          <ul className="space-y-2 text-sm font-semibold">
            <li className="hover:text-blue-600 cursor-pointer px-2 py-2 border-b border-gray-200">
              <Link to="/">Home</Link>
            </li>

            {sessionStorage.getItem("token") && (
              <>
                <li className="hover:text-blue-600 cursor-pointer px-2 py-2 border-b border-gray-200">
                  <Link to="/history-absensi">History Attendance</Link>
                </li>
                <li className="hover:text-blue-600 cursor-pointer px-2 py-2 border-b border-gray-200">
                  <Link to="/fees">Fees</Link>
                </li>

             {point && (
                 <li className="px-2 py-2 border-b border-gray-200 text-blue-700">
                  Total Poin: <span className="font-bold">{point}</span>
                </li>
             )}
                <li className="px-2 py-2">
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to logout?")) logoutStudent();
                    }}
                    className="w-full text-sm font-semibold bg-red-500 py-2 px-4 text-white rounded-md hover:bg-red-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;