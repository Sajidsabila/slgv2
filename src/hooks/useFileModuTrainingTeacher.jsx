import { useState, useEffect, useRef } from "react";
import {
  getProgramMateriById,
  uploadFileProgramMateri,
  addFileToProgramMateri,
  removeFileProramMateri,
  deleteFileProgramMateri,
  updateFileToProgramMateri,
} from "../api/apiProgramMateri";
import { urlLink } from "../config/config";

const useFileModulTrainingTeacher = (id) => {
  const [programMateri, setProgramMateri] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    file: null,
    name: "",
    useFileUrl: false,
    file_url: "",
    description: "",
    oldFileName: "",
    oldTitle: "",
    oldFileUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const audioRefs = useRef([]);
  const [driveExtensions] = useState({});

  const type = programMateri?.type;

  /** RESET FORM */
  const resetFormData = () => {
    setFormData({
      file: null,
      name: "",
      useFileUrl: false,
      file_url: "",
      description: "",
      oldFileName: "",
      oldTitle: "",
      oldFileUrl: "",
    });
  };

  /** FETCH Modul Training */
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
             if(!sessionStorage.getItem('user')) return
        const response = await getProgramMateriById("Modul Training", id);
        setProgramMateri(response);
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil data");
      }
    };

    fetchData();
  }, [id]);

  /** HANDLE INPUT */
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] || null : value,
    }));
  };

  /** TOGGLE FILE URL */
  const handleToogleFileUrl = () => {
    setFormData((prev) => ({
      ...prev,
      useFileUrl: !prev.useFileUrl,
      file: null,
    }));
  };

  /** SUBMIT */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!type) {
      setError("Type program belum tersedia");
      return;
    }

    if (!formData.file && !isEditMode && !formData.file_url) {
      alert("File masih kosong!");
      return;
    }

    try {
      setLoading(true);
      setIsOpen(false);

      let newFile = null;
      const folder = `Home/Modul Training/${type}`;

      /** ===== ADD ===== */
      if (!isEditMode) {
        if (formData.file && !formData.useFileUrl) {
          const uploadedFile = await uploadFileProgramMateri(
            formData.file,
            folder
          );

          newFile = {
            file: uploadedFile.name,
            title: uploadedFile.file_name,
            file_url: uploadedFile.file_url,
            description: formData.description,
          };
        } else if (formData.useFileUrl) {
          newFile = {
            file_url: formData.file_url,
            title: formData.file_url,
            description: formData.description,
          };
        }

        await addFileToProgramMateri("Modul Training", id, newFile);

        setProgramMateri((prev) => ({
          ...prev,
          file: [...(prev.file || []), newFile],
        }));
      }

      /** ===== EDIT ===== */
      else {
        const isFileChanged =
          formData.file !== null ||
          (formData.useFileUrl &&
            formData.file_url !== formData.oldFileUrl);

        if (!isFileChanged) {
          const updated = {
            file: formData.oldFileName,
            file_url: formData.oldFileUrl,
            title: formData.oldTitle,
            description: formData.description,
          };

          await updateFileToProgramMateri("Modul Training", id, updated);

          setProgramMateri((prev) => ({
            ...prev,
            file: prev.file.map((f) =>
              f.file === formData.oldFileName ? updated : f
            ),
          }));

          setSuccess("Data berhasil diperbarui");
          resetFormData();
          setIsEditMode(false);
          return;
        }

        if (formData.file && !formData.useFileUrl) {
          const uploadedFile = await uploadFileProgramMateri(
            formData.file,
            folder
          );

          newFile = {
            file: uploadedFile.name,
            title: uploadedFile.file_name,
            file_url: uploadedFile.file_url,
            oldFileName: formData.oldFileName,
            description: formData.description,
          };
        } else if (formData.useFileUrl) {
          newFile = {
            file_url: formData.file_url,
            title: formData.file_url,
            oldFileName: formData.oldFileName,
            description: formData.description,
          };
        }

      const response =   await updateFileToProgramMateri("Modul Training", id, newFile);

        if (formData.oldFileName && newFile.file) {
          await deleteFileProgramMateri(id, formData.oldFileName);
        }

        setProgramMateri((prev) => ({
          ...prev,
          file: prev.file.map((f) =>
            f.file === formData.oldFileName ? newFile : f
          ),
        }));
      }

      setSuccess(
        `File berhasil ${isEditMode ? "diperbarui" : "ditambahkan"}`
      );
      resetFormData();
      setIsEditMode(false);
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  /** DELETE */
  const handleDeleteFile = async (fileName) => {
    if (!type) return;

    try {
      setLoading(true);
      await removeFileProramMateri("Modul Training", id, fileName);

      if (fileName) {
        await deleteFileProgramMateri(id, fileName);
      }

      setProgramMateri((prev) => ({
        ...prev,
        file: prev.file.filter((item) => item.file !== fileName),
      }));

      setSuccess("Data berhasil dihapus");
    } catch (err) {
      setError("Gagal menghapus data");
    } finally {
      setLoading(false);
    }
  };

  /** EDIT */
  const handleEdit = (data) => {
    setIsEditMode(true);
    setFormData({
      name: data.name ?? "",
      file: null,
      oldFileName: data.file ?? "",
      oldTitle: data.title ?? "",
      oldFileUrl: data.file_url ?? "",
      useFileUrl: data.file_url?.startsWith("http") ?? false,
      file_url: data.file_url?.startsWith("http") ? data.file_url : "",
      description: data.description ?? "",
    });
    setIsOpen(true);
  };

  /** PAGINATION */
  const filtered =
    programMateri?.file?.filter((item) =>
      (item.title ?? "").toLowerCase().includes(search.toLowerCase())
    ) || [];

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const coursePaginatedData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return {
    programMateri,
    loading,
    error,
    success,
    isOpen,
    isEditMode,
    formData,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    handleSubmit,
    handleChange,
    handleToogleFileUrl,
    handleClose: () => setIsOpen(false),
    handleOpen: () => {
      resetFormData();
      setIsOpen(true);
      setIsEditMode(false);
    },
    handleEdit,
    handleDeleteFile,
    coursePaginatedData,
    totalPages,
    itemsPerPage,
    playTrack: () => {},
    driveExtensions,
    audioRefs,
    urlLink,
  };
};

export default useFileModulTrainingTeacher;
