import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeDropdown2, setActiveDropdown2] = useState(null);
  const [activeDropdown3, setActiveDropdown3] = useState(null);

  const navigate = useNavigate();
  const { logout } = useAuth();
  const { pathname } = useLocation();

  const isStudent = pathname.startsWith("/student");
  const isTeacher = pathname.startsWith("/teacher");

  /* ================= DATA MENU ================= */

  const dropdownLinks = [
    {
      text: "Students Report",
      url: "/student/students-report",
      children: [
        {
          label: "Student Attendance",
          url: "/student/students-report/history-absensi",
        },
        { label: "Fees", url: "/student/students-report/fees" },
        {
          label: "Evaluation Semester",
          url: "/student/students-report/evaluasi-semester",
        },
      ],
    },
    {
      text: "Learning Resources",
      url: "/student/learning-resources",
      children: [
        {
          label: "Calender Academic",
          url: "/student/learning-resources/kalender-academic",
        },
        {
          label: "Education Program",
          url: "/student/learning-resources/program-edukasi",
        },
        {
          label: "Learning Material",
          children: [
            {
              label: "Syllabus",
              url: "/student/learning-resources/materi-pembelajaran/syllabus",
            },
            {
              label: "Exam Speciment",
              url: "/student/learning-resources/materi-pembelajaran/exam-speciment",
            },
          ],
        },
      ],
    },
  ];

  const teacherLinks = [
    {
      text: "Learning Resources",
      children: [
        {
          label: "Calender Academic",
          url: "/teacher/learning-resources/kalender-academic",
        },
        {
          label: "Education Program",
          url: "/teacher/learning-resources/program-edukasi",
        },
        {
          label: "Learning Material",
          children: [
            { label: "Syllabus", url: "/teacher/learning-resources/syllabus" },
            {
              label: "Exam Speciment",
              url: "/teacher/learning-resources/exam-speciment",
            },
            { label: "SLG", url: "/teacher/learning-resources/slg" },
            { label: "LHB", url: "/teacher/learning-resources/lhb" },
          ],
        },
      ],
    },
    {
      text: "Modul Training",
      children: [
        {
          label: "Initial Training",
          children: [
            {
              label: "Product Knowledge",
              url: "/teacher/initial-training/product-knowledge",
            },
            {
              label: "Company Profile",
              url: "/teacher/initial-training/company-profile",
            },
            { label: "Visi Misi", url: "/teacher/initial-training/visi-misi" },
            {
              label: "SMI Learning System Concept",
              children: [
                {
                  label: "SMI Value",
                  url: "/teacher/initial-training/smi-value",
                },
                {
                  label: "Syllabus Overview",
                  url: "/teacher/initial-training/Syllabus Overview",
                },
                {
                  label: "IMTE",
                  url: "/teacher/initial-training/IMTE",
                },
                {
                  label: "Classroom SOP",
                  url: "/teacher/initial-training/Classroom SOP",
                },
              ],
            },
          ],
        },
        {
          label: "Musikal Skill",
          children: [
            { label: "Playing", url: "/teacher/musical-skill/playing" },
            {
              label: "Improvising (Yafet)",
              url: "/teacher/musical-skill/improvising",
            },
            { label: "Listening", url: "/teacher/musical-skill/Listening" },
            { label: "Reading", url: "/teacher/musical-skill/Reading" },
            { label: "Singing", url: "/teacher/musical-skill/Singing" },
            {
              label: "Instrument Knowledge",
              url: "/teacher/musical-skill/Instrument Knowledge",
            },
          ],
        },
        {
          label: "Technology Skill",
          children: [
            { label: "Beginner", url: "/teacher/technology-skill/Beginner" },
            {
              label: "Intermediate",
              url: "/teacher/technology-skill/Intermediate",
            },
            { label: "Advanced", url: "/teacher/students-report/Advanced" },
          ],
        },
        {
          label: "Pedagogy Skill",
          url: "/teacher/pedagogy-skill/Pedagogy Skill",
        },
        {
          label: "Head Education Modul",
          url: "/teacher/head-education-modul/Head Education Modul",
        },
      ],
    },
  ];

  const logoutStudent = async () => {
    try {
      await logout();
    } finally {
      navigate("/");
    }
  };

  const toggleDropdown = (i) => {
    setActiveDropdown(activeDropdown === i ? null : i);
    setActiveDropdown2(null);
    setActiveDropdown3(null);
  };

  const toggleDropdown2 = (i) => {
    setActiveDropdown2(activeDropdown2 === i ? null : i);
    setActiveDropdown3(null);
  };

  const toggleDropdown3 = (i) => {
    setActiveDropdown3(activeDropdown3 === i ? null : i);
  };

  const closeAllDropdown = () => {
    setActiveDropdown(null);
    setActiveDropdown2(null);
    setActiveDropdown3(null);
  };
  return (
    <nav className="bg-white shadow-lg fixed w-full z-[200]">
      <div className="container mx-auto flex flex-col justify-between items-center py-3">
        {/* MOBILE HEADER */}
        <div className="md:hidden flex justify-beetween items-center px-2 w-full">
          <img
            src="/assets/logowhite.svg"
            alt="Logo Simfoni"
            className="w-30"
          />
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
            <img
              src="/assets/logowhite.svg"
              alt="Logo Simfoni"
              className="w-30"
            />

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
          {isStudent && (
            <ul className="items-center w-full text-base text-gray-800 h-full">
              <div className="flex gap-3">
                <li
                  className={`hover:text-red-900 cursor-pointer px-2 py-1 ${pathname === "/student" ? "font-bold" : ""}`}
                >
                  <Link to="/student">Home</Link>
                </li>

                {dropdownLinks.map((link, index) => (
                  <li
                    key={index}
                    className="relative hover:text-red-900 cursor-pointer px-2 py-1"
                    // Level 1: Begitu mouse masuk, buka dropdown ini dan tutup level di bawahnya
                    onMouseEnter={() => {
                      setActiveDropdown(index);
                      setActiveDropdown2(null);
                      setActiveDropdown3(null);
                    }}
                  >
                    <span>{link.text}</span>

                    {link.children && activeDropdown === index && (
                      <ul className="absolute top-full left-0 bg-white shadow-lg py-2 rounded-lg min-w-[260px] border border-gray-300 z-[9999] ">
                        {link.children.map((child, ci) => (
                          <li
                            key={ci}
                            className="flex flex-col"
                            // Level 2: Mouse masuk ke area menu ini, langsung buka
                            onMouseEnter={() => {
                              if (child.children) setActiveDropdown2(ci);
                              setActiveDropdown3(null); // Reset cucu
                            }}
                          >
                            {child.url ? (
                              <Link
                                className="block px-6 py-2 text-sm hover:bg-gray-100"
                                to={child.url}
                                onClick={closeAllDropdown}
                              >
                                {child.label}
                              </Link>
                            ) : (
                              <div className="flex justify-between items-center px-6 py-2 text-sm hover:bg-gray-100">
                                <span
                                  className={
                                    activeDropdown2 === ci
                                      ? "font-bold text-red-600"
                                      : ""
                                  }
                                >
                                  {child.label}
                                </span>
                                <i
                                  className={`fa-solid fa-chevron-${activeDropdown2 === ci ? "up" : "down"} text-[10px]`}
                                />
                              </div>
                            )}

                            {/* Level 2 Content (Ke Bawah) */}
                            {child.children && activeDropdown2 === ci && (
                              <ul className="bg-gray-50 py-1">
                                {child.children.map((gc, gci) => (
                                  <li
                                    key={gci}
                                    className="flex flex-col"
                                    // Level 3: Mouse masuk, buka cucu
                                    onMouseEnter={() => {
                                      if (gc.children) setActiveDropdown3(gci);
                                    }}
                                  >
                                    {gc.url ? (
                                      <Link
                                        className="block pl-10 pr-6 py-2 text-sm hover:bg-gray-200"
                                        to={gc.url}
                                        onClick={closeAllDropdown}
                                      >
                                        {gc.label}
                                      </Link>
                                    ) : (
                                      <div className="flex justify-between items-center pl-10 pr-6 py-2 text-sm hover:bg-gray-200">
                                        <span>{gc.label}</span>
                                        <i
                                          className={`fa-solid fa-chevron-${activeDropdown3 === gci ? "up" : "down"} text-[10px]`}
                                        />
                                      </div>
                                    )}

                                    {/* Level 3 Content (Ke Bawah) */}
                                    {gc.children && activeDropdown3 === gci && (
                                      <ul className="bg-gray-100 py-1">
                                        {gc.children.map((ggc, ggci) => (
                                          <li key={ggci}>
                                            <Link
                                              className="block pl-14 pr-6 py-2 text-xs hover:bg-gray-300"
                                              to={ggc.url}
                                              onClick={closeAllDropdown}
                                            >
                                              {ggc.label}
                                            </Link>
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
                      </ul>
                    )}
                  </li>
                ))}
              </div>
            </ul>
          )}

          {isTeacher && (
            <ul className="items-center w-full text-base text-gray-800 h-auto">
              <div className="flex gap-3">
                <li
                  className={`hover:text-red-900 cursor-pointer px-2 py-1 ${pathname === "/teacher" ? "font-bold" : ""}`}
                >
                  <Link to="/teacher">Home</Link>
                </li>

                {teacherLinks.map((link, index) => (
                  <li
                    key={index}
                    className="relative hover:text-red-900 cursor-pointer px-2 py-1"
                    onMouseEnter={() => {
                      setActiveDropdown(index);
                      setActiveDropdown2(null);
                      setActiveDropdown3(null);
                    }}
                  >
                    <span>{link.text}</span>

                    {link.children && activeDropdown === index && (
                      <ul className="absolute top-full left-0 bg-white shadow-lg py-2 rounded-lg min-w-[260px] border border-gray-300 z-[9999] ">
                        {link.children.map((child, ci) => (
                          <li
                            key={ci}
                            className="flex flex-col"
                            onMouseEnter={() => {
                              if (child.children) {
                                setActiveDropdown2(ci);
                              } else {
                                setActiveDropdown2(null);
                              }
                              setActiveDropdown3(null);
                            }}
                          >
                            {child.url ? (
                              <Link
                                className="block px-6 py-2 text-sm hover:bg-gray-100"
                                to={child.url}
                                onClick={closeAllDropdown}
                              >
                                {child.label}
                              </Link>
                            ) : (
                              <div className="flex justify-between items-center px-6 py-2 text-sm hover:bg-gray-100">
                                <span
                                  className={
                                    activeDropdown2 === ci
                                      ? "font-bold text-red-600"
                                      : ""
                                  }
                                >
                                  {child.label}
                                </span>
                                <i
                                  className={`fa-solid fa-chevron-${activeDropdown2 === ci ? "up" : "down"} text-[10px]`}
                                />
                              </div>
                            )}

                            {/* Level 2 Content */}
                            {child.children && activeDropdown2 === ci && (
                              <ul className="bg-gray-50 py-1">
                                {child.children.map((gc, gci) => (
                                  <li
                                    key={gci}
                                    className="flex flex-col"
                                    onMouseEnter={() => {
                                      // Level 3 terbuka
                                      if (gc.children) {
                                        setActiveDropdown3(gci);
                                      }
                                    }}
                                  >
                                    {gc.url ? (
                                      <Link
                                        className="block pl-10 pr-6 py-2 text-sm hover:bg-gray-200"
                                        to={gc.url}
                                        onClick={closeAllDropdown}
                                      >
                                        {gc.label}
                                      </Link>
                                    ) : (
                                      <div className="flex justify-between items-center pl-10 pr-6 py-2 text-sm hover:bg-gray-200">
                                        <span>{gc.label}</span>
                                        <i
                                          className={`fa-solid fa-chevron-${activeDropdown3 === gci ? "up" : "down"} text-[10px]`}
                                        />
                                      </div>
                                    )}

                                    {/* Level 3 Content */}
                                    {gc.children && activeDropdown3 === gci && (
                                      <ul className="bg-gray-100 py-1">
                                        {gc.children.map((ggc, ggci) => (
                                          <li key={ggci}>
                                            <Link
                                              className="block pl-14 pr-6 py-2 text-xs hover:bg-gray-300"
                                              to={ggc.url}
                                              onClick={closeAllDropdown}
                                            >
                                              {ggc.label}
                                            </Link>
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
                      </ul>
                    )}
                  </li>
                ))}
              </div>
            </ul>
          )}
        </div>
      </div>

      {/* MOBILE MENU student*/}
      {isOpen && isStudent && (
        <div className="md:hidden bg-white shadow-lg p-3 border-t-2 border-orange-700">
          <ul className="space-y-2 text-sm font-semibold">
            <li className="hover:text-blue-600 px-2 py-2 border-b border-gray-200">
              <Link to={"/student/"}>Home</Link>
            </li>

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

                          {child.children && activeDropdown2 === idx && (
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
          </ul>
        </div>
      )}

      {isOpen && isTeacher && (
        <div className="md:hidden bg-white shadow-lg p-3 border-t-2 border-orange-700">
          <ul className="space-y-2 text-sm font-semibold">
            <li className="hover:text-blue-600 px-2 py-2 border-b border-gray-200">
              <Link to={"/teacher"}>Home</Link>
            </li>

            <>
              {teacherLinks.map((menu, idx) => (
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
                              onClick={() => toggleDropdown2(ci)}
                            >
                              <span>{child.label}</span>
                              <i
                                className={`text-red-600 font-bold transition duration-300 fa-solid fa-chevron-${
                                  activeDropdown2 === idx ? "up" : "down"
                                }`}
                              />
                            </div>
                          )}
                          {child.children && activeDropdown2 === ci && (
                            <ul className="pl-4 mt-1 space-y-3 text-gray-700 py-2">
                              {child.children.map((gc, gci) => (
                                <li key={gci}>
                                  {gc.url ? (
                                    <Link to={gc.url}>{gc.label}</Link>
                                  ) : (
                                    <div
                                      className="flex flex-row justify-between"
                                      onClick={() => toggleDropdown3(gci)}
                                    >
                                      <span>{gc.label}</span>
                                      <i
                                        className={`text-red-600 font-bold transition duration-300 fa-solid fa-chevron-${
                                          activeDropdown3 === idx
                                            ? "up"
                                            : "down"
                                        }`}
                                      />
                                    </div>
                                  )}

                                  {gc.children && activeDropdown3 === gci && (
                                    <ul className="pl-4 mt-1 space-y-3 text-gray-700 py-2">
                                      {gc.children.map((ggc, ggci) => (
                                        <li key={ggci}>
                                          <Link to={ggc.url}>{ggc.label}</Link>
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
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
