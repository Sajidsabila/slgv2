import { useState, useEffect, useMemo } from "react";
import LandingPageLayout from "../../layout/landing-page";
import { currencyFormat } from "../../helper/helper";
import { Button, Modal } from "antd";
import { useResourceGet } from "../../api/useResource";

const FeesList = () => {
  const [feesList, setFeesList] = useState([]);
  const [paymentEntry, setPaymentEntry] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail, setDetail] = useState(null);

  const itemsPerPage = 9;

  useEffect(() => {
    const getFeesFromApi = async () => {
      try {
        const response = await useResourceGet("Fees");
        setFeesList(response);
      } catch (error) {
        console.error("Error fetching fees:", error);
      }
    };
    getFeesFromApi();
  }, []);

  useEffect(() => {
    const getPaymentFromApi = async () => {
      try {
        const response = await useResourceGet("Payment Entry");
        setPaymentEntry(response);
      } catch (error) {
        console.error("Error fetching payment entry:", error);
      }
    };
    getPaymentFromApi();
  }, []);

  const isInRange = (dateStr) => {
    if (!startDate && !endDate) return true;
    if (!dateStr) return false;

    const date = new Date(dateStr);
    if (isNaN(date)) return false;

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && date < start) return false;
    if (end && date > end) return false;
    return true;
  };

  const filteredData = useMemo(() => {
    return feesList.filter((item) => {
      const searchContent = [item.status, item.program, item.name]
        .join(" ")
        .toLowerCase();

      const matchSearch = searchContent.includes(searchTerm.toLowerCase());
      const matchDate = isInRange(item.due_date);

      return matchSearch && matchDate;
    });
  }, [feesList, searchTerm, startDate, endDate]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  const openModal = (detailData) => {
    setDetail(detailData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDetail(null);
  };

  return (
    <LandingPageLayout title="Fees List">
      <div className="px-4 py-6 container mx-auto">
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
                className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-slate-500"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-slate-500"
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
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-slate-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-green-700 rounded-xl p-4 text-white text-center">
            <p className="text-sm">Jumlah Uang Terbayar</p>
            <hr className="my-2 border-white" />
            <p className="font-bold">
              {currencyFormat(
                feesList.reduce((a, b) => a + b.grand_total, 0)
              )}
            </p>
          </div>
          <div className="bg-red-700 rounded-xl p-4 text-white text-center">
            <p className="text-sm">Jumlah Tagihan Belum Terbayar</p>
            <hr className="my-2 border-white" />
            <p className="font-bold">Rp. 100.000</p>
          </div>
        </div>

        <div className="flex justify-end mb-5">
          <div className="text-lg font-semibold">
            Total Data:{" "}
            <span className="text-gray-700 font-normal">
              {filteredData.length}
            </span>
          </div>
        </div>

        {paginatedData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedData.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    SPP{" "}
                    {item.due_date
                      ? `${new Date(item.due_date).toLocaleString("id-ID", {
                          month: "long",
                        })} ${new Date(item.due_date).getFullYear()}`
                      : "-"}
                  </h2>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      item.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status || "-"}
                  </span>
                </div>

                <hr className="my-4 border-gray-200 border-2" />

                <div className="flex flex-col py-2 gap-2">
                  <p className="text-sm text-gray-500">
                    Nomor Tagihan:{" "}
                    <span className="font-medium">{item.name || "-"}</span>
                  </p>

                  {item.docstatus === 0 ? (
                    <p className="text-center font-medium w-full mx-auto bg-red-200 py-2 rounded-full text-red-600">
                      SPP Tidak Aktif
                    </p>
                  ) : (
                    <>
                      <p className="text-sm text-gray-500">
                        Fee Structure:{" "}
                        <span className="font-medium">{item.program || "-"}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Grand Total:{" "}
                        <span className="font-medium">
                          {currencyFormat(item.grand_total)}
                        </span>
                      </p>
                    </>
                  )}
                </div>

                {item.docstatus !== 0 && (
                  <button
                    onClick={() => openModal(item)}
                    className="w-full bg-green-600 py-2 rounded-full text-white text-center font-bold hover:bg-green-700 transition-all my-2"
                  >
                    Lihat Detail
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-6">
            Tidak ada data ditemukan.
          </div>
        )}

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
              <hr className="my-2"/>

              <div className="flex flex-col py-2 gap-2 ms-4">
                <p className="text-sm text-gray-500">
                  Nomor Tagihan {" "} : {" "}
                  <span className="font-medium">SPP {detail.name || "-"}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Grand Total{" "} : {" "}
                  <span className="font-medium">
                    {currencyFormat(detail.grand_total)}
                  </span>
                </p>
                 <p className="text-sm text-gray-500">
                  Total Terbayar{" "} : {" "}
                  <span className="font-medium text-green-600">
                    {currencyFormat(detail.grand_total - detail.outstanding_amount)}
                  </span>
                </p>
                <p className="text-sm ">
                  Sisa Tagihan{" "} : {" "}
                  <span className="font-medium text-red-600">
                    {currencyFormat(detail.outstanding_amount)}
                  </span>
                </p>
                <hr className="mt-2 border-gray-300 border-2"/>
                <p className="font-bold">History Pembayaran</p>
              </div>
          </div>
        ) : (
          <p>Data tidak tersedia</p>
        )}

        <Button
          onClick={closeModal}
          color="danger" variant="solid"
          className="mx-100"
        >
          Tutup
        </Button>
      </Modal>
    </LandingPageLayout>
  );
};

export default FeesList;
