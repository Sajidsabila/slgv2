import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AdminLayout from "../../layout/admin-layout";
import { getProgramMateriById } from "../../api/apiProgramMateri";

const DetailClassFormat = () => {
    const { id } = useParams();
    const [programMateri, setProgramMateri] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProgramMateriById(id);
                setProgramMateri(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <AdminLayout>
            <h3 className="font-bold text-lg py-5 text-center md:text-left">Detail Program Materi</h3>
            <div className="w-full p-6 bg-white rounded-xl shadow-lg">
                {programMateri && (
                    <div className="flex flex-col gap-6">
                    
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <p className="font-extrabold text-gray-700">Nama</p>
                                <p className="text-gray-900">{programMateri.name}</p>
                            </div>

                            <div className="flex flex-col">
                                <p className="font-extrabold text-gray-700">Format Kelas</p>
                                <p className="text-gray-900">{programMateri.class_format ?? 'Kosong'}</p>
                            </div>

                            <div className="flex flex-col">
                                <p className="font-extrabold text-gray-700">Grading Kelas</p>
                                <p className="text-gray-900">{programMateri.class_grade ?? 'Kosong'}</p>
                            </div>

                            <div className="flex flex-col">
                                <p className="font-extrabold text-gray-700">Kursus</p>
                                <p className="text-gray-900">{programMateri.class_course ?? 'Kosong'}</p>
                            </div>
                        </div>
                        <div>
                            <p className="font-extrabold text-gray-700">File</p>
                            <div className="mt-2 space-y-3">
                                {programMateri.file && programMateri.file.length > 0 ? (
                                    programMateri.file.map((fileItem, index) => (
                                        <div key={index} className="p-3 border border-gray-300 rounded-lg shadow-sm bg-gray-50">
                                            <p className="text-sm text-gray-700 font-medium mb-2">{fileItem.title}</p>
                                            <audio controls className="w-full rounded-lg">
                                                <source src={`${import.meta.env.VITE_SISTER_URL}/files/${fileItem.title}`} type="audio/mpeg" />
                                                Browser Anda tidak mendukung pemutar audio.
                                            </audio>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">Tidak ada file audio</p>
                                )}
                            </div>
                        </div>

                        <div className="text-center md:text-left">
                            <Link to="/admin/program-materi" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow">
                                Kembali
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

export default DetailClassFormat;
