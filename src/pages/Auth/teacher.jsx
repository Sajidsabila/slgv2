import { useState } from "react";
import LandingPageLayout from "../../layout/landing-page";
import { Link } from "react-router-dom";
import { urlLink } from "../../config/config";


const AuthTeacher = () => {
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
        const authHeader = {
            "Content-Type": "application/json",
            Authorization: `token ${decodedCredentials}`,
        };

        console.log(loginData.message);

        const userResponse = await fetch(
            `${urlLink.url}/api/resource/User/${email}`,
            {
                method: "GET",
                credentials: "include",
                headers: authHeader,
                mode: "cors",
            }
        );

        const instructorResponse = await fetch(
            `${urlLink.url}api/resource/Instructor?fields=["*"]&filters=[["instructor_email","=","${email}"]]`,
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

        const isInstructor = roles.some(
            (roleObj) => roleObj.role === "Instructor"
        );

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
          <LandingPageLayout title="Welcome to SMI">
            <div className="flex flex-col w-full justify-center items-center bg-white-50 ">
                <div className="flex flex-row w-auto justify-center items-center h-auto gap-3  rounded-lg p-1 bg-white">
                    <Link to="/" className="border-1 xl:py-3 2xl:py-3 lg:py-2 py-2 px-6 font-bold rounded-l-lg">Student</Link>
                    <div className="w-px h-8 bg-gray-300"></div>

                    <Link to="/login-teacher" className="bg-blue-600 text-white border-1 border-white xl:py-3 2xl:py-3 lg:py-2 py-2 px-6 font-bold rounded-r-lg">Teacher</Link>
                </div>

                <div className="w-100 h-auto rounded-lg flex-row px-4">
                    <h1 className="text-xl font-semibold text-center py-4">Silahkan Login</h1>
                    {error && (
                        <p className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-5 font-bold">
                            {error}
                        </p>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 md:mx-0 mx-5">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="usr">
                               Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Input Username ..."
                                maxLength={25}
                                onChange={handleChange}
                                value={formData.username}
                                autoComplete="off"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                                autoFocus
                            />
                        </div>
                        <div className="mb-4 md:mx-0 mx-5">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="tanggal_lahir">
                              Password
                            </label>
                            <input
                                type="password"
                                placeholder="Input Password ...."
                                id="password"
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div className="mb-4 md:mx-0 mx-5">
  <button
    className="bg-blue-500 my-2 w-full hover:bg-blue-700  hover:cursor-pointer text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
    type="submit"
    disabled={loading}
  >
    {loading ? "Loading..." : "Login"}
  </button>
</div>
                    </form>
                </div>
            </div>
        </LandingPageLayout>
    );
};

export default AuthTeacher;
