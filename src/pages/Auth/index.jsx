import { use, useState } from "react";
import { urlLink } from "../../config/config";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";


const Login = () => {
  const { login, logout } = useAuth();
  const navigate = useNavigate(); 
 const [formData, setFormData] = useState({
   email: "",
   password: "",
 })
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);

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

    if (!formData.email || !formData.password) {
      setIsLoading(false);
      setError("Email dan Password tidak boleh kosong");
      return;
    }
   

    try {
      const response = await axios.post(
        `${urlLink.url}/api/method/login`,
        {
          usr: formData.email,
          pwd: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const loggedUser = await axios.get(
      `${urlLink.url}/api/method/frappe.auth.get_logged_user`,
      { withCredentials: true }
    );

    // 3. Get user detail
    const userDetail = await axios.get(
      `${urlLink.url}/api/resource/User/${loggedUser.data.message}`,
      { withCredentials: true }
    );
      const dataUser = userDetail.data;
      console.log(dataUser);

      const getUser = {
        full_name: dataUser.data.full_name,
        user_image: dataUser.data.user_image,
        email: dataUser.data.email,
        roles: dataUser.data.roles,
        mobile_no: dataUser.data.mobile_no,
      };

      const roles = dataUser.data.roles
        ? dataUser.data.roles
        : [];
      const isInstructor = roles.some(
        (roleObj) =>
          roleObj.role === "Instructor" || roleObj.role === "LMS User"
      );

      if (!isInstructor) {
        setIsLoading(false);
        logout();
      setFormData({ email: "", password: "" });
        setError("Login Failed");
        return;
      }
      login(getUser);
      navigate("/admin"); 
    } catch (err) {
      console.log("ini error", err);
      setError(err.response.data.message || "Terjadi kesalahan");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[350px] border-2 border-slate-200 rounded-lg p-4 shadow-lg">
        <h3 className="text-lg font-bold text-center mb-4">Halaman Login</h3>
        {error && (
          <p className="text-white py-2 bg-red-700 rounded mb-2 text-sm text-center">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
              type="text"
              placeholder="Email"
              id="email"
              value={formData.email}
              autoFocus
             onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
              id="password"
              type="password"
              placeholder="Password"
              value={formData.password}
            onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-800 text-white w-full h-10 rounded-lg hover:bg-slate-900 transition"
          >
            {loading ? "loading..." : "login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
