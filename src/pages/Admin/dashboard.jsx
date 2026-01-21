import { useEffect, useState } from "react"
import AdminLayout from "../../layout/admin-layout"

import { apiGetProgramMateriPublic } from "../../api/apiPublic"

import { Link } from "react-router-dom";
import { apiResourceAdmin } from "../../api/apiResourceAdmin";

const Dashboard = () => {
    const [program, setProgram] = useState([]);
    const [format, setFormat] = useState([]);
    const [course, setCourse] = useState([]);
    const [grading, setGrading] = useState([]);
    useEffect(() => {
        const countProgram = async () => {
            try {
                const response = await  apiResourceAdmin({doctype: "Program Materi"});
               const count = response.length;
               setProgram(count);
        }catch (error) {
            console.log(error)
        }
        }

        const countClassFormat = async () => {
            try {
                const resFormat = await apiResourceAdmin({doctype: "Program Class Format"});
                const countFormat  = resFormat.length;
                setFormat(countFormat);
        }catch(error) {
            console.log(error)
        }
    }

    const classCourse = async () => {
        try {
            const resCourse = await apiResourceAdmin({doctype: "Course"});
            const count = resCourse.length;
            setCourse(count);
        }catch (error) {
            console.log(error)
        }
    }

    const classGrading = async () => {
        try {
            const resGrading = await apiResourceAdmin({doctype: "Program Class Grading"});
            const count = resGrading.length;
            setGrading(count);
        }catch (error) {
            console.log(error)
        }
    }
        classGrading();
        classCourse();
        countProgram();
        countClassFormat();
    })

   
    return ( 
        <AdminLayout>
            <div className="bg-slate-700 h-15 rounded-lg text-xl text-white flex items-center p-4">
                Selamat Datang {JSON.parse(localStorage.getItem("user"))?.value?.full_name}
            </div>
            <div className="flex flex-col md:flex-row">
            <div className="flex items-start pt-10 pl-3"> 
                <Link to="#" className="w-70 h-auto bg-white border-2 border-slate-100 shadow-lg rounded-xl">
                    <div className="bg-slate-800 text-white px-6 py-3 font-semibold">
                    Class Course
                    </div>
                    <div className="flex flex-row px-6 py-4 justify-between">
                        <div className="text-l font-semibold">Jumlah Data</div>
                        <div className="bg-slate-800 text-white px-6 py-3 font-semibold rounded-md w-fit">
                            {course ?? 0}
                        </div>
                    </div>
                </Link>
            </div>

            <div className="flex items-start pt-10 pl-3"> 
                <Link Link to="#" className="w-70 h-auto bg-white border-2 border-slate-100 shadow-lg rounded-xl">
                    <div className="bg-slate-800 text-white px-6 py-3 font-semibold">
                    Class Format
                    </div>
                    <div className="flex flex-row px-6 py-4 justify-between">
                        <div className="text-l font-semibold">Jumlah Data</div>
                        <div className="bg-slate-800 text-white px-6 py-3 font-semibold rounded-md w-fit">
                            {format ?? 0}
                        </div>
                    </div>
                </Link>
            </div>

            <div className="flex items-start pt-10 pl-3"> 
                <Link  to="#" className="w-70 h-auto bg-white border-2 border-slate-100 shadow-lg rounded-xl">
                    <div className="bg-slate-800 text-white px-6 py-3 font-semibold">
                    Class Grading
                    </div>
                    <div className="flex flex-row px-6 py-4 justify-between">
                        <div className="text-l font-semibold">Jumlah Data</div>
                        <div className="bg-slate-800 text-white px-6 py-3 font-semibold rounded-md w-fit">
                            {grading ?? 0}
                        </div>
                    </div>
                </Link>
            </div>

            
            <div className="flex items-start pt-10 pl-3"> 
                <Link to="/admin/program-materi" className="w-70 h-auto bg-white border-2 border-slate-100 shadow-lg rounded-xl">
                    <div className="bg-slate-800 text-white px-6 py-3 font-semibold">
                    Program Materi
                    </div>
                    <div className="flex flex-row px-6 py-4 justify-between">
                        <div className="text-l font-semibold">Jumlah Data</div>
                        <div className="bg-slate-800 text-white px-6 py-3 font-semibold rounded-md w-fit">
                            {program}
                        </div>
                    </div>
                </Link>
            </div>
            </div>
        </AdminLayout>
    );
};


export default Dashboard