
import LandingPageLayout from "../layout/landing-page"
import HeadingSection from "../components/headingSection"
import { useState } from "react"
import { updatePassword } from "../api/apiMethod"
import { firstLetterFunction } from "../helper/helper"

const UserProfile = () => {
    const [formData, setFormData] = useState({
        old_password: "",
        new_password: "",
      });
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");
      const [success, setSuccess] = useState("");

    const profil = JSON.parse(sessionStorage.getItem("user"));
    
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
              err.message,
          );
          setSuccess("");
        } finally {
          setLoading(false);
        }
      };
    return (
       <LandingPageLayout>
          <section className="py-10 container mx-auto">
            <HeadingSection
              title="Profil User"
              image="/assets/smile_image/icon-6.png"
            />

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mt-5">
              <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center text-red-700 text-3xl font-bold shrink-0">
                  {firstLetterFunction(profil.full_name)}
                </div>

       
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  <div>
                    <p className="text-sm text-gray-500">Nama Lengkap</p>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {profil.full_name}
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <h3 className="font-semibold text-lg text-gray-800 break-all">
                      {profil.email}
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">No. Telepon</p>
                    <h3 className="font-semibold text-lg text-gray-800">
                     {profil.mobile_no}
                    </h3>
                  </div>
                </div>
              </div>

             <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-bold text-red-800 mb-5">
                Update Password
            </h2>

            {/* alert update password */}
            { success && (
                <div className="my-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">{success}</div>
            )}

            { error && (
                <div className="my-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>
            )}
            <form className="space-y-5" onSubmit={passwordUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Password Lama */}
                <div>
                    <label
                    htmlFor="oldPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                    >
                    Password Lama
                    </label>
                    <input
                    id="old_password"
                    type="password"
                    name="old_password"
                    value={formData.old_password}
                    onChange={handleChange}
                    placeholder="Masukkan password lama"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>

                {/* Password Baru */}
                <div>
                    <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-2"
                    >
                    Password Baru
                    </label>
                    <input
                    id="new_password"
                    type="password"
                    name="new_password"
                    value={formData.new_password}
                    onChange={handleChange}
                    placeholder="Masukkan password baru"
                    className="w-full text-black  rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>
                </div>

                {/* Konfirmasi Password */}

                <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-red-800 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition"
                >
                    {loading ? "Loading..." : "Update Password"}
                </button>
                </div>
            </form>
            </div>
            </div>
          </section>
       </LandingPageLayout>

    )
}

export default UserProfile