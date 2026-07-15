import LandingPageLayout from "../../../layout/landing-page";
import {formatDateIndonesia } from "../../../helper/helper";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import HeadingSection from "../../../components/headingSection";
import { useGetStudentAttandance } from "../../../hooks/useGetStudentAttandance";
import FilterComponent from "../../../components/filterComponent";
import { Pagination, Spin } from "antd";

const HistoryAbsensi = () => {

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
  return (
  <LandingPageLayout title="History Attendance">
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
              className="bg-white border border-gray-200 shadow-md rounded-xl flex flex-col gap-4"
            >
           
              <div className="px-6 py-4 flex justify-between items-start">
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

            <div className="border-t border-2 border-red-800" />
              <div className="px-6 py-1 text-sm text-gray-700 space-y-2">
                  <p className="flex flex-col gap-1">
                <span className="font-bold mr-2">Point</span>
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
                </div></p>
                <p className="flex  flex-col">
                  <span className="font-bold">Nama Siswa</span>
                  {e.student_name ?? "-"}
                </p>

               <p className="flex flex-col">
                  <span className="font-bold">Program Enrollment</span>
                  {e.sg_program ?? "-"}
                </p>

               <p className="flex flex-col">
                  <span className="font-bold">Nama Guru </span>
                  {e.instructorlink_name ?? "-"}
                </p>
               
               <p className="flex flex-col">
                  <span className="font-bold text-underline">Waktu Absensi: </span>
                
                  <span>{formatDateIndonesia(e.creation) || "-"}</span>
                </p>
                  <div className="border-t border-2 border-red-800" />
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
          <div className="flex justify-center mt-10">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
               
                total={total}
                showSizeChanger={false}
                onChange={(page) => setCurrentPage(page)}
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} dari ${total} data`
                }
              />
            </div>
          </>
      ) : (
        <div className="w-full text-center py-3 bg-red-800 text-white rounded-lg font-bold">
          Tidak ada data ditemukan.
        </div>
      ))}

    </div>
  </LandingPageLayout>
);

};

export default HistoryAbsensi;
