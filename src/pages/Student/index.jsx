import LandingPageLayout from "../../layout/landing-page";
import { use, useEffect, useState } from "react";
import { methodGet, updatePassword } from "../../api/apiMethod";
import { urlLink } from "../../config/config";
import { Spin } from "antd";


const Index = () => {
    const [profile, setProfile] = useState({});
   const [formData, setFormData] = useState({"old_password": "", "new_password": ""});
   const [loading, setIsLoading] = useState(false);
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
    const roles = JSON.parse(sessionStorage.getItem("user"))?.roles;
    const getItem = roles?.map((r) => r.role);
    const Instructor = getItem?.includes("Instructor");
    
      useEffect(() => {
        const getStudentProfile = async () => {
          try {
            const response = await methodGet("Student");
            setProfile(response.data[0]);
          } catch (error) {
            console.error("Error fetching fees:", error);
          }
        };
        getStudentProfile();
      }, []);

        const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

      const passwordUpdate = async (e) => {
        e.preventDefault();

        if(formData.old_password === "" || formData.new_password === "") {
          alert("Password lama dan password baru harus diisi");
          return;
        }
        const data = {
          old_password : formData.old_password,
          new_password : formData.new_password
        }
        setIsLoading(true);
        try{
            const response = await updatePassword(data);
            setSuccess("Password has been updated successfully");
            setError("");
            console.log(response);
        }catch(error){
          setError(error.response.data.exc_type || error.response.data.exception || error.message);
          setSuccess("");
        }finally{
          setIsLoading(false);
        }
      }
    
    return (
        <LandingPageLayout>
            <div className="container mx-auto px-4 py-10 bg-white w-full max-w-4xl rounded-xl shadow-lg">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mx-6">
                   
                 
                    <img
                        src={`${profile.image ? urlLink.url + profile.image : "https://placehold.co/200x200"}`}
                        alt="Foto Profil Siswa"
                        className="w-50 h-50 object-contain rounded-full border-4 border-red-400 shadow-md"
                    />

                  
                    <div className="w-full">

                     
                        <div  className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">NAMA LENGKAP</h2>
                                <p className="text-gray-600">{profile.first_name}</p>

                                <h2 className="mt-4 text-lg font-semibold text-gray-800">NIS</h2>
                                <p className="text-gray-600">{profile.name}</p>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">KELAS</h2>
                                <p className="text-gray-600">PIANO - JC 1</p>

                                <h2 className="mt-4 text-lg font-semibold text-gray-800">POINT SISWA</h2>
                                <p className="text-gray-600">{profile.point} Point</p>
                            </div>
                        </div>

                    
                        <hr className="my-8 border-t border-gray-300" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">KELAS SELANJUTNYA</h2>
                                <p className="text-gray-600">
                                    Selasa, 19 Agustus 2020<br />
                                    15.00 - 16.00 WIB
                                </p>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">STATUS PEMBAYARAN</h2>
                                <p className="text-green-600">Terbayar</p>
                            </div>
                        </div>

                       
                        <hr className="my-8 border-t border-gray-300" />

                      
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">EVENT SELANJUTNYA</h2>
                                <p className="text-gray-600">
                                    Rabu, 20 Agustus 2020<br />
                                    10.00 - 12.00 WIB
                                </p>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">Judul Event</h2>
                                <p className="text-gray-600">Webinar Motivasi Belajar</p>
                            </div>
                        </div>

                         <hr className="my-8 border-t border-gray-300" />

                      
                        <div className="grid grid-cols-1  gap-6">
                           <h1 className="font-bold">Update Password</h1>
                           <form onSubmit={passwordUpdate}>
                            {error && <p className="bg-red-900 text-white px-2 py-2 rounded-lg">{error}</p>}
                            {success && <p className="bg-green-900 text-white px-2 py-2 rounded-lg">{success}</p>}
                           <div className="mb-4 mt-4">
                               <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                                  Old Password
                               </label>
                               <input
                                   className="appearance-none rounded-lg border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-900"
                             
                                   type="password"
                                   placeholder="Input Old Password ...."
                                   autoFocus={true}
                                   id="old_password"
                                   name="old_password"
                                   value={formData.old_password}
                                   onChange={handleChange}
                               />
                           </div>

                             <div className="mb-4">
                               <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                                 New Password
                               </label>
                               <input
                                   className="appearance-none rounded-lg border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-900"

                                   type="password"
                                   placeholder="Input New Password ...."
                                   id="new_password"
                                   name="new_password"
                                   value={formData.new_password}
                                   onChange={handleChange}                                 
                               />
                           </div>

                           <div className="mb-4">
                             <button type="submit" className="bg-red-900 rounded-lg hover:bg-red-700 text-white hover:cursor-pointer font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                               {loading ? "Loading..." : "Update Password"}
                             </button>
                           </div>
                           </form>
                        </div>
                    </div>
                </div>
            </div>
        </LandingPageLayout>
    );
};

export default Index;
