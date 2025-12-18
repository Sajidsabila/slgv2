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
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation().pathname;

  const dropdownLinks = [
    {
      text: "Students Report",
      url: "/student/students-report",
      children: [
        { label: "Student Attendance", url: "/student/students-report/history-absensi" },
        { label: "Fees", url: "/student/students-report/fees" },
        { label: "Evaluation Semester", url: "/student/students-report/evaluasi-semester" },
      ],
    },
    {
      text: "Learning Resources",
      url: "/student/learning-resources",
      children: [
        { label: "Calender Academic", url: "/student/learning-resources/kalender-academic" },
        { label: "Education Program", url: "/student/learning-resources/program-edukasi" },
        {
          label: "Learning Material",
          grandchildren: [
              { label: "Syllabus", url: "/student/learning-resources/materi-pembelajaran/syllabus" },
             { label: "Exam Speciment", url: "/student/learning-resources/materi-pembelajaran/exam-speciment" },
          
          
          
          ],
        },
      ],
    },
  ];

  const teacherLinks =[
     {
      text: "Learning Resources",
      
      children: [
        { label: "Calender Academic", url: "/teacher/learning-resources/kalender-academic" },
        { label: "Education Program", url: "/teacher/learning-resources/program-edukasi" },
        {
          label: "Learning Material",
          grandchildren: [
            { label: "Syllabus", url: "/teacher/learning-resources/syllabus" },
            { label: "Exam Speciment", url: "/teacher/learning-resources/exam-speciment" },
            { label: "SLG", url: "/teacher/learning-resources/slg" },
            { label: "LHB", url: "/teacher/learning-resources/lhb" },
          ],
        },
      ],
    },
    {
      text: "Modul Training",
      children: [
        { label: "Student Attendance", grandchildren: [
          {label: "Product Knowledge", url: "/student/students-report/history-absensi"},
          {label: "Company Profile", url: "/student/students-report/history-absensi"},
          {label: "Visi Misi", url: "/student/students-report/history-absensi"},
          {label: "SMI Learning System Concept ", url: "/student/students-report/history-absensi"},
        ], 
      },
      { label : "Musikal Skill", grandchildren: [
        {label: "Playing", url: "/student/students-report/fees"},
        {label: "Improvising (Yafet)", url: "/student/students-report/fees"},
        {label: "Listening", url: "/student/students-report/fees"},
        {label: "Reading", url: "/student/students-report/fees"},
        {label: "IK", url: "/student/students-report/fees"},
        {label: "dll", url: "/student/students-report/fees"},
      ]},
      { label : "Technology Skill", grandchildren:  [
        {label: "Beginner", url: "/student/students-report/fees"},
        {label: "Intermediate", url: "/student/students-report/fees"},
        {label: "Advanced", url: "/student/students-report/fees"},
      ]},
        { label : "Pedagogy Skill", grandchildren:  [
        {label: "Psikology Music", url: "/student/students-report/fees"},
        {label: "Intermediate", url: "/student/students-report/fees"}
      ]},
      {label: "Head Education Modul", url: "/student/students-report/fees"},
      ],
    },
   
  ];

  const logoutStudent = async () => {
    try {
      const response = await logout(); 
      console.log(response);
    } catch (e) {
      console.log(e);
    } finally {
      navigate("/");
    }
  };

  // MOBILE
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
    setActiveDropdown2(null);
  };

  const toggleDropdown2 = (index) => {
    setActiveDropdown2(activeDropdown2 === index ? null : index);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="container mx-auto flex flex-col justify-between items-center py-3">

        {/* MOBILE HEADER */}
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

        {/* DESKTOP */}
        <div className="dekstop hidden md:flex flex-col w-full">
          <div className="flex flex-row justify-between items-center py-1 w-full">
            <img src="/assets/logowhite.svg" alt="Logo Simfoni" className="w-30" />

            {sessionStorage.getItem("user") && (
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to logout?"))
                    logoutStudent();
                }}
                className="text-sm font-semibold bg-red-500 py-2 px-3 text-white rounded-md hover:bg-red-600 hover:cursor-pointer"
              >
                Logout
              </button>
            )}
          </div>

          <hr className="border-black my-2 relative z-10 right-100 w-[190%] mt-3" />
          {location.startsWith("/student") && (
              <ul className="items-center w-full text-base text-gray-800">
            <div className="flex gap-3">

              {/* HOME */}
              <li
                className={`hover:text-red-900 cursor-pointer px-2 py-1 ${
                  location.pathname === "/student" ? "font-bold" : ""
                }`}
              >
                <Link
                  to={"/student"}
                >
                  Home
                </Link>
              </li>

              {/* DROPDOWN */}

              {dropdownLinks.map((link, index) => (
                  <li
                    key={index}
                    className="relative hover:text-red-900 cursor-pointer px-2 py-1"
                    onMouseEnter={() => setActiveDropdown(index)}
                  >
                    {link.url ? (
                      <Link className="w-full" to={link.url}>{link.text}</Link>
                    ) : (
                      <span>{link.text}</span>
                    )}

                    {/* FIRST LEVEL */}
                    {link.children && activeDropdown === index && (
                      <ul
                        className="absolute top-full left-0 bg-white bg-slate-100 shadow-lg py-2 rounded-lg min-w-[200px] my-3"
                        onMouseLeave={() => {
                          setActiveDropdown(null);
                          setActiveDropdown2(null);
                        }}
                      >
                        {link.children.map((child, childIndex) => (
                          <li
                            key={childIndex}
                            className="relative w-full flex items-center"
                            onMouseEnter={() => child.grandchildren && setActiveDropdown2(childIndex)}
                            onMouseLeave={() => child.grandchildren && setActiveDropdown2(null)}
                          >
                            {child.url ? (
                              <Link className="relative px-6 py-2 text-sm w-full text-gray-700 hover:bg-gray-200 hover:text-red-900" to={child.url}>{child.label}</Link>
                            ) : (
                              <span className="relative px-6 py-2 w-full text-sm text-gray-700 hover:bg-gray-200 hover:text-red-900">{child.label}</span>
                            )}

                            {/* SECOND LEVEL */}
                            {child.grandchildren && activeDropdown2 === childIndex && (
                              <ul className="absolute left-full top-0 bg-white shadow-lg py-2 min-w-[200px] rounded-md">
                                {child.grandchildren.map((gc, gcIndex) => (
                                  <li key={gcIndex} className="w-full flex items-center">
                                    <Link to={gc.url} className="relative w-full border-2relative px-6 py-2 text-sm w-full text-gray-700 hover:bg-gray-200 hover:text-red-900 ">{gc.label}</Link>
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
            </div>
          </ul>
          )}

            {location.startsWith("/teacher") && (
            <ul className="items-center w-full text-base text-gray-800">
            <div className="flex gap-3">

              {/* HOME */}
              <li
                className={`hover:text-red-900 cursor-pointer px-2 py-1 ${
                  location.pathname === "/teacher" ? "font-bold" : ""
                }`}
              >
                <Link
                  to={
                  
                       "/teacher"
                  }
                >
                  Home
                </Link>
              </li>

                {teacherLinks.map((link, index) => (
                  <li
                    key={index}
                    className="relative hover:text-red-900 cursor-pointer px-2 py-1"
                    onMouseEnter={() => setActiveDropdown(index)}
                  >
                    {link.url ? (
                      <Link className="w-full" to={link.url}>{link.text}</Link>
                    ) : (
                      <span>{link.text}</span>
                    )}

                    {/* FIRST LEVEL */}
                    {link.children && activeDropdown === index && (
                      <ul
                        className="absolute top-full left-0 bg-white bg-slate-100 shadow-lg py-2 rounded-lg min-w-[200px] my-3"
                        onMouseLeave={() => {
                          setActiveDropdown(null);
                          setActiveDropdown2(null);
                        }}
                      >
                        {link.children.map((child, childIndex) => (
                          <li
                            key={childIndex}
                            className="relative w-full flex items-center"
                            onMouseEnter={() => child.grandchildren && setActiveDropdown2(childIndex)}
                            onMouseLeave={() => child.grandchildren && setActiveDropdown2(null)}
                          >
                            {child.url ? (
                              <Link className="relative px-6 py-2 text-sm w-full text-gray-700 hover:bg-gray-200 hover:text-red-900" to={child.url}>{child.label}</Link>
                            ) : (
                              <span className="relative px-6 py-2 w-full text-sm text-gray-700 hover:bg-gray-200 hover:text-red-900">{child.label}</span>
                            )}

                            {/* SECOND LEVEL */}
                            {child.grandchildren && activeDropdown2 === childIndex && (
                              <ul className="absolute left-full top-0 bg-white shadow-lg py-2 min-w-[180px] rounded-md">
                                {child.grandchildren.map((gc, gcIndex) => (
                                  <li key={gcIndex} className="w-full flex items-center">
                                    <Link to={gc.url} className="relative w-full border-2relative px-6 py-2 text-sm w-full text-gray-700 hover:bg-gray-200 hover:text-red-900 ">{gc.label}</Link>
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
            </div>


          </ul>

          )}

          
        
        </div>
      </div>

     
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg p-3 border-t-2 border-orange-700">
          <ul className="space-y-2 text-sm font-semibold">
            <li className="hover:text-blue-600 px-2 py-2 border-b border-gray-200">
              <Link to={
                    !sessionStorage.getItem("profileInstructor")
                      ? "/student/home"
                      : "/teacher"
                  }>Home</Link>
            </li>

            {sessionStorage.getItem("user") && (
              <>
                {dropdownLinks.map((menu, idx) => (
                  <li key={idx} className="px-2 py-2 border-b border-gray-200">
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

                            {child.grandchildren && activeDropdown2 === idx && (
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

                <li className="px-2 py-2 hover:curor-pointer">
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to logout?"))
                        logoutStudent();
                    }}
                    className="w-full text-sm font-semibold bg-red-500 py-2 px-4 text-white rounded-md hover:bg-red-600 hover:cursor-pointer"
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
 