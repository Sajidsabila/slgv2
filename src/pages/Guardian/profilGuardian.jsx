import LandingPageLayout from "../../layout/landing-page";
import HeadingSection from "../../components/headingSection";
import { useProfilGuardian } from "../../hooks/useProfilGuardian";
import { Modal } from "antd";
import { useState } from "react";
import { urlLink } from "../../config/config";
import { formatDateIndonesia, firstLetterFunction} from "../../helper/helper";
import { getDoctypeDetail } from "../../api/apiPublic";

const ProfilGuardian = () => {
  const  {profil, listChildren, loading} = useProfilGuardian();
   const [isModalOpen, setIsModalOpen] = useState(false);
    const [studentDetail, setStudentDetail] = useState({});
  const showModal = async (id) => {
    setIsModalOpen(true);

    try {
      const response = await getDoctypeDetail("Student", id);
      console.log(response);
      setStudentDetail(response);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setStudentDetail({});
  };


  return (
    <LandingPageLayout>
      <div className="container mx-auto px-4 py-10">
        <div className="space-y-10">
          {/* Profil Orang Tua */}
          {loading && <div>Loading...</div>}
          {!loading && <>
           <section>
            <HeadingSection
              title="Profil Orang Tua"
              image="/assets/smile_image/icon-6.png"
            />

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mt-5">
              <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center text-red-700 text-3xl font-bold shrink-0">
                  {firstLetterFunction(profil.guardian_name)}
                </div>

                {/* Data Orang Tua */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                  <div>
                    <p className="text-sm text-gray-500">Nama Lengkap</p>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {profil.guardian_name}
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <h3 className="font-semibold text-lg text-gray-800 break-all">
                      {profil.email_address}
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">No. Telepon</p>
                    <h3 className="font-semibold text-lg text-gray-800">
                     {profil.mobile_number}
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Jumlah Anak</p>
                    <h3 className="font-semibold text-lg text-red-700">
                      {listChildren.length} Anak
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Data Anak */}
          <section>
            <HeadingSection
              title={`Data Anak (${listChildren.length} Anak)`}
              image="/assets/smile_image/icon-6.png"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-5">
              {listChildren.map((child) => (
                <div
                  key={child.id}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Header Card */}
                  <div className="bg-red-800 p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center font-bold text-lg">
                          {firstLetterFunction(child.name)}
                        </div>

                        <div>
                          <h3 className="font-semibold text-white">
                            {child.name}
                          </h3>

                        </div>
                      </div>

                      <span className="bg-white text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {child.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Nama lengkap</span>

                        <span className="font-medium text-gray-800">
                          {child.first_name} {child.last_name}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Point Reward</span>

                        <span className="font-semibold text-red-700">
                          {child.point} Point
                        </span>
                      </div>
                    </div>

                    {/* Button */}
                    <button onClick={() => showModal(child.name)} className="w-full mt-6 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-medium transition-all duration-300 hover:cursor-pointer">
                      Lihat Detail 
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
          </>}
         
        </div>
      </div>

      <Modal
        title="Student Detail"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <div className="flex justify-center items-center">
          {studentDetail.image  ? ( 
         <img
            className="w-50 rounded-lg py-3"
            src={ urlLink.url + "/" + studentDetail.image}
          />
          ) : 
          <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center text-red-700 text-3xl font-bold shrink-0">
                {(studentDetail?.name || "S").charAt(0).toUpperCase()}
          </div>
}
         
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

export default ProfilGuardian;