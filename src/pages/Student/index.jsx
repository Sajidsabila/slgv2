import LandingPageLayout from "../../layout/landing-page";
import { useState, useEffect } from "react";
import { updatePassword } from "../../api/apiMethod";
import { urlLink } from "../../config/config";
import { Link } from "react-router-dom";
import { CloseCircleTwoTone } from "@ant-design/icons";
import { useStudentProfil } from "../../hooks/useProfileStudent";

const Index = () => {
  const { profile, program, schedule, fees } = useStudentProfil();
  const [formData, setFormData] = useState({ old_password: "", new_password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("hasSeenPopup")) {
      setShowPopup(true);
      sessionStorage.setItem("hasSeenPopup", "true");
      document.body.style.overflow = "hidden";
    }
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const passwordUpdate = async (e) => {
    e.preventDefault();
    if (!formData.old_password || !formData.new_password) {
      alert("Password lama dan baru harus diisi");
      return;
    }
    setLoading(true);
    try {
      await updatePassword(formData);
      setSuccess("Password updated successfully");
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.exc_type ||
          err.response?.data?.exception ||
          err.message
      );
      setSuccess("");
    } finally {
      setLoading(false);
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

    {/* Tombol Close */}
    <CloseCircleTwoTone
      className="text-4xl cursor-pointer mb-4 hover:scale-110 transition"
      onClick={closePopup}
    />

    {/* Container Gambar (relative) */}
    <div className="relative w-[90%] sm:w-[60%] md:w-[55%] lg:w-[40%] xl:w-[40%]">
      <img
        src="/images/popup_parents_guide.png"
        alt="Parents Guide"
        className="rounded-md shadow-xl w-full"
      />

      {/* Tombol Start di dalam gambar */}
      <Link
        to="/student/parents-guide"
        onClick={closePopup}
        className="absolute md:bottom-6 bottom-1 2xl:right-[83%] xl:right-[80%] lg:[right-70%] md:right-[75%] right-[68%] bg-slate-100 px-6 py-1 rounded-md font-medium text-md  hover:scale-105 transition"
      >
        Start
      </Link>
    </div>

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
            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-semibold">Nama Lengkap</h2>
                  <p className="text-gray-600">{profile.first_name}</p>
                  <h2 className="mt-4 text-lg font-semibold">NIS</h2>
                  <p className="text-gray-600">{profile.name}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">Kelas</h2>
                  <div className="flex flex-wrap gap-2">
                    {program.map((item, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20"
                      >
                        {item.course}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-6 text-lg font-semibold">Point Siswa</h2>
                  <p className="text-gray-600">{profile.point} Point</p>
                </div>
              </div>

              <hr className="my-8 border-gray-300" />

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold">Kelas Selanjutnya</h2>
              {schedule?.length ? (
                <p className="text-gray-600">
                  {new Date(
                    `${schedule[0]?.schedule_date}T${schedule[0]?.from_time}`
                  ).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  <br />
                  {schedule[0]?.from_time} - {schedule[0]?.to_time} WIB
                </p>
              ) : (
                <p className="text-gray-500">Tidak ada jadwal minggu ini</p>
              )}

              </div>

            <div>
              <h2 className="text-lg font-semibold">Status Pembayaran</h2>
              {fees.length > 0 ? (
                fees.map((item, index) => (
                  <p key={index} className={`${item.status === "Paid" ? "inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20" : 
                    "inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20"}`}>{item.status}</p>
                )) 
              ) : (
                <p className="text-gray-500">Belum ada pembayaran</p>
              )}
              
            </div>
          </div>


              <hr className="my-8 border-gray-300" />

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-semibold">Event Selanjutnya</h2>
                  <p className="text-gray-600">
                    {/* Rabu, 20 Agustus 2020 <br />
                    10.00 - 12.00 WIB */}
                    Belum Ada Event
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Judul Event</h2>
                  <p className="text-gray-600">Belum Ada Event</p>
                </div>
              </div>

              <hr className="my-8 border-gray-300" />

              <h1 className="font-bold text-xl mb-4">Update Password</h1>
              <form onSubmit={passwordUpdate} className="space-y-4">
                {error && (
                  <p className="bg-red-600 text-white px-3 py-2 rounded-lg">{error}</p>
                )}
                {success && (
                  <p className="bg-green-600 text-white px-3 py-2 rounded-lg">{success}</p>
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