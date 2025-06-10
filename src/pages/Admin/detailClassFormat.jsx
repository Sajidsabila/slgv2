import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import AdminLayout from "../../layout/admin-layout";
import { getProgramMateriById, 
  uploadFileProgramMateri,
   addFileToProgramMateri, 
   removeFileProramMateri,
   deleteFileProgramMateri,
   updateFileToProgramMateri} from "../../api/apiProgramMateri";
import Modal from "../../components/Modal/modal";
import InputModal from "../../components/InputModal";
import { motion } from "framer-motion";
import { Pencil, Trash } from "lucide-react";

const DetailClassFormat = () => {
    const { id } = useParams();
    const [programMateri, setProgramMateri] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ file: null, name: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1)
  const [isEditMode, setIsEditMode] = useState(false);
    const [search, setSearch] = useState("");
    const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
    const audioRefs = useRef([]);


    const itemsPerPage = 5;
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
    const playTrack = (index) => {
    
      audioRefs.current.forEach((audio, i) => {
          if (audio && i !== index) {
              audio.pause();
              audio.currentTime = 0;
          }
      });
      setCurrentTrackIndex(index);
      if (audioRefs.current[index]) {
          audioRefs.current[index].play();
      }
  };

    // Handle perubahan file
    const handleChange = (e) => {
      const { name, value, type, files } = e.target;
  
      setFormData((prevForm) => ({
          ...prevForm,
          [name]: type === "file" ? files[0] || prevForm.oldFileName : value,
      }));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.file && !isEditMode && !formData.oldFileName) {
      alert("File masih kosong!");
      return;
    }
    const file = formData.file;

    if (file) {
      const filType = ["audio/mpeg", "video/mp4", "audio/mp3", "wav"];
    
      if (!filType.includes(file.type)) {
        alert("File harus berformat MP3 atau MP4!");
        return;
      }
    
      const fileTitle = file.name.toLowerCase();
    
      const duplicateFile = programMateri?.file?.some(
        (item) => item.title?.toLowerCase() === fileTitle
      );
    
      if (duplicateFile) {
        alert("Maaf, program materi sudah ada!");
        return;
      }
    }
    try {
        setLoading(true);
        setIsOpen(false);

        let newFile = null;
        const folder = `Home/Program Materi/${programMateri.abbr_course}/${programMateri.abbr_format}/${programMateri.abbr_grade}`;

        if (!isEditMode) {
            const uploadedFile = await uploadFileProgramMateri(formData.file, folder);
            if (!uploadedFile?.name) throw new Error("File tidak dikembalikan oleh server.");

            newFile = {
                file: uploadedFile.name,
                title: uploadedFile.file_name,
                file_url: uploadedFile.file_url
            };

            await addFileToProgramMateri(id, newFile);
            setProgramMateri(prev => ({
                ...prev,
                file: [...(prev.file || []), newFile]
            }));
        }

        if (isEditMode) {
            if (!formData.file || formData.file === "") {
                newFile = {
                    file: formData.oldFileName || "",
                    title: formData.oldTitle || "",
                    file_url: formData.oldFileUrl || "",
                    oldFileName: formData.oldFileName || ""
                };
            } else {
                const uploadedFile = await uploadFileProgramMateri(formData.file, folder);
                if (!uploadedFile?.name) throw new Error("File tidak dikembalikan oleh server.");

                newFile = {
                    file: uploadedFile.name,
                    title: uploadedFile.file_name,
                    file_url: uploadedFile.file_url,
                    oldFileName: formData.oldFileName || ""
                };
            }

            const update = await updateFileToProgramMateri(id, newFile);

           
                if (formData.oldFileName && update) {
                    try {
                        await deleteFileProgramMateri(id, formData.oldFileName);
                    } catch (deleteError) {
                        console.error("Gagal menghapus file:", deleteError);
                    }
                }
            

            setProgramMateri(prev => ({
                ...prev,
                file: (prev.file || []).map(file =>
                    file.file === formData.oldFileName ? newFile : file
                )
            }));
        }

        const updatedData = await getProgramMateriById(id);
        setProgramMateri(updatedData);

        setLoading(false);
        setSuccess(`File berhasil ${isEditMode ? "diperbarui" : "ditambahkan"}!`);

        setFormData({ file: null, oldFileName: "", oldTitle: "", oldFileUrl: "" });
        setIsEditMode(false);
    } catch (error) {
        setLoading(false);
        setError(`Terjadi kesalahan: ${error.response.data.exception || error.message}`);
        setSuccess("");
    }
};
    const handleDeleteFile = async (fileName) => {
      setLoading(true);
      try {
          await removeFileProramMateri(id, fileName);
          await deleteFileProgramMateri(id, fileName);
          setProgramMateri((prevData) => ({
              ...prevData,
              file: prevData.file.filter((item) => item.file !== fileName),
          }));
          setLoading(false)
          setSuccess("Data Berhasil dihapus");
      } catch (error) {
        setLoading(false)
          setError(`Terjadi kesalahan: ${error.message || "Tidak diketahui"}`);
      }
  };
    const handleClose = () => {
        setFormData({ file: null });
        setIsOpen(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
        setIsEditMode(false);
    };
    const handleEdit = (data) => {
      setIsEditMode(true);
      setFormData({
          name: data.name || "",
          file: null,  // Kosongkan file baru saat edit
          oldFileName: data.file || "",  // Pastikan ini mengambil nama file lama
          oldTitle: data.title || "",
          oldFileUrl: data.file_url || ""
      });
      setIsOpen(true);
  };
    const filterFileProgramMateri = (search) => {
      return programMateri?.file?.filter((item) =>
       (item.title ?? '').toLowerCase().includes(search.toLowerCase())
    ) || [];
    };
    const totalPages = Math.ceil(filterFileProgramMateri(search).length / itemsPerPage);

    const coursePaginatedData = filterFileProgramMateri(search).slice(
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
                    {loading && (
        <motion.div
          className="flex flex-col items-center justify-center bg-transparent p-6 rounded-lg shadow-md"
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
            <Modal isOpen={isOpen} onClose={handleClose} titleModal={isEditMode ? "Edit File Materi" : "Add File Materi"} onSubmit={handleSubmit}>
              {isEditMode && (
                <InputModal
                  type="hidden"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              )}
                <InputModal label="File" type="file" name="file" onChange={handleChange} />
                {isEditMode && (
                  <p className="font-semibold text-sm py-2">Note : Kosongkan file jika tidak ingin diubah atau langsung klik Cancel</p>
                )}
            </Modal>
  

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
    coursePaginatedData.map((fileItem, index) => {

      const fileType = fileItem.title.split(".").pop()?.toLowerCase();
      return (
          <tr key={index} className="bg-white border-b hover:bg-gray-50">
            <td className="px-4 py-2 text-center border border-gray-300">
            {(currentPage - 1) * itemsPerPage + index + 1}
            </td>
            <td className="px-4 py-2 font-medium border border-gray-300">{fileItem.title}</td>
            <td className="px-4 py-2 border border-gray-300">
          {(fileType === "mp3" || fileType === "wav") && (
                <audio
              ref={(el) => (audioRefs.current[index] = el)}
              controls className="w-full"
              onPlay={() => playTrack(index)}>
                <source
              
                src={`${import.meta.env.VITE_SISTER_URL}/${fileItem.file_url}`}
                type="audio/mpeg"
                
                />
                Browser Anda tidak mendukung pemutar audio.
              </audio>
          )}

          {fileType === "mp4" && (
             <video
             ref={(el) => (audioRefs.current[index] = el)}
             controls
             className="w-60 h-40"
             onPlay={() => playTrack(index)}
           >
             <source
               src={`${import.meta.env.VITE_SISTER_URL}/${fileItem.file_url}`}
               type="video/mp4"
             />
             Browser Anda tidak mendukung pemutar video.
           </video>
           
          )}
          
            </td>
            <td className="px-4 py-2 flex flex-row gap-2 text-center border border-gray-300">
              <button
                className="bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 flex items-center gap-1 px-3 py-1 rounded-md"
                onClick={() => {
                  if(window.confirm("Apakah Anda yakin ingin menghapus file ini?")) 
                   handleDeleteFile(fileItem.file)}}
              >
                 <Trash size={16}/>
                
                Hapus
              </button>
              <button
                className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200 hover:text-yellow-800 flex items-center gap-1 px-3 py-1 rounded-md"
                onClick={() => {
                   handleEdit(fileItem)}}
              >
                   <Pencil size={16}/>
              Edit
              </button>
            </td>
          </tr>
        )
})
      ) : (
        <tr>
          <td colSpan="4" className="px-4 py-3 text-center text-gray-500 italic border border-gray-300">
            Tidak ada data
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