import { useState } from "react";
import LandingPageLayout from "../../layout/landing-page";
import { checkStudent } from "../../api/apiPublic";
import { convertDate } from "../../helper/helper";
import { Link } from "react-router-dom";

const AuthStudent = () => {
    const [formData, setFormData] = useState({
        id_siswa: "",
        tanggal_lahir: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleCheckStudent = async (e) => {
        e.preventDefault();
        if (!formData.id_siswa || !formData.tanggal_lahir) {
            setError("ID Siswa dan Tanggal Lahir harus diisi");
            return;
        }
        try {
            setLoading(true);
            setError("");

            const data = {
                name: formData.id_siswa,
                date_of_birth: convertDate(formData.tanggal_lahir)
            };
            const response = await checkStudent(data);
            const status = response.message;

            if (status.status === "failed") {
                setError(status.message);
                return;
            }else if(status.student_status === "Out"){
                setError(status.message);
                return;
            }
         
            sessionStorage.setItem("token", JSON.stringify(response.message));
            window.location.href = "/home";

        } catch (error) {
            console.error(error);
            setError(error.message || "Terjadi kesalahan saat login");
        } finally {
            setLoading(false);
            setFormData({ id_siswa: "", tanggal_lahir: "" });
        }
    };

    return (
        <LandingPageLayout title="Welcome to SMI">
            <div className="flex flex-col w-full justify-center items-center bg-white-50 ">
                <div className="flex flex-row w-auto justify-center items-center h-auto gap-3  rounded-lg p-1 bg-white">
                    <Link to="/" className="bg-blue-600 text-white border-1 border-white  py-3 px-6 font-bold rounded-l-lg">Student</Link>
                    <div className="w-px h-8 bg-gray-300"></div>

                    <Link to="/login-teacher" className="border-1  py-3 px-6 font-bold rounded-r-lg">Teacher</Link>
                </div>

                <div className="w-100 h-auto rounded-lg flex-row px-4">
                    <h1 className="text-xl font-semibold text-center py-4">Silahkan Login</h1>
                    {error && (
                        <p className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-5 font-bold">
                            {error}
                        </p>
                    )}
                    <form onSubmit={handleCheckStudent}>
                        <div className="mb-4 md:mx-0 mx-5">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="id_siswa">
                                NIS 
                            </label>
                            <input
                                type="text"
                                name="id_siswa"
                                id="id_siswa"
                                placeholder="Input Nis Siswa"
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
                                Tanggal Lahir Siswa
                            </label>
                            <input
                                type="date"
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

export default AuthStudent;
