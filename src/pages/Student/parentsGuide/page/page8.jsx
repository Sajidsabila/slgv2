import Swal from "sweetalert2";
import { updateStudent } from "../../../../api/apiPublic";
import { Spin } from "antd";
import { useState } from "react";

const Page8 = () => {
  const [loading, setLoading] = useState(false);

  const handlePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = sessionStorage.getItem("key");
      console.log(token);
      const id =
        JSON.parse(sessionStorage.getItem("token"))?.student_id || "";
      const data = {
        reason_for_join: sessionStorage.getItem("selectedOption1"),
        reason_for_priority: sessionStorage.getItem("selectedOption2"),
      };

      await updateStudent(data, id);
      sessionStorage.removeItem("selectedOption1");
      sessionStorage.removeItem("selectedOption2");
      setLoading(false);
      Swal.fire({
        title: "Success!",
        text: "Data berhasil di simpan",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
      Swal.fire({
        title: "Gagal !",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      {loading && <Spin fullscreen size="large" />}
      <div className="relative w-full h-screen bg-gradient-to-b from-sky-300 to-white overflow-hidden">
        {/* konten utama */}
        <div className="container mx-auto flex flex-col items-center justify-center h-full text-center px-4 fadeinanimation">
          <h1 className="text-xl md:text-8xl font-bold text-gray-800 mb-4">
            SO, ARE YOU
          </h1>
          <p className="sm:text-xl md:text-8xl font-bold text-gray-800 mb-8">
          READY ?
          </p>
            <p className="text-3xl font-bold mb-2"> 
               Let's support your child in this music
            </p>
            <p  className="text-3xl font-bold mb-9">learning journey!</p>
          <button
            onClick={handlePost}
            className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-full shadow-lg transition duration-300 font-bold text-3xl hover:scale-105"
          >
            Yes, Let's go!
          </button>
        </div>

     
        <img
          src="/images/image_page_8.1.png"
          alt="Decor"
          className="absolute bottom-0  left-1/2 -translate-x-1/2 xl:w-140 lg:w-100 sm:w-70 xl:left-90 lg:left-40 xl:top-110 lg:top-60 sm:top-20 sm:left-20"
        />

         <img
          src="/images/image_page_8.2.png"
          alt="Decor"
          className="absolute bottom-0 -translate-x-1/2 xl:w-140 lg:w-100 sm:w-70 xl:left-390 lg:left-285 xl:top-110 lg:top-60 sm:top-20 sm:left-190"
        />
      </div>
    </>
  );
};

export default Page8;
