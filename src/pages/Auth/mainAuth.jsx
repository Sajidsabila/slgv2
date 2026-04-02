import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import axiosConfig from "../../config/axiosConfig";

const MainAuth = () => {
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [student, setStudent] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [limitRequest, setLimitRequest] = useState(0);

  const message = location.state?.message;

  // Reset limit setelah 1 menit
  useEffect(() => {
    if (limitRequest >= 5) {
      const timeout = setTimeout(() => setLimitRequest(0), 60000);
      return () => clearTimeout(timeout);
    }
  }, [limitRequest]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (limitRequest >= 5) {
        throw new Error("Terlalu banyak percobaan login. Coba lagi 1 menit.");
      }

      setLimitRequest((prev) => prev + 1);

    
      if (!formData.email || !formData.password) {
        throw new Error("Email dan Password tidak boleh kosong");
      }

      const response = await axiosConfig.post("/api/method/login", {
        usr: formData.email,
        pwd: formData.password,
      });

      if (!response?.data?.message) {
        throw new Error("Login gagal");
      }
      await delay(300);
      let loggedUser = null;

      for (let i = 0; i < 3; i++) {
        try {
          const res = await axiosConfig.get(
            "/api/method/frappe.auth.get_logged_user"
          );

          if (res?.data?.message) {
            loggedUser = res.data.message;
            break;
          }
        } catch {}

        await delay(200);
      }

      if (!loggedUser) {
        throw new Error("Session gagal dibuat (cookie tidak terbaca)");
      }
      const userDetailRes = await axiosConfig.get(
        `/api/resource/User/${loggedUser}`
      );

      const userData = userDetailRes?.data?.data;

      if (!userData) {
        throw new Error("Gagal mengambil data user");
      }

      const roles = userData?.roles || [];

      const isStudent = roles.some((r) => r.role === "Student");
      const isTeacher = roles.some((r) => r.role === "Instructor");

      // 🚫 Validasi role
      if ((student && !isStudent) || (!student && !isTeacher)) {
        throw new Error("Role tidak sesuai");
      }

     
      const getUser = {
        full_name: userData.full_name,
        user_image: userData.user_image,
        email: userData.email,
        roles: roles,
        mobile_no: userData.mobile_no,
      };

      login(getUser);
      if (isStudent) navigate("/student");
      else if (isTeacher) navigate("/teacher");
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Terjadi kesalahan saat login"
      );
      if (err?.message?.includes("Session")) {
        logout();
      }
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat bg-[url(/assets/smile_image/background-page-login.png)] font-['Poppins']">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 md:gap-7">
          {/* Kiri: Teks Welcome */}
          <div className="lg:block hidden text-center lg:text-left text-white py-2">
            <h1 className="text-4xl md:text-5xl font-bold">
              Welcome to <br /> <span className="">SMI Learning</span> <br />{" "}
              System
            </h1>
          </div>

          <div className="lg:hidden text-white font-bold text-xl">
            Welcome to SMI Learning System
          </div>

          {/* Kanan: Form Login */}
          <div className="w-full lg:w-1/2 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-6 md:p-10">
            <h2 className="font-bold text-2xl md:text-3xl mb-6 text-gray-800">
              Log In to <br /> Your Account
            </h2>

            {/* Switch Role */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => setStudent(true)}
                className={`w-30 text-center py-2 md:py-3 font-semibold rounded-lg shadow-md transition hover:cursor-pointer ${
                  student === true
                    ? "bg-red-800 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setStudent(false)}
                className={`w-30 text-center py-2 md:py-3 font-semibold rounded-lg shadow-md transition hover:cursor-pointer ${
                  student === false
                    ? "bg-red-800 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Teacher
              </button>
            </div>

            {/* Error / Success Message */}
            {error && (
              <p className="text-red-600 font-medium text-center mb-4">
                {error}
              </p>
            )}
            {message && (
              <p className="bg-green-800 text-white py-2 rounded-md font-medium text-center mb-4">
                {message}
              </p>
            )}

            {/* Form Login */}
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block font-semibold mb-2 text-gray-800">
                  Email / Username
                </label>
                <input
                  type="text"
                  id="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Input your email or username ..."
                  className="w-full py-3 px-4 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-red-700 focus:outline-none"
                />
              </div>

              <div className="mb-6">
                <label className="block font-semibold mb-2 text-gray-800">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Input your password ..."
                  className="w-full py-3 px-4 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-red-700 focus:outline-none"
                />
              </div>
              {student && (
                <p className="text-sm mb-6">
                  Lupa Password?{" "}
                  <Link
                    to="/set-password"
                    className="text-red-800 hover:cursor-pointer hover:text-red-600"
                  >
                    Klik disini
                  </Link>
                </p>
              )}

              <div className="relative">
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute left-1/2 -translate-x-1/2 px-10 py-3 rounded-lg bg-black text-white font-semibold text-lg shadow-lg hover:bg-white hover:border-2 border-red-800 hover:text-red-800 hover:cursor-pointer transition duration-300 ease-in-out"
                >
                  {loading ? "Memproses..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainAuth;
