import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AdminLayout from "../../layout/admin-layout";
import { getProgramMateriById, uploadFileProgramMateri, addFileToProgramMateri, removeFileProramMateri } from "../../api/apiProgramMateri";
import Modal from "../../components/Modal/modal";
import InputModal from "../../components/InputModal";
import { motion } from "framer-motion";

const DetailClassFormat = () => {
    const { id } = useParams();
    const [programMateri, setProgramMateri] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ file: null });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("");


    const itemsPerPage = 1;

    // Handle perubahan file
    const handleChange = (e) => {
        if (e.target.files.length > 0) {
            setFormData((prevForm) => ({
                ...prevForm,
                file: e.target.files[0],
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!formData.file) {
            alert("Silakan pilih file terlebih dahulu.");
            return;
        }
    
        try {
            setLoading(true);
            setIsOpen(false);
    
     
            const addFile = await uploadFileProgramMateri(formData.file);
            if (!addFile || !addFile.name) {
                throw new Error("File tidak dikembalikan oleh server.");
            }
            console.log("add File", addFile);
            const newFile = {
                file: addFile.name,
                title: addFile.file_url, 
              };
            const res = await addFileToProgramMateri(id, newFile);
            console.log("hasil", res)
    
            setLoading(false);
           
            setSuccess("File berhasil diupload!");
            setProgramMateri((prevData) => ({
                ...prevData,
                file: [...prevData.file, newFile], 
            }));
    
        } catch (error) {
            setLoading(false);
            console.error("Error upload file:", error.response?.data || error.message);
            setError("Terjadi kesalahan saat mengupload file.");
        }
    };
    
    const handleDeleteFile = async (fileName) => {
       try{
        const deleteMateri = await  removeFileProramMateri(id, fileName);
        setProgramMateri((prevData) => ({
            ...prevData,
            file: prevData.file.filter((item) => item.file !== fileName),
          }));
          setSuccess("Data Berhasil dihapus")
       }catch{
        setError("terjadi kesalahan", error)
       }
      };
      

    const handleClose = () => {
        setFormData({ file: null });
        setIsOpen(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const response = await getProgramMateriById(id);
                setProgramMateri(response);
            } catch (error) {
                console.error(" Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);
    
    function removeHash(filename) {
        // Regex: -\w+ sebelum .mp3
        return filename.replace(/-\w+(?=\.mp3$)/, "");
      }
    const totalPages = programMateri?.file ? Math.ceil(programMateri.file.length / itemsPerPage) : 1;

    const coursePaginatedData = programMateri?.file
      ? programMateri.file.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : [];

      const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
      
    return (
        <AdminLayout>
            <Modal isOpen={isOpen} onClose={handleClose} titleModal="Add File Materi" onSubmit={handleSubmit}>
                <InputModal label="File" type="file" name="file" onChange={handleChange} />
            </Modal>
            {loading && (
        <motion.div
          className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
         <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-blue-500 mt-3">Memproses data...</p>
            </div>
  </div>

        </motion.div>
      )}

            <h3 className="font-bold text-lg py-5 text-center md:text-left">Detail Program Materi</h3>
            <div className="w-full p-6 bg-white rounded-xl shadow-lg relative overflow-y-auto h-auto">
            {error && <p className="bg-red-700 text-sm text-white py-3 px-4 my-3">{error}</p>}
        {success && <p className="bg-green-700 text-sm text-white py-3 px-4 my-3">{success}</p>}
                {programMateri && (
                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <p className="font-extrabold text-gray-700">Nama</p>
                                <p className="text-gray-900">{programMateri.name}</p>
                            </div>

                            <div className="flex flex-col">
                                <p className="font-extrabold text-gray-700">Format Kelas</p>
                                <p className="text-gray-900">{programMateri.class_format ?? "Kosong"}</p>
                            </div>

                            <div className="flex flex-col">
                                <p className="font-extrabold text-gray-700">Grading Kelas</p>
                                <p className="text-gray-900">{programMateri.class_grade ?? "Kosong"}</p>
                            </div>

                            <div className="flex flex-col">
                                <p className="font-extrabold text-gray-700">Kursus</p>
                                <p className="text-gray-900">{programMateri.class_course ?? "Kosong"}</p>
                            </div>
                        </div>

                        <div>
                          
                            <div className="mt-2 space-y-3 relative overflow-x-auto">
                            <div className="flex flex-col md:flex-row md:justify-between gap-2">

                            <button onClick={handleOpen} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow">
                                Tambah File
                            </button>
                            <input
              type="text"
              placeholder="Search"
          
              className="border border-gray-300 rounded-lg px-4 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                            </div>
  <table className="w-full text-sm text-left text-gray-600 border border-gray-300 rounded-lg shadow-sm">
    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
      <tr>
        <th className="px-4 py-3 border border-gray-300">No</th>
        <th className="px-4 py-3 border border-gray-300">Title</th>
        <th className="px-4 py-3 border border-gray-300">Audio</th>
        <th className="px-4 py-3 border border-gray-300">Action</th>
      </tr>
    </thead>
    <tbody>
    {coursePaginatedData.length > 0 ? (
    coursePaginatedData.map((fileItem, index) => (
      
          <tr key={index} className="bg-white border-b hover:bg-gray-50">
            <td className="px-4 py-2 text-center border border-gray-300">{index + 1}</td>
            <td className="px-4 py-2 font-medium border border-gray-300">{fileItem.title}</td>
            <td className="px-4 py-2 border border-gray-300">
              <audio controls className="w-full">
                <source
                src={`${import.meta.env.VITE_SISTER_URL}/files/${removeHash(fileItem.title)}`}
                  type="audio/mpeg"
                />
                Browser Anda tidak mendukung pemutar audio.
              </audio>
            </td>
            <td className="px-4 py-2 text-center border border-gray-300">
              <button
                className="px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600"
                onClick={() =>  handleDeleteFile(fileItem.file)}
              >
                Hapus
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" className="px-4 py-3 text-center text-gray-500 italic border border-gray-300">
            Tidak ada file audio
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
</div>
        {programMateri?.file && programMateri.file.length > itemsPerPage && (
            <div className="flex  mt-4 space-x-2">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
              >
                Previous
              </button>
  
              {totalPages <= 5 ? (
                Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => changePage(i + 1)}
                    className={`px-4 py-2 ${
                      currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                    } rounded`}
                  >
                    {i + 1}
                  </button>
                ))
              ) : (
                <>
                  <button onClick={() => changePage(1)} className="px-4 py-2 bg-gray-200 rounded">
                    1
                  </button>
                  {currentPage > 3 && <span className="px-2">...</span>}
                  {Array.from({ length: 5 }, (_, i) => {
                    const page = currentPage - 2 + i;
                    return page > 1 && page < totalPages ? (
                      <button
                        key={page}
                        onClick={() => changePage(page)}
                        className={`px-4 py-2 ${
                          currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                        } rounded`}
                      >
                        {page}
                      </button>
                    ) : null;
                  })}
                  {currentPage < totalPages - 2 && <span className="px-2">...</span>}
                  <button onClick={() => changePage(totalPages)} className="px-4 py-2 bg-gray-200 rounded">
                    {totalPages}
                  </button>
                </>
              )}
  
              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
              >
                Next
              </button>
              
            </div>
          )}
                        
                    </div>
                )}
                <div className="text-center md:text-left flex flex-row gap-2 py-3">
                            <Link to="/admin/program-materi" className="bg-slate-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow">
                                Kembali
                            </Link>
                           
                        </div>
            </div>
        </AdminLayout>
    );
};

export default DetailClassFormat;
