import LandingPageLayout from "../../layout/landing-page";
import {useState} from "react";
import { formatDateIndonesia } from "../../helper/helper";
import { Modal, Spin, Pagination } from "antd";
import { getDoctypeDetail} from "../../api/apiResourceUser";
import { urlLink } from "../../config/config";
import HeadingSection from "../../components/headingSection";
import {useTeacherProfile} from "../../hooks/useTeacherProfile";

const IndexTeacher = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentDetail, setStudentDetail] = useState([]);
  const { 
        teacher, 
        studentList, 
        searchTerm, 
        setSearchTerm, 
        loading, 
        currentPage, 
        pageSize, 
        total, 
        setCurrentPage,
  } = useTeacherProfile();
  console.log(teacher);
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
  return (
    <LandingPageLayout>
      <div className="container mx-auto px-4">
        {/* TEACHER PROFILE CARD */}
            <section>
            <HeadingSection
              title="Profil Orang Tua"
              image="/assets/smile_image/icon-6.png"
            />
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mt-5">
              <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center text-red-700 text-3xl font-bold shrink-0">
                {(teacher?.name || "S").charAt(0).toUpperCase()}
                </div>

                {/* Data Orang Tua */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                  <div>
                    <p className="text-sm text-gray-500">Nama Lengkap</p>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {teacher.name}
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <h3 className="font-semibold text-lg text-gray-800 break-all">
                      {teacher.name}
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">No. Telepon</p>
                    <h3 className="font-semibold text-lg text-gray-800">
                     {teacher.name}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </section>

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
            Total Data: <span className="font-bold">{total}</span>
          </p>
        </div>

        {/* CARD LIST */}
        {loading ? (
        <div className="flex justify-center py-20">
            <Spin />
          </div>
        )
        : 
        (
         studentList.length > 0 ? (
          <>
       
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentList.map((item) => (
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
          <div className="text-center text-gray-500 py-6">
            Tidak ada data ditemukan.
          </div>
        )
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
        </div>
      </Modal>
    </LandingPageLayout>
  );
};

export default IndexTeacher;
