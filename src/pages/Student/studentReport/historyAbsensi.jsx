import LandingPageLayout from "../../../layout/landing-page";
import { formatDateIndonesia } from "../../../helper/helper";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import HeadingSection from "../../../components/headingSection";
import { useGetStudentAttandance } from "../../../hooks/useGetStudentAttandance";
import FilterComponent from "../../../components/filterComponent";
import { Pagination, Spin, Modal } from "antd";
import { useEffect, useState } from "react";
import { getDataResource, postByUser } from "../../../api/apiResourceUser";
import { SendIcon } from "lucide-react";

const HistoryAbsensi = () => {
  const [open, setOpen] = useState(false);
  const [attandanceId, setAttandanceId] = useState('');
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);

  const {
    studentAttandance,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    searchTerm,
    setSearchTerm,
    loading,
    currentPage,
    setCurrentPage,
    pageSize,
    total,
  } = useGetStudentAttandance();

  const getMail = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).email : '';

  const sendComment = async (e) => {
    e.preventDefault(); 
    
    if (!comment) return alert("Please enter your comment");
    
    try {
      const data = {
        reference_doctype: "Student Attendance", 
        comment_type: "Comment",
        reference_name: attandanceId,
        content: comment,
        comment_main: getMail, // Sesuaikan field ini dengan struktur database Anda
      };
      const response = await postByUser('Comment', data);
      console.log(response);
      setComment(''); 
      getComment(attandanceId); 
    } catch(error) {
      console.error(error);
    }
  };

  const getComment = async (id) => {
    if(!attandanceId) return
    try {
const response = await getDataResource('Comment', { reference_name: id }, ["*"], 'asc');
      setCommentList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getComment(attandanceId);
  }, [attandanceId]);

  const showModal = (id) => {
    setAttandanceId(id)
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setAttandanceId('');  
    setComment('');
  };

  return (
    <LandingPageLayout title="History Attendance">
      <>
        <div className="px-4 py-6 container mx-auto">
          <HeadingSection title="Student Attendance" image="/assets/smile_image/icon-1.png" />
        
          <FilterComponent
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
            
          <div className="flex justify-end mb-6">
            <div className="text-lg font-semibold">
              Total Data:{" "}
              <span className="text-gray-700 font-normal">{total}</span>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Spin />
            </div>
          ) : (
            studentAttandance.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {studentAttandance.map((e, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-xl flex flex-col overflow-hidden"
                    >
                      {/* 1. HEADER */}
                      <div className="px-5 py-4 flex justify-between items-start bg-gray-50/50 border-b border-gray-100">
                        <div>
                          <h2 className="text-base sm:text-lg font-bold text-gray-800">
                            {formatDateIndonesia(e.schedule_date) || "-"}
                          </h2>
                          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                            {`${e.from_time} - ${e.to_time}`}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-full border ${
                            e.status === "Present"
                              ? "bg-green-800 text-white "
                              : "bg-red-800 text-white"
                          }`}
                        >
                          {e.status || "-"}
                        </span>
                      </div>

                      <div className="border-t border-2 border-red-800" />
                      
                      {/* 2. BODY DETAIL */}
                      <div className="px-5 py-4 grid grid-cols-2 gap-x-4 gap-y-3">
                        <div className="col-span-2 flex items-center justify-between bg-red-800 p-2.5 rounded-lg border border-yellow-100">
                          <span className="text-white text-xs font-extrabold uppercase tracking-wider">
                            Point Growth
                          </span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) =>
                              i < e.growth_point ? (
                                <StarFilled key={i} className="text-lg sm:text-xl shadow-md" style={{ color: "gold"}} />
                              ) : (
                                <StarOutlined key={i} className="text-yellow-400 text-lg sm:text-xl" style={{ color: "white" }} />
                              )
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <span className="text-[11px] font-extrabold uppercase tracking-wide">Nama Siswa</span>
                          <span className="text-sm font-medium text-gray-800">{e.student_name ?? "-"}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-extrabold uppercase tracking-wide">Program</span>
                          <span className="text-sm text-gray-800">{e.sg_program ?? "-"}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-extrabold tracking-wide">Nama Guru</span>
                          <span className="text-sm text-gray-800">{e.instructorlink_name ?? "-"}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-extrabold uppercase tracking-wide">Waktu Absensi</span>
                          <span className="text-sm text-gray-800">{formatDateIndonesia(e.creation) || "-"}</span>
                        </div>
                      </div>

                      {/* 3. KONTEN (Materi, Catatan, Video) */}
                      <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/30 max-h-48 overflow-y-auto custom-scrollbar space-y-4">
                        {e.video_url && (
                          <div>
                            <span className="text-[11px] font-extrabold uppercase tracking-wide block mb-1">Video Link</span>
                            <a href={e.video_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline break-all">
                              {e.video_url}
                            </a>
                          </div>
                        )}
                        {e.lesson && (
                          <div>
                            <span className="text-[11px] font-extrabold uppercase tracking-wide block mb-1">Materi</span>
                            <div className="text-sm text-gray-800 whitespace-pre-wrap break-words leading-relaxed">
                              {e.lesson}
                            </div>
                          </div>
                        )}
                        {e.comment && (
                          <div>
                            <span className="text-[11px] font-extrabold uppercase tracking-wide block mb-1">Catatan</span>
                            <div className="text-sm text-gray-800 whitespace-pre-wrap break-words leading-relaxed">
                              {e.comment}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 4. AKSI / TOMBOL KOMENTAR */}
                      <div className="px-5 py-4 mt-auto border-t border-gray-100 bg-white">
                        <button
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 px-4 rounded-xl transition-colors duration-200 focus:ring-4 focus:ring-blue-100 hover:cursor-pointer"
                          onClick={() => showModal(e.name)}
                        >
                          Komentar
                        </button>
                        <p className="text-xs text-gray-400 text-center mt-2">
                          *Berikan Komentar Daily Report*
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-10">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={total}
                    showSizeChanger={false}
                    onChange={(page) => setCurrentPage(page)}
                    showTotal={(total, range) => `${range[0]}-${range[1]} dari ${total} data`}
                  />
                </div>
              </>
            ) : (
              <div className="w-full text-center py-3 bg-red-800 text-white rounded-lg font-bold">
                Tidak ada data ditemukan.
              </div>
            )
          )}
        </div>

        {/* MODAL KOMENTAR */}
        <Modal
          title={<span className="text-lg font-bold text-gray-800">Komentar Daily Report</span>}
          open={open}
          onCancel={handleCancel}
          footer={null} 
          centered
          width={550}
        >
          <div className="mt-4">
            {/* Area Chat */}
            <div className="flex flex-col w-full h-[350px] bg-slate-50 border border-gray-200 rounded-xl overflow-y-auto p-4 space-y-4 shadow-inner">
              {commentList.length > 0 ? (
                commentList.map((comment, index) => {
                  const isUser = comment.comment_main === getMail || comment.owner === getMail; 
                  
                  return (
                    <div key={index} className={`flex flex-col max-w-[85%] ${isUser ? "self-end" : "self-start"}`}>
                      <span className={`text-[10px] text-gray-500 mb-1 ${isUser ? "text-right mr-1" : "ml-1 font-semibold"}`}>
                        {isUser ? "Anda" : "Guru"} • {formatDateIndonesia(comment.creation) || comment.creation}
                      </span>
                      <div 
                        className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm break-words ${
                          isUser
                            ? "bg-blue-600 text-white rounded-tr-sm" 
                            : "bg-white border border-gray-200 text-gray-800 rounded-tl-sm"
                        }`}
                      >
                        {comment.content}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-white font-medium text-sm bg-red-800 px-4 py-1.5 rounded-full">
                    Belum ada komentar
                  </span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={sendComment} className="mt-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  className="flex-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 outline-none transition-all shadow-sm"
                  placeholder="Tulis  komentar..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-200 focus:ring-4 focus:ring-blue-200 hover:cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  type="submit"
                  disabled={!comment.trim()}
                >
                  <SendIcon size={18} className="ml-0.5" />
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </>
    </LandingPageLayout>
  );
};  

export default HistoryAbsensi;