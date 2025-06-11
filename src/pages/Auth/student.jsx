import { useState } from "react";
import LandingPageLayout from "../../layout/landing-page";
import { checkStudent } from "../../api/apiPublic";
import { convertDate } from "../../helper/helper";
const AuthStudent = () => {
    const [formData, setFormData] = useState({id_siswa: "", tanggal_lahir: ""});
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    }

    const handleCheckStudent = async(e) => {

        e.preventDefault();
        // if(!formData.id_siswa || !formData.tanggal_lahir){
        //    setError("ID Siswa dan tanggal lahir harus diisi");
        //     return;
        // }   
        try{
            setLoading(true);
            const data = {
                name: formData.id_siswa,
                date_of_birth: convertDate(formData.tanggal_lahir)
            }
            console.log(data);
            console.log(data);
            const response = await checkStudent(data);
            const status = response.message.status;

            if(status === "failed"){
                setError(response.message.message);
                setFormData({id_siswa: "", tanggal_lahir: ""});
                return;
            }else{
                sessionStorage.setItem("id_siswa", formData.id_siswa);
                window.location.href = "/home";
            }
        }catch(error){
            console.log(error);
            setError(error.message);
        }finally{
            setLoading(false);
            setFormData({id_siswa: "", tanggal_lahir: ""});
        }
    }
    return(
    <LandingPageLayout title="Welcome to SMI">
        <div className="flex flex-col w-full justify-center items-center bg-white-50 ">
            <div className="w-100 h-90  rounded-lg flex-row">
                <h1 className="text-xl font-semibold text-center py-4">Silahkan Login</h1>
                {error && <p className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-5 font-bold">{error}</p>}
                <form onSubmit={handleCheckStudent} >
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="id_siswa">
                            ID Siswa
                        </label>
                        <input
                            type="text"
                            name="id_siswa"
                            id="id_siswa"
                            maxLength={16}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            autoFocus/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="tanggal_lahir">
                            Tanggal Lahir Siswa
                        </label>
                        <input
                        type="date"
                        formatDate="dd-mm-yyyy"
                        id="tanggal_lahir"
                        name="tanggal_lahir"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"/>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">
                           {loading ? "Loading..." : "Login"}
                        </button>
                    </div>
            </form>
            </div>
        </div>
    </LandingPageLayout>
    )
};
export default AuthStudent;