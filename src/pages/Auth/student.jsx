import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { urlLink } from "../../config/config";

const AuthStudent = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [limitRequest, setLimitRequest] = useState(0);

  const message = location.state?.message;
  const pathname = location.pathname;

  const headers = { "Content-Type": "application/x-www-form-urlencoded" };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (limitRequest >= 5) {
      setError("Terlalu banyak percobaan login. Coba lagi setelah 1 menit.");
      setIsLoading(false);
      return;
    }

    setLimitRequest((prev) => prev + 1);

    if (!formData.email || !formData.password) {
      setIsLoading(false);
      setError("Email dan Password tidak boleh kosong");
      return;
    }

    try {
      // Login ke Frappe
      const response = await fetch(`${urlLink.url}/api/method/login`, {
        method: "POST",
        headers,
        body: new URLSearchParams({
          usr: formData.email,
          pwd: formData.password,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal login");
      }

      // Ambil user yang sedang login
      const getLoggedUser = await fetch(
        `${urlLink.url}/api/method/frappe.auth.get_logged_user`,
        {
          method: "GET",
          credentials: "include",
          headers,
          mode: "cors",
        }
      );

      const user = await getLoggedUser.json();

      // Ambil detail user
      const userData = await fetch(
        `${urlLink.url}/api/resource/User/${user.message}`,
        {
          method: "GET",
          credentials: "include",
          headers,
          mode: "cors",
        }
      );

      const dataUser = await userData.json();

      const roles = Array.isArray(dataUser.data.roles)
        ? dataUser.data.roles
        : [];

      const isStudent = roles.some((roleObj) => roleObj.role === "Student");

      if (!isStudent) {
        throw new Error("Anda tidak mempunyai akses sebagai Student");
      }

      const getUser = {
        full_name: dataUser.data.full_name,
        user_image: dataUser.data.user_image,
        email: dataUser.data.email,
        roles: dataUser.data.roles,
        mobile_no: dataUser.data.mobile_no,
      };

      login(getUser);
      navigate("/student/home");
    } catch (err) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan saat login");
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
              Welcome to <br /> <span className="">SMI Learning</span> <br /> System
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
              <Link
                to="/"
                className={`w-30 text-center py-2 md:py-3 font-semibold rounded-lg shadow-md transition ${
                  pathname === "/" ? "bg-red-800 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                Student
              </Link>
              {/* <Link
                to="/login-teacher"
                className={`w-30 text-center py-2 md:py-3 font-semibold rounded-lg shadow-md transition ${
                  pathname === "/login-teacher" ? "bg-red-800 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                Teacher
              </Link> */}
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
                <label className="block font-semibold mb-2 text-gray-800">Email</label>
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
                <label className="block font-semibold mb-2 text-gray-800">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Input your password ..."
                  className="w-full py-3 px-4 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-red-700 focus:outline-none"
                />
              </div>

              <p className="text-sm mb-6">
                Lupa Password?{" "}
                <Link
                  to="/set-password"
                  className="text-red-800 hover:cursor-pointer hover:text-red-600"
                >
                  Klik disini
                </Link>
              </p>

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

export default AuthStudent;
