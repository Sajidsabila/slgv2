import { useState } from "react";
import LandingPageLayout from "../../layout/landing-page";
import { Link } from "react-router-dom";

const AuthTeacher = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

     const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        setError(null);

        if (!email || !password) {
            setIsLoading(false);
            setError("Email dan Password tidak boleh kosong");
            return;
        }

        try {
            const response = await fetch(`${urlLink.url}/api/method/login`, {
                method: "POST",
                headers: headers,
                body: new URLSearchParams({ usr: email, pwd: password }),
                credentials: "include", 
            });
            const data = await response.json();
            if(!response.ok){
                setIsLoading(false)
                throw new Error(data.message);
         
            }
           const getLoggedUser = await fetch(`${urlLink.url}/api/method/frappe.auth.get_logged_user`, {
                 method: "POST",
                 credentials: "include",

                 headers: headers,
                 mode: "cors",
           });
            const user = await  getLoggedUser.json();
            const userData = await fetch(`${urlLink.url}/api/resource/User/${user.message}`, {
                     method: "GET",
                     credentials: "include",
                     headers: headers,
                     mode: "cors",
                 });
                 const dataUser = await userData.json();
                 const getUser = {
                    full_name: dataUser.data.full_name,
                    user_image: dataUser.data.user_image,
                    email: dataUser.data.email,
                    roles: dataUser.data.roles,
                    mobile_no: dataUser.data.mobile_no,
                };
                
                 const roles = Array.isArray(dataUser.data.roles) ? dataUser.data.roles : [];
                 const isInstructor = roles.some(roleObj => roleObj.role === "Instructor");
                 if (!isInstructor) {
                     localStorage.clear();
                     setIsLoading(false)
                     throw new Error("Username dan Password Salah")
                 } 
                   
                     localStorageExpired("user", getUser, 7200000);
                     window.location.href = "/teacher-page";
        } catch (err) {
            setError(err.message || "Terjadi kesalahan");
            setIsLoading(false)
        }
    };

    return (
          <LandingPageLayout title="Welcome to SMI">
            <div className="flex flex-col w-full justify-center items-center bg-white-50 ">
                <div className="flex flex-row w-auto justify-center items-center h-auto gap-3  rounded-lg p-1 bg-white">
                    <Link to="/" className="border-1  py-3 px-6 font-bold rounded-l-lg">Student</Link>
                    <div className="w-px h-8 bg-gray-300"></div>

                    <Link to="/login-teacher" className="bg-blue-600 text-white border-1 border-white  py-3 px-6 font-bold rounded-r-lg">Teacher</Link>
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
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="id_siswa">
                               Username
                            </label>
                            <input
                                type="text"
                                name="id_siswa"
                                id="id_siswa"
                                placeholder="Input Username ..."
                                maxLength={25}
                                onChange={handleChange}
                                value={formData.id_siswa}
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
                                id="tanggal_lahir"
                                name="tanggal_lahir"
                                onChange={handleChange}
                                value={formData.tanggal_lahir}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-blue-500 my-2 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
