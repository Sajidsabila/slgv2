import LandingPageLayout from "../../layout/landing-page";
import { useEffect, useState } from "react";
import { methodGet, updatePassword } from "../../api/apiMethod";
import { urlLink } from "../../config/config";
import { Link } from "react-router-dom";
import { CloseCircleTwoTone } from "@ant-design/icons";

const Index = () => {
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
  });
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPopup, setShowPopup] = useState(false);

useEffect(() => {
  const hasSeenPopup = localStorage.getItem("hasSeenPopup");

  if (!hasSeenPopup) {
    setShowPopup(true);
    localStorage.setItem("hasSeenPopup", "true");
    document.body.style.overflow = "hidden";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, []);

  useEffect(() => {
    const getStudentProfile = async () => {
      try {
        const response = await methodGet("Student");
        setProfile(response.data[0]);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    getStudentProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const passwordUpdate = async (e) => {
    e.preventDefault();

    if (formData.old_password === "" || formData.new_password === "") {
      alert("Password lama dan password baru harus diisi");
      return;
    }

    setIsLoading(true);
    try {
      const response = await updatePassword(formData);
      setSuccess("Password updated successfully");
      setError("");
    } catch (error) {
      setError(
        error.response?.data?.exc_type ||
          error.response?.data?.exception ||
          error.message
      );
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

const closePopup = () => {
  setShowPopup(false);
  document.body.style.overflow = "auto";
};


  return (
    <>
    {showPopup && (
        <div className="pop-up fixed inset-0 flex flex-col items-center justify-center backdrop-blur-sm z-20">
        <CloseCircleTwoTone
          className="text-4xl cursor-pointer mb-4 hover:scale-110 transition"
          onClick={closePopup}
        />

        <img
          src="/images/popup_parents_guide.png"
          alt="Parents Guide"
          className="rounded-md shadow-xl w-[80%] sm:w-[60%] md:w-[40%] lg:w-[35%] xl:w-[30%]"
        />

      <Link to="/student/parents-guide" onClick={closePopup} className="bg-slate-100 px-6 py-1 rounded-md font-medium md:text-lg text-md relative md:bottom-15 bottom-10 md:right-50 right-28 hover:scale-105 transition">Start</Link>
      </div>

    )}
    
      <LandingPageLayout>
        <div className="container mx-auto px-6 py-10 bg-white max-w-4xl rounded-xl shadow-xl mt-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
           
            <img
              src={
                profile.image
                  ? urlLink.url + profile.image
                  : "https://placehold.co/200x200"
              }
              alt="Foto Profil Siswa"
              className="w-40 h-40 object-cover rounded-full border-4 border-red-500 shadow-lg"
            />

            {/* Profile Data */}
            <div className="w-full">
              {/* — PERSONAL INFO — */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-semibold">Nama Lengkap</h2>
                  <p className="text-gray-600">{profile.first_name}</p>

                  <h2 className="mt-4 text-lg font-semibold">NIS</h2>
                  <p className="text-gray-600">{profile.name}</p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold">Kelas</h2>
                  <p className="text-gray-600">PIANO - JC 1</p>

                  <h2 className="mt-4 text-lg font-semibold">Point Siswa</h2>
                  <p className="text-gray-600">{profile.point} Point</p>
                </div>
              </div>

              <hr className="my-8 border-gray-300" />

              {/* — NEXT CLASS — */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-semibold">Kelas Selanjutnya</h2>
                  <p className="text-gray-600">
                    Selasa, 19 Agustus 2020 <br />
                    15.00 - 16.00 WIB
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold">Status Pembayaran</h2>
                  <p className="text-green-600 font-semibold">Terbayar</p>
                </div>
              </div>

              <hr className="my-8 border-gray-300" />

              {/* — NEXT EVENT — */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-semibold">Event Selanjutnya</h2>
                  <p className="text-gray-600">
                    Rabu, 20 Agustus 2020 <br />
                    10.00 - 12.00 WIB
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold">Judul Event</h2>
                  <p className="text-gray-600">Webinar Motivasi Belajar</p>
                </div>
              </div>

              <hr className="my-8 border-gray-300" />

              {/* — PASSWORD UPDATE — */}
              <h1 className="font-bold text-xl mb-4">Update Password</h1>

              <form onSubmit={passwordUpdate} className="space-y-4">
                {error && (
                  <p className="bg-red-600 text-white px-3 py-2 rounded-lg">
                    {error}
                  </p>
                )}

                {success && (
                  <p className="bg-green-600 text-white px-3 py-2 rounded-lg">
                    {success}
                  </p>
                )}

                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    Old Password
                  </label>
                  <input
                    type="password"
                    name="old_password"
                    placeholder="Input Old Password..."
                    value={formData.old_password}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="new_password"
                    placeholder="Input New Password..."
                    value={formData.new_password}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-red-700 hover:bg-red-800 text-white px-5 py-2 rounded-lg shadow transition w-fit"
                >
                  {loading ? "Loading..." : "Update Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </LandingPageLayout>
    </>
  );
};

export default Index;
