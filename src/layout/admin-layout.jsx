import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Toggle Profile
  const handleProfileOpen = () => {
    setIsProfileOpen((prev) => !prev);
  };

  // Mencegah scroll saat sidebar terbuka
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  // Menutup sidebar saat klik di luar
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isSidebarOpen &&
        !event.target.closest("aside") &&
        !event.target.closest(".menu-btn")
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isSidebarOpen]);

  // Menutup dropdown profil saat klik di luar
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isProfileOpen &&
        !event.target.closest(".profile-menu")
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isProfileOpen]);

  return (
    <div className="flex h-screen relative">
      {/* Overlay untuk mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative bg-slate-900 text-white h-full md:w-[15%] w-64 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-50`}
      >
        <h2 className="text-xl h-[100px] border-b-4 border-white flex items-center justify-center">
          Sekolah Musik
        </h2>
        <ul className="mt-4">
          <li className="border-b border-gray-700">
            <Link
              to="/admin"
              className="block py-3 px-6 hover:bg-slate-700 hover:text-gray-300 transition duration-300"
              onClick={(e) => {
                e.stopPropagation();
                setIsSidebarOpen(false);
              }}
            >
              Home
            </Link>
          </li>

          <li className="border-b border-gray-700">
            <Link
              to="/admin/piano"
              className="block py-3 px-6 hover:bg-slate-700 hover:text-gray-300 transition duration-300"
              onClick={(e) => {
                e.stopPropagation();
                setIsSidebarOpen(false);
              }}
            >
              Piano
            </Link>
          </li>
        </ul>
      </aside>

      <div className="flex flex-col flex-1 md:w-[85%] w-full relative z-40">
        <nav className="bg-white text-black py-4 px-6 shadow-md flex justify-between items-center sticky top-0 z-50">
          <button
            className="md:hidden p-2 menu-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <h1 className="text-lg font-semibold">Admin Panel</h1>

          {/* Profile Dropdown */}
          <div className="relative profile-menu">
            <button
              className="flex items-center gap-2 p-2"
              onClick={(e) => {
                e.stopPropagation();
                handleProfileOpen();
              }}
            >
              <i className="fa fa-user" aria-hidden="true"></i>
              <i className={`fa-solid fa-chevron-${isProfileOpen ? 'up' : 'down'}`}></i>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden">
                <Link
                  to="/admin/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>

        <main className="p-6 flex-1 bg-gray-100 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
