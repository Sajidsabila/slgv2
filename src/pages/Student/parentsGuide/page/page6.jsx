import Swal from "sweetalert2";
import { updateStudent } from "../../../../api/apiPublic";

const Page6 = () => {

    const handlePost = async (e) => { 
        e.preventDefault();
        try{
            const token = sessionStorage.getItem("key");
            console.log(token);
            const id = JSON.parse(sessionStorage.getItem("token"))?.student_id || "";
            const data = {
                reason_for_join: sessionStorage.getItem("selectedOption1"),
                reason_for_priority: sessionStorage.getItem("selectedOption2"),
            }

            const response = await updateStudent(data, id);
            sessionStorage.removeItem("selectedOption1");
            sessionStorage.removeItem("selectedOption2");
             Swal.fire({
           title: "Success!",   
           text: "Data berhasil di simpan",
           icon: "success",
           confirmButtonText: "OK"
       });
        }catch(error){
            console.log(error);
              Swal.fire({
           title: "Gagal !",   
           text: error.message,
           icon: "error",
           confirmButtonText: "OK"
       });
        }
    };
   
    return (
        <div className="container mx-auto flex flex-col justify-center items-center text-center min-h-screen px-4 fadeinanimation">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                SO... ARE YOU READY?
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-12">
                to support your child in this music learning journey
            </p>

            <button onClick={handlePost} className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg shadow-lg transition duration-300">
                Yes, Let's go!
            </button>
        </div>
    );
};

export default Page6;
