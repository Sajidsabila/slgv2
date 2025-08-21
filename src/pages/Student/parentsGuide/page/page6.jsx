import Swal from "sweetalert2";

const Page6 = () => {

    const showAlert = () => {
       Swal.fire({
           title: "Success!",   
           text: "Data berhasil di simpan",
           icon: "success",
           confirmButtonText: "OK"
       });
    };
    return (
        <div className="container mx-auto flex flex-col justify-center items-center text-center min-h-screen px-4 fadeinanimation">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                SO... ARE YOU READY?
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-12">
                to support your child in this music learning journey
            </p>

            <button onClick={showAlert} className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg shadow-lg transition duration-300">
                Yes, Let's go!
            </button>
        </div>
    );
};

export default Page6;
