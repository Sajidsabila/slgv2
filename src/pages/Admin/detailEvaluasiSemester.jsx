import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import AdminLayout from "../../layout/admin-layout";
import { Pencil, Trash } from "lucide-react";
import { urlLink } from "../../config/config";
import { apiResourceAdminDetail } from "../../api/apiResourceAdmin";

const DetailEvaluasiSemester = () => {
  const { id } = useParams();
   
      
    const [student, setStudentDetail] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("");

    const audioRefs = useRef([]);


    const itemsPerPage = 5;
    useEffect(() => {
      if (!id) return;

      const fetchData = async () => {
          try {
              const response = await apiResourceAdminDetail({ doctype: "Student", id });
              setStudentDetail(response);
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


    const filterFileProgramMateri = (search) => {
            return student?.file?.filter((item) =>
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
       
            <h3 className="font-bold text-lg py-5 text-center md:text-left">Detail Evaluasi Semester</h3>
            <div className="w-full p-6 bg-white rounded-xl shadow-lg relative overflow-y-auto h-auto">

                {student && (
                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <p className="font-extrabold text-gray-700">ID Siswa</p>
                                <p className="text-gray-900">{student.name}</p>
                            </div>

                            <div className="flex flex-col">
                                <p className="font-extrabold text-gray-700">Nama Siswa</p>
                                <p className="text-gray-900">{student.title ?? "Kosong"}</p>
                            </div>

                   
                        </div>

                        <div>
                          
                            <div className="mt-2 space-y-3 relative overflow-x-auto">
                            <div className="flex flex-col md:flex-row md:justify-between gap-2">

                            <button  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow">
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
                    
                    {fileType === "pdf" && (
                      <a href={`${urlLink.url}/${fileItem.file_url}`} target="_blank" rel="noopener noreferrer">
                        <img src="/pdf.png" alt="PDF Icon" className="w-8 h-8" />
                      </a>
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
        {student?.file && student.file.length > itemsPerPage && (
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
                            <Link to="/admin/evaluasi-semester" className="bg-slate-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow">
                                Kembali
                            </Link>
                           
                        </div>
            </div>
        </AdminLayout>
    );
};

export default DetailEvaluasiSemester;
