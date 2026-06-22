import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const HeaderNavbar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/");
    }
  };

  return (
    <>
      {/* MOBILE */}
      <div className="md:hidden flex items-center px-2 w-full">
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
      <div className="hidden md:flex flex-row justify-between items-center py-1 w-full">
        <img
          src="/assets/logowhite.svg"
          alt="Logo Simfoni"
          className="w-30"
        />

        {sessionStorage.getItem("user") && (
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                handleLogout();
              }
            }}
            className="text-sm font-semibold bg-red-500 py-2 px-3 text-white rounded-md hover:bg-red-600 hover:cursor-pointer"
          >
            Logout
          </button>
        )}
      </div>

      <hr className="border-black my-2 relative z-10 right-100 w-[190%] mt-3 hidden md:block" />
    </>
  );
};

export default HeaderNavbar;

