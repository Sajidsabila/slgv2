import React, { use, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { methodLogout } from "../../api/apiMethod";
import { UserAddOutlined } from "@ant-design/icons";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeDropdown2, setActiveDropdown2] = useState(null);
  const [open, setIsOpenModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const dropdownLinks = [
    {
      text: "Students Report",
      url: "/student/students-report",
      children: [
        { label: "Student Attendance", url: "/student/students-report/history-absensi" },
        { label: "History Pembayaran", url: "/student/students-report/fees" },
        { label: "Hasil Evaluasi Semester", url: "/student/students-report/evaluasi-semester" },
      ],
    },
    {
      text: "Learning Resources",
      url: "/student/learning-resources",
      children: [
        { label: "CalDic", url: "/student/history-absensi" },
        { label: "Education Program", url: "/student/history-pembayaran" },
        {
          label: "Learning Material",
          grandchildren: [
            { label: "Exam Speciment", url: "/student/program-materi" },
            { label: "LHB", url: "/student/program-materi" },
            { label: "SLG", url: "/student/program-materi" },
            { label: "Syllabus", url: "/student/program-materi" },
          ],
        },
      ],
    },
  ];

  const logoutStudent = async () => {

    try{
      const response = await logout(); 
      console.log(response);
    }catch(e){
      console.log(e);
    }finally{
      navigate("/");
    }

  }

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
    setActiveDropdown2(null);
  };

  const toggleDropdown2 = (index) => {
    setActiveDropdown2(activeDropdown2 === index ? null : index);
    setActiveDropdown(activeDropdown2 === index ? null : index);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="container mx-auto flex flex-col justify-between items-center py-3">

        {/* Mobile Toggle */}
        <div className="md:hidden flex justify-beetween items-center px-2 w-full">
       <img src="/assets/logowhite.svg" alt="Logo Simfoni" className="w-30" />
          <img
            src={isOpen ? "/assets/close.svg" : "/assets/hamburger.png"}
            alt="Menu Icon"
            width={25}
            className="cursor-pointer ml-auto"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        {/* Desktop Menu */}
        <div className="dekstop hidden md:flex flex-col w-full">
        <div className="flex flex-row justify-between items-center py-1 w-full">
          <img src="/assets/logowhite.svg" alt="Logo Simfoni" className="w-30" />

          {sessionStorage.getItem("user") && (
            <>
             <button
              onClick={() => {
                if (window.confirm("Are you sure you want to logout?"))
                  logoutStudent();
              }}
              className="text-sm font-semibold bg-red-500 py-2 px-3 text-white rounded-md hover:bg-red-600 hover:cursor-pointer"
            >
              Logout
            </button>
            {isOpen && (
              <p className="w-40 ms-80 text-md relative z-10 bottom-10">test 123</p>
            )}

            </>
           
          )}
        
        </div>
       <hr className="border-black my-2 relative z-10 right-100 w-[190%] mt-3" />
        <ul className="items-center w-full text-base text-gray-800 ">
          <div className="flex gap-3">
            <li className={`hover:text-red-900 cursor-pointer px-2 py-1 ${location.pathname === "/home" ? "font-bold" : ""}`}>
              <Link
                to={
                  !sessionStorage.getItem("profileInstructor") ? "/student/home" : "/teacher"
                }
              >
                Home
              </Link>
            </li>

            {sessionStorage.getItem("user") && (
              dropdownLinks.map((link, index) => (
                <li
                  key={index}
                  className="relative hover:text-red-900 cursor-pointer px-2 py-1"
                  onMouseEnter={() => setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {link.url ? (
                    <Link to={link.url}>{link.text}</Link>
                  ) : (
                    <span>{link.text}</span>
                  )}

                  {link.children && activeDropdown === index && (
                    <ul className="absolute top-full left-0 bg-white bg-slate-100 shadow-lg py-2 rounded-lg min-w-[200px] my-3">
                      {link.children.map((child, childIndex) => (
                        <li
                        
                          key={childIndex}
                          className="px-6 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-red-900 "
                        >
                          {child.url ? (
                            <Link to={child.url}>{child.label}</Link>
                          ) : (
                            <Link
                            to={child.url}
                              onMouseEnter={() => setActiveDropdown2(index)}
                              onClick={() => setActiveDropdown2(index)}
                              onMouseLeave={() => setActiveDropdown2(null)}
                            >
                              {child.label}
                            </Link>
                          )}

                          {child.grandchildren &&
                            activeDropdown2 === index && (
                              <ul className="absolute left-full top-20 bg-white shadow-lg py-2 min-w-[180px] rounded-md">
                                {child.grandchildren.map((gc, gcIndex) => (
                                  <li
                                    key={gcIndex}
                                    className="px-4 py-1 hover:bg-gray-200"
                                  >
                                    <Link to={gc.url}>{gc.label}</Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))
              )}
          </div>
        </ul>
      </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg p-3 border-t-2 border-orange-700">
          <ul className="space-y-2 text-sm font-semibold">
            <li className="hover:text-blue-600 px-2 py-2 border-b border-gray-200">
              <Link to="/">Home</Link>
            </li>

            {sessionStorage.getItem("user") && (
              <>
                {dropdownLinks.map((menu, idx) => (
                  <li
                    key={idx}
                    className="px-2 py-2 border-b border-gray-200"
                  >
                    <div
                      className="flex flex-row justify-between"
                      onClick={() => toggleDropdown(idx)}
                    >
                      <span className="font-bold">{menu.text}</span>
                      <i
                        className={`text-red-600 font-bold transition duration-300 fa-solid fa-chevron-${
                          activeDropdown === idx ? "up" : "down"
                        }`}
                      />
                    </div>
                    {menu.children && activeDropdown === idx && (
                      <ul className="pl-4 mt-1 space-y-3 text-gray-700 py-2">
                        {menu.children.map((child, ci) => (
                          <li key={ci}>
                            {child.url ? (
                              <Link to={child.url}>{child.label}</Link>
                            ) : (
                              <div
                                className="flex flex-row justify-between"
                                onClick={() => toggleDropdown2(idx)}
                              >
                                <span>{child.label}</span>
                                <i
                                  className={`text-red-600 font-bold transition duration-300 fa-solid fa-chevron-${
                                    activeDropdown2 === idx ? "up" : "down"
                                  }`}
                                />
                              </div>
                            )}

                            {child.grandchildren &&
                              activeDropdown2 === idx && (
                                <ul className="pl-4 mt-1 space-y-3 text-gray-700 py-2">
                                  {child.grandchildren.map((gc, gci) => (
                                    <li key={gci}>
                                      <Link to={gc.url}>{gc.label}</Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}

                {/* <li className="px-2 py-2 border-b border-gray-200 text-blue-700">
                  Total Poin: <span className="font-bold">20 Point</span>
                </li> */}

                <li className="px-2 py-2">
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to logout?"))
                        logoutStudent();
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
