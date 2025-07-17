import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, Trash } from "lucide-react";
import { motion } from "framer-motion";

import AdminLayout from "../../layout/admin-layout";
import {
  getModulTraining,
  postModulTraining,
  uploadFileProgramMateri,
  deleteFileProgramMateri,
  updateModulTraining,
  deleteModulTraining
} from "../../api/apiProgramMateri";
import Modal from "../../components/Modal/modal";
import InputModal from "../../components/InputModal";

const CalenderAcademic = () => {
  const [calenderAcademic, seCalenderAcademic] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    description: "",
    file: null,
    type: "Calender Academic",
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchModulTraining = async () => {
      try {
        const response = await getModulTraining();
        seCalenderAcademic(response);
      } catch (error) {
        console.error("Terjadi kesalahan", error?.response?.data || error.message);
      }
    };
    fetchModulTraining();
  }, []);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    const newValue = type === "file" ? files[0] : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleEdit = (name) => {
    const dataToEdit = calenderAcademic.find((item) => item.name === name);
    if (!dataToEdit) return;

    setFormData({
      description: dataToEdit.description || "",
      file: null,
      oldFileName: dataToEdit.file || "",
      oldTitle: dataToEdit.title || "",
      oldFileUrl: dataToEdit.file_url || "",
      type: dataToEdit.type || "Calender Academic",
    });

    setEditId(dataToEdit.name);
    setIsEditMode(true);
    setIsOpen(true);
  };

  const filteredData = calenderAcademic.filter(
    (item) =>
      item?.description?.toLowerCase().includes(search.toLowerCase()) &&
      item.type === "Calender Academic"
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (name) => {
    try{
      setIsLoading(true);
      const deleteResponse = await deleteModulTraining(name);
      console.log(deleteResponse);
      if (deleteResponse) {
        setSuccess("Data berhasil dihapus.");
        const deleteFile = await deleteFileProgramMateri(name);
        seCalenderAcademic((prevData) => prevData.filter((item) => item.name !== name));
      }
    } catch (error) {
      setError(`Error: ${error.response.data.exc_type || error.response.data.exception || error.message}`);
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file && !isEditMode && !formData.oldFileName) {
      alert("File masih kosong!");
      return;
    }

    const file = formData.file;

    if (file) {
      const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
      if (!allowedTypes.includes(file.type)) {
        alert("File harus berformat PNG, JPG, atau JPEG!");
        return;
      }
    }

    try {
      setIsLoading(true);
      setIsOpen(false);

      let newFile = null;
      const folderPath = `Home/Program Materi`;

      if (!isEditMode || file) {
        const uploadedFile = await uploadFileProgramMateri(file, folderPath);
        if (!uploadedFile?.name) throw new Error("File tidak dikembalikan oleh server.");

        newFile = {
          file: uploadedFile.name,
          title: uploadedFile.file_name,
          file_url: uploadedFile.file_url,
          type: formData.type || "Calender Academic",
          description: formData.description || ""
        };

        if (!isEditMode) {
          await postModulTraining(newFile);
        } else {
          await updateModulTraining(editId, {
            ...newFile,
            oldFileName: formData.oldFileName || ""
          });

          if (formData.oldFileName) {
            try {
              await deleteFileProgramMateri(editId, formData.oldFileName);
            } catch (deleteErr) {
              console.error("Gagal menghapus file lama:", deleteErr);
            }
          }
        }
      }

      const updatedData = await getModulTraining();
      seCalenderAcademic(updatedData);

      setSuccess(`File berhasil ${isEditMode ? "diperbarui" : "ditambahkan"}!`);
      setFormData({
        file: null,
        oldFileName: "",
        oldTitle: "",
        oldFileUrl: "",
        description: "",
        type: "Calender Academic"
      });
      setIsEditMode(false);
      setEditId(null);
    } catch (error) {
      setError(`Terjadi kesalahan: ${error.response?.data?.exception || error.message}`);
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <h3 className="font-bold py-7 text-lg">Calender Academic</h3>

      {error && <p className="bg-red-700 text-sm text-white py-3 px-4 my-3">{error}</p>}
      {success && <p className="bg-green-700 text-sm text-white py-3 px-4 my-3">{success}</p>}

      <div className="flex flex-col w-full p-4 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center mb-4 gap-2">
          <button
            onClick={() => {
              setIsEditMode(false);
              setFormData({ description: "", file: null, type: "Calender Academic" });
              setIsOpen(true);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-md shadow hover:cursor-pointer"
          >
            Insert Data
          </button>

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {isOpen && !loading && (
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            titleModal={isEditMode ? "Edit Calender Academic" : "Add Calender Academic"}
            onSubmit={handleSubmit}
          >
            <InputModal
              label="Description"
              type="text"
              name="description"
              value={formData.description}
              placeholder="Description ....."
              autoFocus
              onChange={handleChange}
            />
            <InputModal
              label="Image"
              type="file"
              name="file"
              placeholder="Image ....."
              onChange={handleChange}
            />
          </Modal>
        )}

        {loading && (
          <motion.div
            className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-blue-500 mt-3">Memproses data...</p>
            </div>
          </motion.div>
        )}

        <div className="relative overflow-x-auto rounded-xl shadow-md">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr key={index} className="odd:bg-gray-50 even:bg-gray-100 border-b border-gray-300">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4 font-bold">{item.name}</td>
                    <td className="px-6 py-4">{item.type}</td>
                    <td className="px-6 py-4 flex gap-4">
                      <button
                        onClick={() =>
                          window.confirm("Apakah anda yakin ingin menghapus data ini?") &&
                          handleDelete(item.name)
                        }
                        className="bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 flex items-center gap-1 px-3 py-1 rounded-md hover:cursor-pointer"
                      >
                        <Trash size={16} /> Delete
                      </button>
                      <Link
                        to={`/admin/book-menu/${item.name}`}
                        className="bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-800 flex items-center gap-1 px-3 py-1 rounded-md hover:cursor-pointer"
                      >
                        <Eye size={16} /> Detail
                      </Link>
                      <button
                        onClick={() => handleEdit(item.name)}
                        className="bg-orange-100 text-orange-600 hover:bg-orange-200 hover:text-orange-800 flex items-center gap-1 px-3 py-1 rounded-md hover:cursor-pointer"
                      >
                        <Pencil size={16} /> Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500 font-bold">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredData.length > 0 && (
          <div className="flex mt-4 flex-wrap gap-2">
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => changePage(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}

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

export default CalenderAcademic;
