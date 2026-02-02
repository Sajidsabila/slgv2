import { use, useEffect, useMemo, useState } from "react";
import LandingPageLayout from "../../../layout/landing-page";
import { convertDate, formatDateIndonesia } from "../../../helper/helper";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { methodGet } from "../../../api/apiMethod";
import HeadingSection from "../../../components/headingSection";



const HistoryAbsensi = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 9;

    useEffect(() => {
        const attendanceFromAPI = async () => {
            try{
                const response = await methodGet("Student Attendance");
                setAttendanceData(response?.data);
            }catch(error){
                console.error("Gagal ambil data absensi dari API:", error);
            }
        }
        attendanceFromAPI();
    }, [])
   
    const isInRange = (dateStr) => {
        if (!startDate && !endDate) return true;

        const date = new Date(dateStr);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if (start && date < start) return false;
        if (end && date > end) return false;

        return true;
    };

    const filteredData = useMemo(() => {
        return attendanceData?.filter((e) => {
            const searchContent = [
                e.sg_program,
                e.student_group,
                e.instructorlink_name,
                e.lesson,
                e.comment,
                e.video_url,
            ]
                .join(" ")
                .toLowerCase();
            const matchSearch = searchContent.includes(searchTerm.toLowerCase());

            return (
                matchSearch &&
                isInRange(e.schedule_date) &&
                isInRange(e.absensi_date)
            );
        });
    }, [attendanceData, searchTerm, startDate, endDate]);

    const totalPages = Math.max(1, Math.ceil(filteredData?.length / itemsPerPage));
    const paginatedData = filteredData?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

  return (
  <LandingPageLayout title="History Attendance">
    <div className="px-4 py-6 container mx-auto">
      <HeadingSection title="Student Attendance" image="/assets/smile_image/icon-1.png" />
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
            />
          </div>
          <input
            type="text"
            placeholder="Pencarian..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
          />
        </div>
      </div>

     
      <div className="flex justify-end mb-6">
        <div className="text-lg font-semibold">
          Total Data:{" "}
          <span className="text-gray-700 font-normal">{filteredData.length}</span>
        </div>
      </div>

      {paginatedData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedData.map((e, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 shadow-md rounded-xl p-6 flex flex-col gap-4"
            >
           
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {formatDateIndonesia(e.schedule_date) || "-"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {`${e.from_time} - ${e.to_time}`}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    e.status === "Present"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {e.status || "-"}
                </span>
              </div>

              <hr className="border-red-600 border-1" />

        
              <div className="text-sm text-gray-700 space-y-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) =>
                    i < e.growth_point ? (
                      <StarFilled
                        key={i}
                        style={{
                          color: "#D9A91A",
                          fontSize: "20px",
                          textShadow: "0 0 5px gold",
                        }}
                      />
                    ) : (
                      <StarOutlined
                        key={i}
                        style={{ color: "gray", fontSize: "20px" }}
                      />
                    )
                  )}
                </div>

                <p>
                  <span className="font-bold">Program Enrollment: </span>
                  {`${e.sg_program} -  ${e.instructorlink_name} ` || "-"}
                </p>
               
                <p>
                  <span className="font-bold">Waktu Absensi: </span>
                  <span className="font-bold">{formatDateIndonesia(e.creation)|| "-"}</span>
                </p>

                <hr className="border-red-600 border-1" />

         
                <div className="h-40 overflow-y-auto scrollbar space-y-3">
                  {e.video && (
                          <div>
                    <p className="font-extrabold">Video</p>
                    {e.video ? (
                      <a
                        href={e.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {e.video}
                      </a>
                    ) : (
                      "-"
                    )}
                  </div>
                  )}
              
                  {e.lesson && (
                       <div>
                    <p className="font-extrabold">Materi</p>
                    <pre className="block font-mono text-gray-800 whitespace-pre-wrap break-words">
                      {e.lesson || "-"}
                    </pre>
                  </div>
                    )}
               
                  {e.comment && (
                  <div>
                    <p className="font-extrabold">Catatan</p>
                    <pre className="block font-mono text-gray-800 whitespace-pre-wrap break-words">
                      {e.comment || "-"}
                    </pre>
                  </div>
                    )}
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">
          Tidak ada data ditemukan.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm rounded-md border transition ${
              currentPage === 1
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-slate-700 border-slate-600 hover:bg-slate-200"
            }`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => changePage(page)}
                className={`px-3 py-2 text-sm rounded-md border transition ${
                  currentPage === page
                    ? "bg-slate-600 text-white border-slate-600"
                    : "text-slate-700 border-slate-300 hover:bg-slate-200"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm rounded-md border transition ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-slate-700 border-slate-600 hover:bg-slate-200"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  </LandingPageLayout>
);

};

export default HistoryAbsensi;
