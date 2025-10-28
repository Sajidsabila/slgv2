import { useState } from "react";
import LandingPageLayout from "../../layout/landing-page";
import { Link, useLocation } from "react-router-dom";
import { urlLink } from "../../config/config";



const AuthTeacher = () => {
    const location = useLocation().pathname;
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setIsLoading] = useState(false);
    const headers = { "Content-Type": "application/x-www-form-urlencoded" };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    console.log(formData)

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { username, password } = formData;
    if (!username || !password) {
        setIsLoading(false);
        setError("Username dan Password tidak boleh kosong");
        return;
    }
    try {
        const loginResponse = await fetch(`${urlLink.url}/api/method/smi.api.login`, {
            method: "POST",
            headers,
            body: new URLSearchParams({
                usr: username,
                pwd: password,
            }),
        });

        const loginData = await loginResponse.json();
        console.log("Login response:", loginData);

        if (!loginResponse.ok) {
            setIsLoading(false);
            throw new Error(loginData.message);
        }

        const email = loginData.message.email;

       const apiKey = loginData.message.api_key;
       const apiSecret = loginData.message.api_secret;
       const credentials = `${apiKey}:${apiSecret}`;
       const encodedCredentials = btoa(credentials);
        sessionStorage.setItem(
            "credentials",  encodedCredentials);

        const getCredentials = sessionStorage.getItem("credentials");
        const decodedCredentials = atob(getCredentials);
        console.log(decodedCredentials);
        const authHeader = {
            "Content-Type": "application/json",
            Authorization: `token ${decodedCredentials}`,
        };
        const userResponse = await fetch(
            `${urlLink.url}/api/resource/User/${email}`,
            {
                method: "GET",
                credentials: "include",
                headers: authHeader,
                mode: "cors",
            }
        );
        console.log(userResponse);

        const instructorResponse = await fetch(
            `${urlLink.url}/api/resource/Instructor?fields=["*"]&filters=[["instructor_email", "=", "${email}"]]`,
            {
                method: "GET",
                credentials: "include",
                headers: authHeader,
                mode: "cors",
            }
        );
        const userData = await userResponse.json();
        const instructorData = await instructorResponse.json();
       

        const roles = Array.isArray(userData.data.roles)
            ? userData.data.roles
            : [];
            console.log(roles);

        const isInstructor = roles.some(
            (roleObj) => roleObj.role === "Instructor"
        );

        console.log(instructorData);

        if (!isInstructor) {
            sessionStorage.clear();
            setIsLoading(false);
            throw new Error("Username dan Password Salah");
        }

        const profileInstructor = {
            instructor_name: instructorData.data[0].instructor_name,
            instructor_email: instructorData.data[0].instructor_email,
        };
        sessionStorage.setItem(
            "profileInstructor",
            JSON.stringify(profileInstructor)
        );

        window.location.href = "/teacher";
        setIsLoading(false);
    } catch (err) {
        setError(err.message || "Terjadi kesalahan");
        setIsLoading(false);
    }
};
    return (
         <div className="relative min-h-screen w-full flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat bg-[url(/assets/smile_image/background-page-login.png)] font-['Poppins']">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 md:gap-7">
      

          <div className="lg:block hidden text-center lg:text-left text-white py-2">
            <h1 className="text-4xl md:text-5xl font-bold">Welcome to <br /> <span className="">SMI Learning</span> <br /> System</h1>
          </div>
          <div className="lg:hidden text-white font-bold text-xl">Welcome to SMI Learning System</div>
          <div className="w-full lg:w-1/2 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-6 md:p-10">
            <h2 className="font-bold text-2xl md:text-3xl mb-6 text-gray-800">Log In to
                <br /> Your Account</h2>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                to="/"
                className={`w-30 text-center py-2 md:py-3 font-semibold rounded-lg shadow-md transition ${
                  location === "/" ? "bg-red-800 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                Student
              </Link>
              <Link
                to="/login-teacher"
                className={`w-30 text-center py-2 md:py-3 font-semibold rounded-lg shadow-md transition ${
                  location === "/login-teacher" ? "bg-red-800 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                Teacher
              </Link>
            </div>

            {error && (
              <p className="text-red-600 font-medium text-center mb-4">{error}</p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block font-semibold mb-2 text-gray-800">Email</label>
               
              
                  <input
                    type="email"
                    id="email"
                    autoFocus={true}
                    value={formData.id_siswa}
                    onChange={handleChange}
                    placeholder="Masukkan Email"
                    className="w-full py-3 px-4 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-red-700 focus:outline-none"
                  />
              
              </div>

   
              <div className="mb-6">
                <label className="block font-semibold mb-2 text-gray-800">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-red-700 focus:outline-none"
                />
              </div>

          <div className="relative top-12">
            <button
              type="submit"
              disabled={loading}
              className="absolute left-1/2 -translate-x-1/2 bottom-[-20px] px-10 py-3 rounded-lg bg-black text-white font-semibold text-lg shadow-lg hover:bg-white hover:border-2 border-red-800 hover:text-red-800 hover:cursor-pointer transition duration-300 ease-in-out"
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

export default AuthTeacher;
