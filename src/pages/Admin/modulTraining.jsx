import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, Trash } from "lucide-react";
import AdminLayout from "../../layout/admin-layout";
import {
  uploadFileProgramMateri,
  deleteFileProgramMateri
} from "../../api/apiProgramMateri";
import Modal  from "../../components/modal";
import InputModal from "../../components/inputModal";
import { apiResourceAdmin, apiResourceAdminDelete, apiResourceAdminPut, apiResourceAdminPost} from "../../api/apiResourceAdmin";
import { Spin } from "antd";


const ModulTraining = () => {
  const [modulTraining, setModulTraining] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    description: "",
    title: "",
    file: null,
    file_url: "",
    type: "Modul Training",
    is_active: false,
    useFileUrl: false 
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [warning, setWarning] = useState("");

  const itemsPerPage = 10;
  const toggleUseFileUrl = (checked) => {
  setFormData(prev => ({
    ...prev,
    useFileUrl: checked,
    file: checked ? null : prev.file
  }));
};

  const fetchModulTraining = async () => {
  try {
    const response = await apiResourceAdmin({
      doctype: "Modul Training",
      filters: [["type", "=", "Modul Training"]],
    });
    setModulTraining(response);
  } catch (error) {
    console.error("Terjadi kesalahan", error?.response?.data || error.message);
  }
};
  useEffect(() => {
    fetchModulTraining();
  }, []);



  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    let newValue;

    if (type === "file") {
      newValue = files && files.length > 0 ? files[0] : null;
    } else {
      newValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue
    }));
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setWarning("");
    setFormData({
      description: "",
      title: "",
      file: null,
      file_url: "",
      type: "Modul Training",
      is_active: false,
      useFileUrl: false
    });
    setEditId(null);
    setIsEditMode(false);
  };

  const handleEdit = (name) => {
    const dataToEdit = modulTraining.find((item) => item.name === name);
    if (!dataToEdit) return;

    const isUrl = dataToEdit.file_url?.startsWith("http://") || dataToEdit.file_url?.startsWith("https://");

    setFormData({
      description: dataToEdit.description || "",
      file: null,
      file_url: dataToEdit.file_url || "",
      oldFileName: dataToEdit.file || "",
      title: dataToEdit.title || "",
      type: dataToEdit.type || "Modul Training",
      is_active: dataToEdit.is_active || false,
      useFileUrl: isUrl
    });

    setEditId(dataToEdit.name);
    setIsEditMode(true);
    setIsOpen(true);
  };

  const filteredData = modulTraining.filter(
    (item) =>
      item?.description?.toLowerCase().includes(search.toLowerCase()) &&
      item.type === "Modul Training"
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
    try {
      setIsLoading(true);
      const deleteResponse = await apiResourceAdminDelete({doctype: "Modul Training", id: name});
      if (deleteResponse) {
        setSuccess("Data berhasil dihapus.");
        setModulTraining((prevData) => prevData.filter((item) => item.name !== name));
      }
    } catch (error) {
      setError(`Error: ${error.response?.data?.exc_type || error.response?.data?.exception || error.message}`);
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file && !formData.file_url && !isEditMode) {
      alert("File atau URL masih kosong!");
      return;
    }

    if (formData.file) {
      const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
      if (!allowedTypes.includes(formData.file.type)) {
        alert("File harus berformat PNG, JPG, atau JPEG!");
        return;
      }
    }

    try {
      setIsLoading(true);
      setIsOpen(false);

      let payload = {
        description: formData.description,
        title: formData.title,
        type: formData.type || "Modul Training",
        file:formData.file,
        is_active: formData.is_active
      };

      if (formData.useFileUrl && formData.file_url) {
         const uploadedWithUrl = await uploadFileProgramMateri(formData.file_url, "Home/Program Materi");
        payload = { 
          description: formData.description,
          title: formData.title,
          type: formData.type || "Modul Training",
          file: uploadedWithUrl.name,
          is_active: formData.is_active
        }
      } else if (formData.file) {
        const uploadedFile = await uploadFileProgramMateri(formData.file, "Home/Program Materi");
        payload.file = uploadedFile.name;
        payload.file_url = uploadedFile.file_url;

        if (isEditMode && formData.oldFileName) {
          try {
            await deleteFileProgramMateri(editId, formData.oldFileName);
          } catch (deleteErr) {
            console.error("Gagal menghapus file lama:", deleteErr);
          }
        }
      }

      if (isEditMode) {
        await apiResourceAdminPut({doctype: "Modul Training", id: editId, data: payload});
      } else {
        await apiResourceAdminPost({doctype: "Modul Training", data: payload});
      }

      await fetchModulTraining();
      setSuccess(`Data berhasil ${isEditMode ? "diperbarui" : "ditambahkan"}!`);
      handleCloseModal();
    } catch (error) {
      setError(`Terjadi kesalahan: ${error.response?.data?.exception || error.message}`);
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  
  return (
    <AdminLayout>
      <h3 className="font-bold py-7 text-lg">Modul Training</h3>

      {error && <p className="bg-red-700 text-sm text-white py-3 px-4 my-3">{error}</p>}
      {success && <p className="bg-green-700 text-sm text-white py-3 px-4 my-3">{success}</p>}

      <div className="flex flex-col w-full p-4 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center mb-4 gap-2">
        
          <button
            onClick={() => {
              setIsEditMode(false);
              setFormData({ description: "", title: "", file: null, file_url: "", type: "Modul Training", is_active: false, useFileUrl: false });
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
            onClose={handleCloseModal}
            titleModal={isEditMode ? "Edit Modul Training" : "Add Modul Training"}
            onSubmit={handleSubmit}
          >
            
            {warning && (
                 <p className="text-sm text-gray-500 bg-red-500 py-3 px-4 text-white font-bold text-white rounded-md">{warning}</p>
            )}
            <InputModal
              label="Title"
              type="text"
              name="title"
              value={formData.title}
              placeholder="Title..."
              autoFocus
              onChange={handleChange}
            />
            <InputModal
              label="Description"
              type="text"
              name="description"
              value={formData.description}
              placeholder="Description..."
              onChange={handleChange}
            />

            <div className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                checked={formData.useFileUrl}
                onChange={(e) => toggleUseFileUrl(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
              />
              <label className="text-sm font-medium text-gray-700">Use File Url</label>
            </div>

            {formData.useFileUrl ? (
              <InputModal
                label="File URL"
                type="text"
                name="file_url"
                value={formData.file_url}
                placeholder="Masukkan URL file..."
                onChange={handleChange}
              />
            ) : (
              <>
                <InputModal
                  label="File"
                  type="file"
                  name="file"
                  onChange={handleChange}
                />
                {isEditMode && (
                  <p className="text-sm text-gray-500">Kosongkan jika file tidak ingin diubah</p>
                )}
              </>
            )}
          </Modal>
        )}

        {loading && (
          <Spin size="large" />
        )}

        {/* Table */}
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
                        to={`/admin/modul-training/${item.name}`}
                        className="bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-800 flex items-center gap-1 px-3 py-1 rounded-md hover:cursor-pointer"
                      >
                        <Eye size={16} /> Detail
                      </Link>
                      <button
                        onClick={() => handleEdit(item.name)}
                        className="bg-orange-100 text-orange-600 hover:bg-orange-200 hover:text-orange-800 flex items-center gap-1 px-3 py-1 rounded-md hover:cursor-pointer
                        "
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

        {/* Pagination */}
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

export default ModulTraining;
