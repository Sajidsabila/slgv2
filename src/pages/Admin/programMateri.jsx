"use client";

import { useState, useEffect } from "react";
import AdminLayout from "../../layout/admin-layout";
import { Pencil, Trash, Eye } from "lucide-react";
import Modal from "../../components/Modal/modal";
import InputModal from "../../components/InputModal";
import { getProgramMateri, updateProgramMateri } from "../../api/apiProgramMateri";
import { uploadFileProgramMateri, postProgramMateri, deleteProgramMateri } from "../../api/apiProgramMateri";
import { getClassFormat } from "../../api/apiClassFormat";
import { getClassGrading } from "../../api/apiClassGrade";
import { motion } from "framer-motion";
import { getCourse } from "../../api/apiCourse";
import { Link } from "react-router-dom";

const ProgramMateri = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ file: null, name: "", classFormat: "", classGrade: "", course: "" });
  const [courseData, setCourseData] = useState([]);
  const [programMateri, setProgramMateri] = useState([]);
  const [classFormat, setClassFormat] = useState([]);
  const [classGrading, setClassGrading] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedClassFormat, setSelectedClassFormat] = useState(" ");
  const [selectedClassGrading, setSelectedClassGrading] = useState(" ");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [oldFile, setOldFile] = useState(null);


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

      if (e.target.name === "course") {
        setSelectedCourse(e.target.value);
       
      }
  
      if (e.target.name === "class_format") {
        setSelectedClassFormat(e.target.value);
      }
  
      if (e.target.name === "class_grading") {
        setSelectedClassGrading(e.target.value);
      }
    }
  };
  
  useEffect(() => {
    selectedCourse
    selectedClassFormat
    selectedClassGrading
  }, [selectedCourse, selectedClassFormat, selectedClassGrading]);
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
  useEffect(() => {
    selectedCourse
  }, [selectedCourse]);
  
  useEffect(() => {
   selectedClassFormat
  }, [selectedClassFormat]);
  
  useEffect(() => {
     selectedClassGrading
  }, [selectedClassGrading]);
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      let fileData = null;
 
      if (!isEditMode) {
        const duplicateCourse = programMateri.some(
          (materi) =>
            materi.class_format === selectedClassFormat &&
            materi.class_grade === selectedClassGrading &&
            materi.class_course === selectedCourse
        );
  
        if (duplicateCourse) {
          alert("Data dengan format, grade, dan kursus yang sama sudah ada!");
          setIsLoading(false);
          return;
        }
  
        if (!formData.file) {
          alert("Silakan pilih file terlebih dahulu untuk menyimpan materi baru.");
          setIsLoading(false);
          return;
        }
        if(!selectedClassFormat){
          alert("class format harus diisi");
          setIsLoading(false)
          return;
        }
        if(!selectedClassGrading){
          alert("class grading harus diisi");
          setIsLoading(false)
          return;
        }
        if(!selectedCourse){
          alert("course harus diis")
          setIsLoading(false)
          return;
        }
      }

      if (formData.file) {
        const allowedTypes = ["audio/mpeg", "audio/mp3"];
        if (!allowedTypes.includes(formData.file.type)) {
          alert("Hanya file MP3 yang diperbolehkan.");
          setIsLoading(false);
          return;
        }
  
        const result = await uploadFileProgramMateri(formData.file, "");
  
        if (!result || !result.name) {
          setError(result?.message || "Gagal mengupload file.");
          setIsLoading(false);
          return;
        }
  
        fileData = { file: result.name, title: result.file_name };
      }

      const data = {
        class_format: selectedClassFormat,
        class_grade: selectedClassGrading,
        class_course: selectedCourse,
        file: fileData ? [fileData] : oldFile ? [oldFile] : undefined 
      };
  
      if (isEditMode) {
        const updateResponse = await updateProgramMateri(formData.name, data);
  
        if (!updateResponse || !updateResponse.name) {
          setError(updateResponse?.message || "Gagal mengupdate materi.");
          setIsOpen(false);
          return;
        }
  
        setSuccess("Data Materi berhasil diperbarui.");
        setProgramMateri((prevData) =>
          prevData.map((item) =>
            item.name === updateResponse.name ? updateResponse : item
          )
        );
        setIsEditMode(false);
        setIsOpen(false);
        return;
      }
  

      const postMateriResponse = await postProgramMateri(data);
  
      if (!postMateriResponse || !postMateriResponse.name) {
        setError(postMateriResponse?.message || "Gagal menyimpan data materi.");
        setIsLoading(false);
        return;
      }
  
      setSuccess("Data Materi berhasil disimpan.");
      setProgramMateri((prevData) => [...prevData, postMateriResponse]);
  
      setIsOpen(false);
    } catch (error) {
      setError(`Error: ${error.message || "Terjadi kesalahan saat mengupload atau mengirim data"}`);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
      setFormData({ file: null, name: "" });
      if (!isEditMode || fileData) {
        setOldFile(null);
      }
      setSelectedClassFormat("");
      setSelectedClassGrading("");
      setSelectedCourse("");
    }
  };
  
  
  
  
  const handleOpen = (data = null) => {
    if (data) {
      setSelectedCourse(data.class_course || "");
      setSelectedClassFormat(data.class_format || "");
      setSelectedClassGrading(data.class_grade || "");
      setOldFile(data.file ? data.file[0] : null);
      setFormData((prevForm) => ({
        ...prevForm,
        name: data.name
    }));
      setIsEditMode(true);
    } else {
      setSelectedCourse("");
      setSelectedClassFormat("");         
      setSelectedClassGrading("");
      setIsEditMode(false);
      setFormData((prevForm) => ({
        ...prevForm,
        name: ""
    }));
    }
    setIsOpen(true); 
  };
  const handleDelete = async (id) => {
    setError(null);
    setSuccess(null);
    try {
      setIsLoading(true);
      const deleteResponse = await deleteProgramMateri(id);
      
      if (deleteResponse) { 
        setSuccess("Data Materi berhasil dihapus.");
        setProgramMateri((prevData) => prevData.filter((classFormat) => classFormat.name !== id));
      }
    } catch (error) {
      setError(`Terjadi kesalahan: ${error.message || "Gagal menghapus data"}`);
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleClose = () => {
    setFormData({
     file: null, name: "", classFormat: "", classGrade: "", course: ""
    });
    setSelectedClassFormat("");  
    setSelectedClassGrading(""); 
    setSelectedCourse("");       
  
    setIsOpen(false);
  };
  

  
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
              onClick={() => handleOpen()}
              className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-md shadow"
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
        <Modal isOpen={isOpen} onClose={handleClose} titleModal={isEditMode ? "Edit Program Materi" : "Insert Program Materi"} onSubmit={handleSubmit}>
       <InputModal 
           
            type="hidden"
            name="name"
            value={formData.name}
            onChange={handleChange} />
      <label 
        htmlFor="counse" 
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course</label>
      <select
        id="course"
        name="course"
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option defaultValue="">-- Pilih Course --</option>
        {courseData.map((course) => (
          <option key={course.name} value={course.name}>
            {course.name}
          </option>
        ))}
      </select>
      <label 
        htmlFor="classFormat" 
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Class Format</label>
      <select
        id="classFormat"
        value={selectedClassFormat}
        onChange={(e) => setSelectedClassFormat(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option defaultValue="">-- Pilih Class Format --</option>
        {classFormat.map((classFormat) => (
          <option key={classFormat.name} value={classFormat.name}>
            {classFormat.name}
          </option>
        ))}
      </select>

      <label 
        htmlFor="classGrading" 
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Class Grading</label>
      <select
        id="classGrading"
        value={selectedClassGrading}
        onChange={(e) => setSelectedClassGrading(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option defaultValue="">-- Pilih Class Grading --</option>
        {classGrading.map((classGrading) => (
          <option key={classGrading.name} value={classGrading.name}>
            {classGrading.name}
          </option>
        ))}
      </select>
          <InputModal 
            label="File" 
            type="file"
            name="file"
            onChange={handleChange} />
            {isEditMode && (
              <p className="py-2 text-sm font-semibold">note: Kosongkan file jika tidak ingin di update</p>
            )}
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
                  <th className="px-6 py-3">Class Course</th>
                  <th className="px-6 py-3">Class Format</th>
                  <th className="px-6 py-3">Class Grade</th>
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
                      <td className="px-6 py-4">{item.class_course}</td>
                      <td className="px-6 py-4">{item.class_format}</td>
                      <td className="px-6 py-4">{item.class_grade}</td>
                 
                      <td className="px-6 py-4 text-center flex gap-4">
                        <button  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        onClick={() => handleOpen(item)}>
                          <Pencil size={16} /> Edit
                        </button>
                        <button
                         onClick={ () => {
                          if(window.confirm('Apakah anda yakin ingin Menghapus data ini?'))
                          {handleDelete(item.name)}}}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1">
                          <Trash  size={16} /> Delete
                        </button>
                        <Link to={`/admin/program-materi/${item.name}`} className="text-green-600 hover:text-green-800 flex items-center gap-1">
                          <Eye size={16} /> Detail
                        </Link>
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