import AdminLayout from "../../layout/admin-layout"
import { useState, useEffect } from "react";
import { Pencil, Trash, Eye, Plus} from "lucide-react";
import Modal  from "../../components/modal";
import { Select } from 'antd';
import { createFolderProgramMateri,
        checkFolderExists} from "../../api/apiProgramMateri";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { apiResourceAdmin, apiResourceAdminDelete, apiResourceAdminPost, apiResourceAdminPut } from "../../api/apiResourceAdmin";

const ModulTrainingForTeacher = ({valueSelect, filteredType, url}) => {
     const [isOpen, setIsOpen] = useState(false);
          const [formData, setFormData] = useState({type: ""});
          const [programMateri, setProgramMateri] = useState([]);
          const [selectedType, setselectedType] = useState("");
          const [currentPage, setCurrentPage] = useState(1);
          const [error, setError] = useState(null);
          const [success, setSuccess] = useState(null);
          const [loading, setIsLoading] = useState(false);
          const [isEditMode, setIsEditMode] = useState(false);
          const [search, setSearch] = useState("");
          const[courseData, setCourseData] = useState([]);
    
          const itemsPerPage = 5;

          useEffect(() => {
        const fetchProgramMateri = async () => {
          try {
            const program = await apiResourceAdmin({doctype: "Modul Training"});
            setProgramMateri(program);
          } catch (error) {
            console.error("Error fetching Modul Training :", error);
          }
        };
    
        fetchProgramMateri();
      }, []);
          
          const handleChange = (e) => {
            const { name, value } = e.target;
          
            setFormData((prevForm) => ({
              ...prevForm,
              [name]: value
            }));
          };
        
          const handleSubmit = async (event) => {
            event.preventDefault();
          
              if (!selectedType) {
                alert("Form tidak boleh kosong");
                return;
              }
            try {
                setIsLoading(true);
                const data = {
                   type: selectedType,
                   title: selectedType,
                };
                const response = isEditMode
                    ? await apiResourceAdminPut({doctype: "Modul Training", name: formData.name, id: data})
                    : await apiResourceAdminPost({doctype: "Modul Training", data});
                if (!response.name) {
                    setError(`Data Materi gagal ${isEditMode ? "diperbarui" : "disimpan"}.`);
                    return ;
                   
                }
                    const folderPaths = [
                        "Home/Modul Training",
                        `Home/Modul Training/${response.type}`,
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
                setselectedType("");
            }
        };
        
        
        
        const handleOpen = (data = null) => {
          if (data) {
              setselectedType(data.value || "");
              setIsEditMode(true);
          } else {
              setselectedType("");
              setIsEditMode(false);
          }
          setIsOpen(true);
        };
        
        
          const handleDelete = async (id) => {
            setError(null);
            setSuccess(null);
            try {
              setIsLoading(true);
              const deleteResponse = await apiResourceAdminDelete({ doctype: "Modul Training", id });
              
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
             file: null, name: "", selectedType: ""
            });
            setselectedType("");      
            setIsOpen(false);
          };
          
        
          
        const filteredProgramMateri = programMateri.filter((item) =>
          filteredType.includes(item.type) &&
          (
            (item.type ?? "").toLowerCase().includes(search.toLowerCase()) ||
            (item.title ?? "").toLowerCase().includes(search.toLowerCase())
          )
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
        <h3 className="font-bold py-7 text-lg">Learning Materi Syllabus</h3>
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
                titleModal={isEditMode ? "Edit Modul Training " : "Add Modul Training "}
                onSubmit={handleSubmit}
              >
            <label htmlFor="course" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Type Modul Training
            </label>
          <Select
            showSearch
            id="course"
            name="course"
            placeholder="Select Course"
            value={selectedType}
            onChange={(value) => setselectedType(value)}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={valueSelect.map((type) => ({
              value: type.value,
              label: type.label
            }))}
            style={{ width: '100%', height: '40px' }}
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
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Title</th>
                 
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
                      <td className="px-6 py-4">{item.type}</td>
                  
                      <td className="px-6 py-4 text-center flex gap-4">
                  
                        <button
                         onClick={ () => {
                          if(window.confirm('Apakah anda yakin ingin Menghapus data ini?'))
                          {handleDelete(item.name)}}}
                          className="bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 flex items-center gap-1 px-3 py-1 rounded-md hover:cursor-pointer">
                          <Trash  size={16} /> Delete
                        </button>
                        <Link to={`/admin/modul-training-teacher/${url}/${item.name}`}
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
}

export default  ModulTrainingForTeacher