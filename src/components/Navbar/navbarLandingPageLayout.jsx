import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { DownOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const NavbarLandingPageLayout = ({
  homeUrl,
  links = [],
  profilUrl
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeDropdown2, setActiveDropdown2] = useState(null);
  const [activeDropdown3, setActiveDropdown3] = useState(null);

  const navigate = useNavigate();
  const { logout } = useAuth();
  const { pathname } = useLocation();

  const profilLinks = [
  {
    key: '1',
    label: 'My Account',
    disabled: true,
  },
  {
    type: 'divider',
  },
  {
    key: '2',
    label: (
     <Link to={profilUrl}>Profile</Link>
    ),
  },
  {
    key: '3',
    label: (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          logoutUser();
        }}
      >
        Logout
      </a>
    ),
  },
];

  const logoutUser = async () => {
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

  const closeAllDropdown = () => {
    setActiveDropdown(null);
    setActiveDropdown2(null);
    setActiveDropdown3(null);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-[200]">
      <div className="container mx-auto flex px-4 flex-col justify-between items-center py-3">

        {/* MOBILE HEADER */}
        <div className="md:hidden flex justify-between items-center px-2 w-full">
          <img
            src="/assets/logowhite.svg"
            alt="Logo Simfoni"
            className="w-30"
          />
        <div className="flex flex-row gap-3">

        {sessionStorage.getItem("user") && (
            <Dropdown menu={{ items: profilLinks }} placement="bottomRight" className="bg-red-800 p-1 rounded-full font-bold text-white hover:cursor-pointer">
                 <a onClick={e => e.preventDefault()}>
                <Space>
                <UserOutlined />
                <DownOutlined />
                </Space>
                </a>
            </Dropdown>
        )}
            
          <img
            src={isOpen ? "/assets/close.svg" : "/assets/hamburger.png"}
            alt="Menu Icon"
            width={25}
            className="cursor-pointer ml-auto"
            onClick={() => setIsOpen(!isOpen)}
          />

          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex flex-col w-full">

          <div className="flex flex-row justify-between items-center py-1 w-full">
            <img
              src="/assets/logowhite.svg"
              alt="Logo Simfoni"
              className="w-30"
            />

            {sessionStorage.getItem("user") && (
            <Dropdown menu={{ items: profilLinks }} placement="bottomRight" className="bg-red-800 p-3 rounded-full font-bold text-white hover:cursor-pointer">
                 <a onClick={e => e.preventDefault()}>
                <Space>
                  <UserOutlined />
                  <DownOutlined />
                </Space>
                </a>
            </Dropdown>
            )}
          </div>

          <hr className="border-black my-2 relative z-10 right-100 w-[190%] mt-3" />

          <ul className="items-center w-full text-base text-gray-800">
            <div className="flex gap-3">

              <li
                className={`hover:text-red-900 cursor-pointer px-2 py-1 ${
                  pathname === homeUrl ? "font-bold" : ""
                }`}
              >
                <Link to={homeUrl}>Home</Link>
              </li>

              {links.map((link, index) => (
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
                    <ul className="absolute top-full left-0 bg-white shadow-lg py-2 rounded-lg min-w-[260px] border border-gray-300 z-[9999]">
                      {link.children.map((child, ci) => (
                        <li
                          key={ci}
                          className="flex flex-col"
                          onMouseEnter={() => {
                            if (child.children) setActiveDropdown2(ci);
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
                                className={`fa-solid fa-chevron-${
                                  activeDropdown2 === ci ? "up" : "down"
                                } text-[10px]`}
                              />
                            </div>
                          )}

                          {child.children &&
                            activeDropdown2 === ci && (
                              <ul className="bg-gray-50 py-1">
                                {child.children.map((gc, gci) => (
                                  <li
                                    key={gci}
                                    className="flex flex-col"
                                    onMouseEnter={() => {
                                      if (gc.children)
                                        setActiveDropdown3(gci);
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
                                          className={`fa-solid fa-chevron-${
                                            activeDropdown3 === gci
                                              ? "up"
                                              : "down"
                                          } text-[10px]`}
                                        />
                                      </div>
                                    )}

                                    {gc.children &&
                                      activeDropdown3 === gci && (
                                        <ul className="bg-gray-100 py-1">
                                          {gc.children.map(
                                            (ggc, ggci) => (
                                              <li key={ggci}>
                                                <Link
                                                  className="block pl-14 pr-6 py-2 text-xs hover:bg-gray-300"
                                                  to={ggc.url}
                                                  onClick={
                                                    closeAllDropdown
                                                  }
                                                >
                                                  {ggc.label}
                                                </Link>
                                              </li>
                                            )
                                          )}
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
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg p-3 border-t-2 border-orange-700">
          <ul className="space-y-2 text-sm font-semibold">

            <li className="px-2 py-2 border-b border-gray-200">
              <Link to={homeUrl}>Home</Link>
            </li>

            {links.map((link, idx) => (
              <li
                key={idx}
                className="px-2 py-2 border-b border-gray-200"
              >
                <div
                  className="flex justify-between"
                  onClick={() => toggleDropdown(idx)}
                >
                  <span>{link.text}</span>

                  <i
                    className={`fa-solid fa-chevron-${
                      activeDropdown === idx
                        ? "up"
                        : "down"
                    }`}
                  />
                </div>

                {link.children &&
                  activeDropdown === idx && (
                    <ul className="pl-4 mt-2 space-y-2">
                      {link.children.map((child, ci) => (
                        <li key={ci}>
                          <Link to={child.url}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavbarLandingPageLayout;