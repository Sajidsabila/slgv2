import { Pagination, Spin } from "antd";
import FilterComponent from "../components/filterComponent";
import HeadingSection from "../components/headingSection";
import { useCourseSchedule } from "../hooks/useCourseSchedule";
import { formatDateIndonesia } from "../helper/helper";
import LandingPageLayout from "../layout/landing-page";


const CourseSchdedule = () => {
  const {
    courseSchedule,
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
  } = useCourseSchedule();

  return (
    <LandingPageLayout>
      <div className="container mx-auto px-4 py-6">
        <HeadingSection
          title="Course Schedule"
          image="/assets/smile_image/icon-5.png"
        />

        <FilterComponent
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

         <div className="flex justify-end mb-5">
          <div className="text-lg font-semibold">
            Total Data:{" "}
            <span className="text-gray-700 font-normal">
              {total}
            </span>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Spin />
          </div>
        ) : courseSchedule.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
              {courseSchedule.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Header */}
                  <div className="px-5 py-4 flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {formatDateIndonesia(item.schedule_date)}
                      </h2>

                      <p className="text-sm text-gray-500">
                        {item.from_time} - {item.to_time}
                      </p>
                    </div>

                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold bg-red-800 text-white">
                      {item.status || "-"}
                    </span>
                  </div>

                  <div className="border-t-2 border-red-800 my-4" />

                  {/* Detail */}
                  <div className="px-5 py-2 space-y-2 text-sm">
                    <div>
                      <p className="text-gray-500">Program</p>
                      <p className="font-medium text-gray-800">
                        {item.program || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">Nama Guru</p>
                      <p className="font-medium text-gray-800">
                        {item.instructor_name || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Ruangan</p>
                      <p className="font-medium text-gray-800">
                        {item.room || "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">Absensi</p>
                      <p className="font-medium text-gray-800">
                        {item.attendance_status || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
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
          <div className="text-center py-16 text-gray-500">
            Tidak ada data ditemukan.
          </div>
        )}
      </div>
    </LandingPageLayout>
  );
};

export default CourseSchdedule;