import { useState, useEffect } from "react";
import { convertDate } from "../../helper/helper";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authStudent } from "../../api/apiMethod";
const SetStudentPassword = () => {
const location = useLocation().pathname;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id_siswa: "",
    tanggal_lahir: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [limitRequest, setLimitRequest] = useState(0);

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
      name: "0062-" + formData.id_siswa.trim(),
      date_of_birth: convertDate(formData.tanggal_lahir),
    };

    const response = await authStudent(data);

    const { status, message } = response.message || {};

    if (status === "failed" || status === "out") {
      setError(message || "Login gagal atau siswa tidak aktif");
      setFormData({
        id_siswa: formData.id_siswa,
        tanggal_lahir: "",
      });
      setLimitRequest((prev) => prev + 1);
      return;
    }

    const { access_token, refresh_token, student_id } = response;

    sessionStorage.setItem("token", access_token);
    sessionStorage.setItem("refresh_token", refresh_token);
    sessionStorage.setItem("student_id", student_id);

    navigate("/home");
  } catch (err) {
    setError("Terjadi kesalahan: " + err.message);
    console.error(err);
  } finally {
    setLoading(false);
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
            <h2 className="font-bold text-2xl md:text-3xl mb-6 text-gray-800">Forgot Password</h2>

            {/* <div className="flex flex-wrap gap-3 mb-8">
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
            </div> */}

            {error && (
              <p className="text-red-600 font-medium text-center mb-4">{error}</p>
            )}

            <form onSubmit={handleCheckStudent}>
              <div className="mb-5">
                <label className="block font-semibold mb-2 text-gray-800">Nomor Induk Siswa</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value="0062-"
                    disabled
                    readOnly
                    className="w-24 py-3 px-4 text-center bg-red-800 text-white font-bold rounded-lg shadow-md"
                  />
                  <input
                    type="text"
                    id="id_siswa"
                    autoFocus={true}
                    value={formData.id_siswa}
                    onChange={handleChange}
                    placeholder="Masukkan ID Siswa"
                    className="w-full py-3 px-4 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-red-700 focus:outline-none"
                  />
                </div>
              </div>

   
              <div className="mb-6">
                <label className="block font-semibold mb-2 text-gray-800">Tanggal Lahir</label>
                <input
                  type="date"
                  id="tanggal_lahir"
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-red-700 focus:outline-none"
                />
              </div>

                   <p>Kembali ke halaman login ? <Link to="/" className="text-red-800 hover:cursor-pointer hover:text-red-600">Klik disini</Link></p>
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
    )
}


export default SetStudentPassword