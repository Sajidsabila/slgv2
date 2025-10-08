"use client";

import { useState, useEffect } from "react";
import AdminLayout from "../../../layout/admin-layout";
import { Pencil, Trash, Eye, Plus} from "lucide-react";
import Modal  from "../../../components/modal";
import { Select } from 'antd';
import { createFolderProgramMateri,
        checkFolderExists} from "../../../api/apiProgramMateri";


import { Spin } from "antd";
import { Link } from "react-router-dom";
import { apiResourceAdmin, apiResourceAdminPost, apiResourceAdminDelete, apiResourceAdminPut } from "../../../api/apiResourceAdmin";

const ProgramMateriExamSpeciment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({name: "", classFormat: "", classGrade: "", course: "" });
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
  const [search, setSearch] = useState("");


  const itemsPerPage = 5;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  
    if (name === "class_course") {
      setSelectedCourse(value);
    } else if (name === "class_format") {
      setSelectedClassFormat(value);
    } else if (name === "class_grading") {
      setSelectedClassGrading(value);
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
        const program = await apiResourceAdmin({doctype: "Program Materi"});
        setProgramMateri(program);
      } catch (error) {
        console.error("Error fetching program materi:", error);
      }
    };
  
    const fetchCourse = async () => {
      try {
        const course = await apiResourceAdmin({doctype: "Course"});
        setCourseData(course);
      } catch (error) {
      setError("Error fetching course:", error);
      }
    };

    const fetchClasssFormat = async () => {
      try {
        const classFormat = await apiResourceAdmin({doctype: "Program Class Format"});
        setClassFormat(classFormat);
      } catch (error) {
      setError("Error fetching class format:", error);
      }
    };

    const fetchClassGrading = async () => {
      try {
        const classGrading = await apiResourceAdmin({doctype: "Program Class Grading"});
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

  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
      if (!selectedCourse || !selectedClassGrading) {
        alert("Pilih  grade, dan kursus terlebih dahulu!");
        return;
      }
    try {
        setIsLoading(true);
        const data = {
            type: "Exam Specimen",
            class_grade: selectedClassGrading || "",
            class_course: courseData.find(c => c.abbr === selectedCourse)?.name || ""
        };
        console.log("ini data ya ", data);
        const response = isEditMode
            ? await apiResourceAdminPut({ doctype: "Program Materi", name: formData.name, id: data})
            : await apiResourceAdminPost({doctype: "Program Materi", data});
        if (!response.name) {
            setError(`Data Materi gagal ${isEditMode ? "diperbarui" : "disimpan"}.`);
            return ;
           
        }
            const folderPaths = [
                "Home/Program Materi",
                "Home/Program Materi/Exam Speciment",
                `Home/Program Materi/Exam Speciment/${response.abbr_course}`,
           
                `Home/Program Materi/Exam Speciment/${response.abbr_course}/${response.class_grade}`
            ];

            for (let i = 0; i < folderPaths.length; i++) {
                const folderPath = folderPaths[i];
                const folderExists = await checkFolderExists(folderPath);

                if (!folderExists) {
                    await createFolderProgramMateri({
                        file_name: folderPath.split("/").pop(),
                        folder: folderPaths[i - 1] || "Home"
                    });
                }
            }

        setSuccess(`Data Materi berhasil ${isEditMode ? "diperbarui" : "disimpan"}.`);
        setError(null);
        setProgramMateri(prevData =>
            isEditMode
                ? prevData.map(item => (item.name === response.name ? response : item))
                : [...prevData, response]
        );

        setIsEditMode(false);
        setIsOpen(false);
    } catch (error) {
      console.log(error);
        setError(`Error: ${error.response.data.exc_type || error.response.data.exception || error.message}`);
        setSuccess("");
        setIsEditMode(false);
        setIsOpen(false);
    } finally {
        setIsLoading(false);
        setFormData({ name: "" });
        setSelectedClassFormat("");
        setSelectedClassGrading("");
        setSelectedCourse("");
    }
};



const handleOpen = (data = null) => {
  if (data) {
      setSelectedCourse(data.abbr_course || "");
      setSelectedClassFormat(data.abbr_format || "");
      setSelectedClassGrading(data.abbr_grade || "");
      setFormData({ name: data.name || "" });
      setIsEditMode(true);
  } else {
      setSelectedCourse("");
      setSelectedClassFormat("");
      setSelectedClassGrading("");
      setFormData({ name: "" });
      setIsEditMode(false);
  }
  setIsOpen(true);
};


  const handleDelete = async (id) => {
    setError(null);
    setSuccess(null);
    try {
      setIsLoading(true);
      const deleteResponse = await useResourceAdminDelete({ doctype: "Program Materi", id });
      
      if (deleteResponse) { 
        setSuccess("Data Materi berhasil dihapus.");
        setProgramMateri((prevData) => prevData.filter((classFormat) => classFormat.name !== id));
      }
    } catch (error) {
      setError(`Error: ${error.response.data.exc_type || error.response.data.exception || error.message}`);
      setSuccess("");
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
  

  
const filteredProgramMateri = programMateri.filter((item) =>
(item.type === "Exam Specimen") &&
((item.class_grade ?? '').toLowerCase().includes(search.toLowerCase()) ||
  (item.class_course ?? '').toLowerCase().includes(search.toLowerCase()) ||
  (item.class_format ?? '').toLowerCase().includes(search.toLowerCase()) )
);
  const totalPages = Math.ceil(filteredProgramMateri.length / itemsPerPage) || 1;
  
  const coursePaginatedData = filteredProgramMateri.slice(
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
        <h3 className="font-bold py-7 text-lg">Learning  Materi Exam Specimen</h3>
        {error && <p className="bg-red-700 text-sm text-white py-3 px-4 my-3">{error}</p>}
        {success && <p className="bg-green-700 text-sm text-white py-3 px-4 my-3">{success}</p>}
        <div className="flex flex-col w-full p-4 bg-white rounded-xl shadow-lg">
          <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center mb-4 gap-2">
            <button
              onClick={() => handleOpen()}
              className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-md shadow hover:cursor-pointer"
            >
              Insert Data
            </button>
  
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {isOpen && !loading && (
              <Modal
                isOpen={isOpen}
                onClose={handleClose}
                titleModal={isEditMode ? "Edit Program Materi" : "Add Program Materi"}
                onSubmit={handleSubmit}
              >
            <label htmlFor="course" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Course
            </label>
          <Select
            showSearch
            id="course"
            name="course"
            placeholder="Select Course"
            value={selectedCourse}
            onChange={(value) => setSelectedCourse(value)}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={courseData.map((course) => ({
              value: course.abbr,
              label: course.name
            }))}
            style={{ width: '100%', height: '40px' }}
          />

          
          <label htmlFor="classGrading" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Class Grading
          </label>
          <Select
            showSearch
            id="classGrading"
            placeholder="Select Class Grading"
            value={selectedClassGrading}
            onChange={(value) => setSelectedClassGrading(value)}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={classGrading.map((grading) => ({
              value: grading.name,
              label: grading.name
            }))}
            style={{ width: '100%',  height: '40px' }}
          />
        </Modal>
      )}
      {loading && (
       <Spin size="large" />
      )}
          <div className="relative overflow-x-auto rounded-xl shadow-md">
        
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-6 py-3">No</th>
                  <th className="px-6 py-3">ID Course</th>
                  <th className="px-6 py-3">Class Course</th>
                
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
                      <td className="px-6 py-4 font-bold">{item.name}</td>
                      <td className="px-6 py-4">{item.class_course}</td>
                    
                      <td className="px-6 py-4">{item.class_grade}</td>
                 
                      <td className="px-6 py-4 text-center flex gap-4">
                  
                        <button
                         onClick={ () => {
                          if(window.confirm('Apakah anda yakin ingin Menghapus data ini?'))
                          {handleDelete(item.name)}}}
                          className="bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 flex items-center gap-1 px-3 py-1 rounded-md hover:cursor-pointer">
                          <Trash  size={16} /> Delete
                        </button>
                        <Link to={`/admin/program-materi-exam-speciment/${item.name}`}
                        className="bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-800 hover:text-green-800 flex items-center gap-1 px-3 py-1 rounded-md hover:cursor-pointer">
                          <Pencil size={16} /> Detail
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500 font-bold">
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
export default ProgramMateriExamSpeciment