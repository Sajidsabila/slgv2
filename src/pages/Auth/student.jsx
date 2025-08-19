import { useState, useEffect } from "react";
import LandingPageLayout from "../../layout/landing-page";
import { checkStudent } from "../../api/apiPublic";
import { convertDate } from "../../helper/helper";
import { Link } from "react-router-dom";
import { form } from "framer-motion/client";
import { useStudents } from "../../context/studentsContext";
import { useNavigate } from "react-router-dom";

const AuthStudent = () => {
    const [formData, setFormData] = useState({
        id_siswa: "",
        tanggal_lahir: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [limitRequest, setLimitRequest] = useState(0);
    const {dataContext, setDataContext} = useStudents();

    const navigate = useNavigate();

    useEffect(() => {
        if (limitRequest >= 5) {
            const timeout = setTimeout(() => setLimitRequest(0), 60000); 
            return () => clearTimeout(timeout);
        }
    }, [limitRequest]);

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

        if (limitRequest >= 5) {
            setError("Terlalu banyak percobaan login. Coba lagi dalam 1 menit.");
            return;
        }
        try {
            setLoading(true);
            setError("");

            const data = {
                name: "0062-" +  formData.id_siswa.trim(),
                date_of_birth: convertDate(formData.tanggal_lahir),
            };

            const response = await checkStudent(data);
            const status = response?.message;
            console.log(status);
            
            if (!status || typeof status !== "object") {
                setLimitRequest(prev => prev + 1);
                setError("Respon dari server tidak valid");
                return;
            }

            if (status.status === "failed") {
                setError(status.message || "Login gagal");
                setFormData({
                    id_siswa: formData.id_siswa,
                    tanggal_lahir: "",
                })
                setLimitRequest(prev => prev + 1);
                return;
            }

            if (status.student_status === "Out") {
                setError(status.message || "Siswa tidak aktif");
                return;
            }
            console.log(response.message);
        //     sessionStorage.setItem("token", JSON.stringify(response.message));
        //     setDataContext(response.message);      
        //    navigate("/home");
        } catch (error) {
            setLimitRequest(prev => prev + 1);
            setFormData({
                id_siswa: formData.id_siswa,
                tanggal_lahir: "",
                })
            setError(error.response.data.exception || "Terjadi kesalahan saat login");
            console.error(error);
        } finally {
            setLoading(false);
            setFormData({
                id_siswa: "",
                tanggal_lahir: "",
            });
        }
    };

    return (
        <LandingPageLayout title="Welcome to SMI">
            <div className="flex flex-col w-full justify-center items-center bg-white-50 transition-all duration-500">
                <div className="flex flex-row w-auto justify-center items-center gap-3 rounded-lg p-1 bg-white">
                    <Link to="/" className="bg-blue-600 text-white border border-white py-2 px-6 font-bold rounded-l-lg">
                        Student
                    </Link>
                    <div className="w-px h-8 bg-gray-300" />
                    <Link to="/login-teacher" className="border py-2 px-6 font-bold rounded-r-lg">
                        Teacher
                    </Link>
                </div>

                <div className="w-full max-w-md h-auto rounded-lg px-5 py-4">
                    <h1 className="text-xl font-semibold text-center py-4">Silahkan Login</h1>
                    {error && (
                        <p className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-5 font-bold">
                            {error}
                        </p>
                    )}
                    <form onSubmit={handleCheckStudent}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="id_siswa">
                                NIS
                            </label>
                            <input
                                type="text"
                                id="id_siswa"
                                name="id_siswa"
                                placeholder="Input NIS Siswa"
                                maxLength={25}
                                onChange={handleChange}
                                value={formData.id_siswa}
                                autoComplete="off"
                                autoFocus
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div className="mb-4">
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
                        <div className="mb-4">
                            <button
                                className="bg-blue-500 hover:cursor-pointer w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
