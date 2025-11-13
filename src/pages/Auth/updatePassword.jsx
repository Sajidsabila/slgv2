import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updatePassword } from "../../api/apiMethod";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const key = sessionStorage.getItem("key");
    const email = sessionStorage.getItem("email");

    if (!key || !password) {
      setError("Key dan Password harus diisi");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = {
        key,
        new_password: password,
      };

      const response = await updatePassword(data);
      const { status, message } = response || {};

      if (status === "failed" || status === "out") {
        setError(message || "Gagal memperbarui password");
        return;
      }

      sessionStorage.clear();
      navigate("/", {
        state: { message: "Password berhasil diperbarui" },
      });
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const email = sessionStorage.getItem("email");

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat bg-[url(/assets/smile_image/background-page-login.png)] font-['Poppins']">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 md:gap-7">

          <div className="lg:block hidden text-center lg:text-left text-white py-2">
            <h1 className="text-4xl md:text-5xl font-bold">
              Welcome to <br /> <span>SMI Learning</span> <br /> System
            </h1>
          </div>

          <div className="lg:hidden text-white font-bold text-xl">
            Welcome to SMI Learning System
          </div>

          <div className="w-full lg:w-1/2 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-6 md:p-10">
            <h2 className="font-bold text-2xl md:text-3xl mb-6 text-gray-800">Update Password</h2>

            {error && <p className="text-red-600 font-medium text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block font-semibold mb-2 text-gray-800">Email</label>
                <input
                  type="text"
                  value={email || ""}
                  disabled
                  readOnly
                  className="w-full py-3 px-4 rounded-lg shadow-md bg-red-900 text-white focus:ring-2 focus:ring-red-700 focus:outline-none"
                />
              </div>

              <div className="mb-6">
                <label className="block font-semibold mb-2 text-gray-800">New Password</label>
                <input
                  type="password"
                  placeholder="New Password ..."
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 px-4 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-red-700 focus:outline-none"
                />
              </div>

              <p>
                Kembali ke halaman login?{" "}
                <Link to="/" className="text-red-800 hover:text-red-600">
                  Klik disini
                </Link>
              </p>

              <div className="relative top-12">
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute left-1/2 -translate-x-1/2 bottom-[-20px] px-10 py-3 rounded-lg bg-black text-white font-semibold text-lg shadow-lg hover:bg-white hover:border-2 border-red-800 hover:text-red-800 transition duration-300"
                >
                  {loading ? "Memproses..." : "Submit"}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
