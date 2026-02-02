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

const useFileMateri = (id, type) => {
  const [programMateri, setProgramMateri] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    file: null,
    name: "",
    useFileUrl: false,
    file_url: "",
    oldFileName: "",
    oldTitle: "",
    oldFileUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [driveExtensions, setDriveExtensions] = useState({});
  const audioRefs = useRef([]);
  const itemsPerPage = 5;

  /** Reset Form */
  const resetFormData = () => {
    setFormData({
      file: null,
      name: "",
      useFileUrl: false,
      file_url: "",
      oldFileName: "",
      oldTitle: "",
      oldFileUrl: "",
    });
  };

  /** Fetch Program Materi */
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const response = await getProgramMateriById("Program Materi", id);
        setProgramMateri(response);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [id]);

  /** Play Audio/Video */
  const playTrack = (index) => {
    audioRefs.current.forEach((audio, i) => {
      if (audio && i !== index) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    if (audioRefs.current[index]) {
      audioRefs.current[index].play();
    }
  };
  /** Handle Input Change */
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] || prev.oldFileName : value,
    }));
  };

  /** Toggle Use File URL */
  const handleToogleFileUrl = () => {
    setFormData((prev) => ({ ...prev, useFileUrl: !prev.useFileUrl }));
  };

  /** Submit Form */
const handleSubmit = async (event) => {
  event.preventDefault();

  if (!formData.file && !isEditMode && !formData.file_url) {
    alert("File masih kosong!");
    return;
  }

  try {
    setLoading(true);
    setIsOpen(false);

    let newFile = null;

    const folder =
      programMateri?.type === "Exam Specimen"
        ? `Home/Program Materi/${type}/${programMateri?.abbr_course}/${programMateri?.class_grade}`
        : `Home/Program Materi/${type}/${programMateri?.abbr_course}`;

    if (!isEditMode) {
      if (formData.file && !formData.useFileUrl) {
        const uploadedFile = await uploadFileProgramMateri(formData.file, folder);
        if (!uploadedFile?.name) throw new Error("Gagal upload file ke server");

        newFile = {
          file: uploadedFile.name,
          title: uploadedFile.file_name,
          file_url: uploadedFile.file_url,
          type: "Program Materi",
          description: formData.description
        };

      } else if (formData.useFileUrl) {
        const uploadWithUrl = await uploadFileProgramMateri(formData.file_url, folder);
        newFile = {
          file_url: formData.file_url,
          title: formData.file_url,
          file: uploadWithUrl.name,
          type: "Program Materi",
          description: formData.description
        };
      }

      if (newFile) {
        await addFileToProgramMateri("Program Materi", id, newFile);
        setProgramMateri((prev) => ({
          ...prev,
          file: [...(prev.file || []), newFile],
        }));
      }

    } else {
         const isFileChanged =
        formData.file !== null || 
        (formData.useFileUrl && formData.file_url !== formData.oldFileUrl);

      if (!isFileChanged) {
        const updated = {
          file: formData.oldFileName,
          file_url: formData.oldFileUrl,
          title: formData.oldTitle,
          description: formData.description
        };

        await updateFileToProgramMateri(id, updated);

        setProgramMateri((prev) => ({
          ...prev,
          file: prev.file.map((f) =>
            f.file === formData.oldFileName ? updated : f
          ),
        }));

        setSuccess("Data berhasil diperbarui tanpa mengganti file.");
        resetFormData();
        setIsEditMode(false);
        return;
      }
      if (formData.file && !formData.useFileUrl) {
        const uploadedFile = await uploadFileProgramMateri(formData.file, folder);

        newFile = {
          file: uploadedFile.name,
          title: uploadedFile.file_name,
          file_url: uploadedFile.file_url,
          oldFileName: formData.oldFileName,
          description: formData.description,
        };
      }

      // ====== Jika URL diganti ======
      else if (formData.useFileUrl) {
        newFile = {
          file_url: formData.file_url,
          title: formData.file_url,
          file: null,
          oldFileName: formData.oldFileName,
          description: formData.description,
        };
      }
      await updateFileToProgramMateri("Program Materi", id, newFile);

      if (formData.oldFileName && newFile.file) {
        try {
          await deleteFileProgramMateri(id, formData.oldFileName);
        } catch (e) {
          console.error("Gagal hapus file lama:", e);
        }
      }
      setProgramMateri((prev) => ({
        ...prev,
        file: prev.file.map((f) =>
          f.file === formData.oldFileName ? newFile : f
        ),
      }));
    }

    setSuccess(`File berhasil ${isEditMode ? "diperbarui" : "ditambahkan"}!`);
    resetFormData();
    setIsEditMode(false);

  } catch (err) {
    setError(`Terjadi kesalahan: ${err.response?.data?.exception || err.message}`);
  } finally {
    setLoading(false);
  }
};

  /** Delete File */
const handleDeleteFile = async (fileName) => {
  setLoading(true);
  try {
    if (!fileName) {
      // Kalau fileName kosong, cukup hapus program materinya
      await removeFileProramMateri(id, fileName);
    } else {
      // Kalau ada fileName, hapus file-nya
      await removeFileProramMateri(id, fileName);
      await deleteFileProgramMateri(id, fileName);

      // Update state lokal
   
    }
       setProgramMateri((prevData) => ({
        ...prevData,
        file: prevData.file.filter((item) => item.file !== fileName),
      }));

    setSuccess("Data berhasil dihapus");
  } catch (error) {
    setError(`Terjadi kesalahan: ${error.message || "Tidak diketahui"}`);
  } finally {
    setLoading(false);
  }
};


  const handleClose = () => {
    resetFormData();
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
    setIsEditMode(false);
  };
const handleEdit = (data) => {
  setIsEditMode(true);

  setFormData({
    name: data.name ?? "",
    file: null,
    oldFileName: data.file ?? "",
    oldTitle: data.title ?? "",
    oldFileUrl: data.file_url ?? "",
    useFileUrl: data.file_url?.startsWith("http") ?? false,
    file_url: data.file_url.startsWith("http") ? data.file_url : "",
    description: data.description ?? "",
  });

  setIsOpen(true);
};


  /** Pagination */
  const filterFileProgramMateri = (search) =>
    programMateri?.file?.filter((item) =>
      (item.title ?? "").toLowerCase().includes(search.toLowerCase())
    ) || [];

  const totalPages = Math.ceil(filterFileProgramMateri(search).length / itemsPerPage);
  const coursePaginatedData = filterFileProgramMateri(search).slice(
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
    handleClose,
    handleOpen,
    handleEdit,
    handleDeleteFile,
    coursePaginatedData,
    totalPages,
    itemsPerPage,
    playTrack,
    driveExtensions,
    audioRefs,
    urlLink,
  };
};

export default useFileMateri;