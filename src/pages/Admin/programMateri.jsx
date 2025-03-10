"use client";

import { useState, useEffect } from "react";
import AdminLayout from "../../layout/admin-layout";
import { Pencil, Trash } from "lucide-react";
import Modal from "../../components/Modal/modal";
import InputModal from "../../components/InputModal";
import { getProgramMateri } from "../../api/apiProgramMateri";
import { uploadFileProgramMateri, postProgramMateri, deleteProgramMateri } from "../../api/apiProgramMateri";
import { getClassFormat } from "../../api/apiClassFormat";
import { getClassGrading } from "../../api/apiClassGrade";
import { motion } from "framer-motion";
import { getCourse } from "../../api/apiCourse";

const ProgramMateri = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ file: null });
  const [courseData, setCourseData] = useState([]);
  const [programMateri, setProgramMateri] = useState([]);
  const [classFormat, setClassFormat] = useState([]);
  const [classGrading, setClassGrading] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const itemsPerPage = 5;
  
  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFormData((prevForm) => ({
        ...prevForm,
        file: e.target.files[0]
      }));
    } else {
      setFormData((prevForm) => ({
        ...prevForm,
        [e.target.name]: e.target.value
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
  
    if (!formData.file) {
      alert("Silakan pilih file terlebih dahulu.");
      return;
    }
  
    const allowedTypes = ["audio/mpeg", "audio/mp3"];
    if (!allowedTypes.includes(formData.file.type)) {
      alert("Hanya file MP3 yang diperbolehkan.");
      return;
    }
  
    try {
      setIsLoading(true);
      const result = await uploadFileProgramMateri(formData.file, "");
      
      if (!result || !result.name) {
       setError(result?.message || "Gagal mengupload file.");
      }
  
      const data = {
        file: [{ file_url: result.name }]
      };
  
      const postMateriResponse = await postProgramMateri(data);
  
      if (!postMateriResponse || !postMateriResponse.name) {
        setError(postMateriResponse?.message || "Gagal menyimpan data materi.");
      }
  
      setSuccess("Data Materi berhasil disimpan.");
      setProgramMateri((prevData) => [...prevData, postMateriResponse]);
      setFormData({ file: null, name: "" });
      setIsOpen(false);
    } catch (error) {
      setError(`Error: ${error.message || "Terjadi kesalahan saat mengupload atau mengirim data"}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = async (id) => {
    setError(null);
    setSuccess(null);
    try {
      setIsLoading(true);
      const deleteResponse = await deleteProgramMateri(id);
      
      if (deleteResponse) { 
        setSuccess("Data Materi berhasil dihapus.");
        setProgramMateri((prevData) => prevData.filter((course) => course.id !== id));
      }
    } catch (error) {
      setError(`Terjadi kesalahan: ${error.message || "Gagal menghapus data"}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClose = () => {
    setFormData({
      name: "",
      file: null,
    });
    setIsOpen(false);
  };
  
  useEffect(() => {
    const fetchProgramMateri = async () => {
      try {
        const program = await getProgramMateri();
        setProgramMateri(program);
      } catch (error) {
        console.error("Error fetching program materi:", error);
      }
    };
  
    const fetchCourse = async () => {
      try {
        const course = await getCourse();
        setCourseData(course);
      } catch (error) {
      setError("Error fetching course:", error);
      }
    };

    const fetchClasssFormat = async () => {
      try {
        const classFormat = await getClassFormat();
        setClassFormat(classFormat);
      } catch (error) {
      setError("Error fetching class format:", error);
      }
    };

    const fetchClassGrading = async () => {
      try {
        const classGrading = await getClassGrading();
        setClassGrading(classGrading);
      } catch (error) {
      setError("Error fetching class grading:", error);
      }
    }
    fetchClassGrading();
    fetchClasssFormat();
    fetchCourse();
    fetchProgramMateri();
  }, []);
  
  console.log(courseData);
  const totalPages = Math.ceil(programMateri.length / itemsPerPage) || 1;
  
  const coursePaginatedData = programMateri.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  
    return (
      <AdminLayout>
        <h3 className="font-bold py-7 text-lg">Program Materi</h3>
        {error && <p className="bg-red-700 text-sm text-white py-3 px-4 my-3">{error}</p>}
        {success && <p className="bg-green-700 text-sm text-white py-3 px-4 my-3">{success}</p>}
        <div className="flex flex-col w-full p-4 bg-white rounded-xl shadow-lg">
          <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center mb-4 gap-2">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-blue-800 hover:bg-blue-700 text-white py-1 px-3 rounded-md shadow"
            >
              Insert Data
            </button>
  
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-lg px-4 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/* Modal Insert Data */}
          {isOpen && !loading && (
        <Modal isOpen={isOpen} onClose={handleClose} titleModal="Form Insert Data" onSubmit={handleSubmit}>
          <InputModal label="File" type="file" name="file" onChange={handleChange} />
        </Modal>
      )}
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

  
          {/* Tabel */}
        
          <div className="relative overflow-x-auto rounded-xl shadow-md">
        
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-6 py-3">No</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {coursePaginatedData.length > 0 ? (
                  coursePaginatedData.map((item, index) => (
                    <tr
                      key={index}
                      className="odd:bg-gray-50 even:bg-gray-100 border-b border-gray-300"
                    >
                      <th className="px-6 py-4 font-medium text-gray-900">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </th>
                      <td className="px-6 py-4">{item.name}</td>
                 
                      <td className="px-6 py-4 text-center flex gap-4">
                        <button  className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                          <Pencil size={16} /> Edit
                        </button>
                        <button
                         onClick={ () => {
                          if(window.confirm('Apakah anda yakin ingin Menghapus data ini?'))
                          {handleDelete(item.name)}}}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1">
                          <Trash  size={16} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
  
          {/* Pagination Controls */}
          {courseData.length > 0 && (
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
      </AdminLayout>
    );
  };
export default ProgramMateri