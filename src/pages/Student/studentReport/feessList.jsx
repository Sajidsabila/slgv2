import { useState} from "react";
import LandingPageLayout from "../../../layout/landing-page";
import { currencyFormat } from "../../../helper/helper";
import { Button, Modal } from "antd";
import { formatDateIndonesia } from "../../../helper/helper";
import HeadingSection from "../../../components/headingSection";
import FilterComponent from "../../../components/filterComponent";
import { apiMethodPost } from "../../../api/apiMethod";
import { useFees } from "../../../hooks/useFees";
import { Spin, Pagination} from "antd";

const FeesList = () => {
   const {
    fees,
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
  } = useFees();
  console.log(fees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail, setDetail] = useState(null);

 

  const openModal = async (name) => {
    try{
      const resPaymentEntry = await apiMethodPost({name_fees: name});
      setDetail(resPaymentEntry.message);
      console.log("ini detail",detail);
      setIsModalOpen(true);
    }catch(err){
      console.log(err);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setDetail(null);
  };

  return (
    <LandingPageLayout>
      <div className="px-4 py-6 container mx-auto">
        <HeadingSection
          title="Fees List"
          image="/assets/smile_image/icon-6.png"
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

        {loading ? (
            <div className="flex justify-center py-20">
            <Spin />
          </div>
        ) : (
        fees.length > 0 ? (
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fees.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 pb-4 flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      SPP{" "}
                      {item.due_date
                        ? `${new Date(item.due_date).toLocaleString("id-ID", {
                            month: "long",
                          })} ${new Date(item.due_date).getFullYear()}`
                        : "-"}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.name || "-"}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status || "-"}
                  </span>
                </div>

                <div className="border-t border-2 border-red-800" />

                {/* Body */}
                <div className="p-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">Nomor Tagihan</span>
                      <span className="font-medium text-gray-800 text-right">
                        {item.name || "-"}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">Nama Siswa</span>
                      <span className="font-medium text-gray-800 text-right">
                        {item.student_name || "-"}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">Jatuh Tempo</span>
                      <span className="font-medium text-gray-800 text-right">
                        {formatDateIndonesia(item.due_date)}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">Status Document</span>
                      <span
                        className={`font-semibold ${
                          item.docstatus === 1
                            ? "text-green-700"
                            : "text-red-800"
                        }`}
                      >
                        {item.docstatus === 1 ? "Submit" : "Draft"}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 border-t pt-3">
                      <span className="text-gray-500">Grand Total</span>
                      <span className="font-bold text-lg text-red-700">
                        {currencyFormat(item.grand_total)}
                      </span>
                    </div>
                  </div>
                  {/* Button */}
                  {item.docstatus !== 0 ? (
                    <button
                      onClick={() => openModal(item.name)}
                      className="w-full mt-6 py-3 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 transition-all cursor-pointer"
                    >
                      Lihat Detail
                    </button>
                  ) : (
                    <div className="w-full mt-6 py-3 rounded-xl bg-red-800 text-white text-center font-semibold">
                      Status Document Draft
                    </div>
                  )}
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
        )
        )}
       
      </div>
      <Modal
        title="Detail Tagihan"
        open={isModalOpen}
        onOk={closeModal}
        onCancel={closeModal}
        footer={null}
      >
        {detail ? (
          <div className="w-full my-4">
            <div className="flex justify-between items-start ">
              <h2 className=" font-bold text-gray-800">
                SPP{" "}
                {detail.due_date
                  ? `${new Date(detail.due_date).toLocaleString("id-ID", {
                      month: "long",
                    })} ${new Date(detail.due_date).getFullYear()}`
                  : "-"}
              </h2>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  detail.status === "Paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {detail.status || "-"}
              </span>
            </div>
            <hr className="my-2 border-red-900" />

            <div className="flex flex-col py-2 gap-2 ms-4">
              <p className="text-sm">
                Nomor Tagihan :{" "}
                <span className="font-medium">SPP {detail.name || "-"}</span>
              </p>
              <p className="text-sm">
                Grand Total :{" "}
                <span className="font-medium">
                  {currencyFormat(detail.grand_total)}
                </span>
              </p>
              <p className="text-sm">
                Total Terbayar :{" "}
                <span className="font-medium text-green-600">
                  {currencyFormat(
                    detail.grand_total - detail.outstanding_amount,
                  )}
                </span>
              </p>
              <p className="text-sm ">
                Sisa Tagihan :{" "}
                <span className="font-medium text-red-600">
                  {currencyFormat(detail.outstanding_amount)}
                </span>
              </p>
              <hr className="mt-2 border-red-900 border-2" />
              <p className="font-bold">History Pembayaran</p>

              {detail.payment_entry.length > 0 ? (
                detail.payment_entry.map((item, index) => (
                  <div
                    key={index}
                    className="w-full bg-red-800 h-20 rounded-xl"
                  >
                    <div className="flex flex-col  justify-center h-full gap-2">
                      <p className="text-sm ms-6  text-white font-semibold">
                        Tanggal Pembayaran :{" "}
                        {formatDateIndonesia(item.posting_date)}
                      </p>
                      <p className="text-sm ms-6 text-white font-semibold">
                        Jumlah Pembayaran : {currencyFormat(item.paid_amount)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm bg-red-800 py-4 rounded-xl text-white text-center sans-serif">
                  Belum ada pembayaran
                </p>
              )}
            </div>
          </div>
        ) : (
          <p>Data tidak tersedia</p>
        )}

        <div className="flex justify-end mt-4">
          <Button onClick={closeModal} color="danger" variant="solid">
            Tutup
          </Button>
        </div>
      </Modal>
    </LandingPageLayout>
  );
};

export default FeesList;
