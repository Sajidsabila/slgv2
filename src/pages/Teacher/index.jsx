import LandingPageLayout from "../../layout/landing-page";
import { useEffect, useState, useMemo } from "react";
import { methodGet } from "../../api/apiMethod";
import { formatDateIndonesia } from "../../helper/helper";
import { Modal } from "antd";
import { getDoctypeDetail } from "../../api/apiPublic";
import { urlLink } from "../../config/config";
import HeadingSection from "../../components/headingSection";

const IndexTeacher = () => {
  const [instructor, setInstructor] = useState([]);
  const [student, setStudent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentDetail, setStudentDetail] = useState([]);

  const itemsPerPage = 9;

  const defaultImage = "/propic.png";

  const showModal = async (id) => {
    setIsModalOpen(true);

    try {
      const response = await getDoctypeDetail("Student", id);
      setStudentDetail(response);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // GET Teacher Profile
  useEffect(() => {
    const getTeacherProfile = async () => {
      try {
        const response = await methodGet("Instructor");
        setInstructor(response.data[0]);
      } catch (e) {
        console.log(e);
      }
    };

    getTeacherProfile();
  }, []);

  // GET Student List
  useEffect(() => {
    const getStudentList = async () => {
      try {
        const response = await methodGet("Student");
        setStudent(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getStudentList();
  }, []);

  // Search + Filter
  const filteredData = useMemo(() => {
    return student.filter((item) => {
      const searchContent = [item.name, item.full_name].join(" ").toLowerCase();

      return searchContent.includes(searchTerm.toLowerCase());
    });
  }, [student, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <LandingPageLayout>
      <div className="container mx-auto px-4">
        {/* TEACHER PROFILE CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
          <div className="rounded-lg shadow-md overflow-hidden">
            <div className="card-header bg-red-800 py-2 px-3 text-white font-medium text-lg">
              Teacher Profile
            </div>

            <div className="card-body px-3 bg-white py-3 font-medium flex flex-col gap-2">
              <p>
                <span className="font-bold">Teacher ID : </span>
                <span className="font-medium">{instructor.name}</span>
                {instructor.length > 0 &&
                  instructor.map((item) => item.name).join(", ")}
              </p>
              <p>
                <span className="font-bold">Teacher Name : </span>
                <span className="font-medium">
                  {instructor.instructor_name}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* HEADER STUDENT LIST */}
        <HeadingSection
          title="Student List"
          image="/assets/smile_image/icon-5.png"
        />

        {/* SEARCH INPUT */}
        <div className="flex lg:flex-row flex-col gap-3 justify-between font-semibold text-lg py-2">
          <input
            type="text"
            placeholder="searching ..."
            className="lg:w-80 w-full bg-white px-4 py-2 rounded-lg focus:outline-none"
            autoFocus={true}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <p>
            Total Data: <span className="font-bold">{filteredData.length}</span>
          </p>
        </div>

        {/* CARD LIST */}
        {paginatedData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedData.map((item) => (
              <div
                key={item.name}
                className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    {item.name || "-"}
                  </h2>

                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status || "-"}
                  </span>
                </div>

                <hr className="my-4 border-red-900 border-2" />

                <div className="flex flex-col py-2 gap-2">
                  <>
                    <p className="text-sm text-gray-500 font-medium">
                      Student Full Name :{" "}
                      <span className="font-medium">
                        {item.first_name || "-"}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                      Joining Date:{" "}
                      <span className="font-medium">
                        {formatDateIndonesia(item.joining_date) || "-"}
                      </span>
                    </p>
                  </>
                </div>

                <button
                  onClick={() => showModal(item.name)}
                  className="w-full bg-green-700 py-2 rounded-full text-white text-center font-bold hover:bg-green-800 transition-all my-2 cursor-pointer"
                >
                  Lihat Detail
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-6">
            Tidak ada data ditemukan.
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
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
              ),
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
      <Modal
        title="Student Detail"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <div className="flex justify-center items-center">
          <img
            className="w-50 rounded-lg py-3"
            src={`${studentDetail.image ? urlLink.url + "/" + studentDetail.image : defaultImage} `}
          />
        </div>

        <div className="flex flex-col my-6 gap-2">
          <div className="flex flex-row gap-2 justify-between">
            <span className="font-bold"> Student ID </span>
            <span className="font-medium">{studentDetail.name}</span>
          </div>
          <div className="name">
            <p className="flex flex-row gap-2 justify-between">
              <span className="font-bold"> Student Full Name </span>
              <span className="font-medium">
                {studentDetail.first_name + " " + studentDetail.last_name}
              </span>
            </p>
          </div>

          <div className="flex flex-row gap-2 justify-between">
            <span className="font-bold"> Email : </span>
            <span className="font-medium">
              {studentDetail.student_email_id}
            </span>
          </div>

          <div className="flex flex-row gap-2 justify-between">
            <span className="font-bold">Student Mobile Phone : </span>
            <span className="font-medium">
              {studentDetail.student_mobile_number}
            </span>
          </div>

          <div className="flex flex-row gap-2 justify-between">
            <span className="font-bold">Joining Date: </span>
            <span className="font-medium">
              {formatDateIndonesia(studentDetail.joining_date)}
            </span>
          </div>

          <div className="flex flex-row gap-2 justify-between">
            <span className="font-bold">Status </span>
            <span className="font-medium">{studentDetail.status}</span>
          </div>

          {/* <div className="flex flex-row gap-2 justify-between">
          <span className="font-bold">Program{" "} </span>
          <span className="font-medium">{studentDetail.status}</span>
        </div> */}
        </div>
      </Modal>
    </LandingPageLayout>
  );
};

export default IndexTeacher;
