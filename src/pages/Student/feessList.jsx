import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import LandingPageLayout from "../../layout/landing-page";
import { currencyFormat } from "../../helper/helper";

const FeesList = () => {
  const [feesList, setFeesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 10;

  useEffect(() => {
    const getFees = () => {
      try {
        const raw = sessionStorage.getItem("token");
        if (!raw) return [];
        const data = typeof raw === "string" ? JSON.parse(raw) : raw;
        const fees = data?.fees;
        if (!Array.isArray(fees)) return [];
        return fees.map((item) => ({
          id: item.name,
          program: item.program,
          status: item.status,
          due_date: item.due_date,
          grand_total: item.grand_total,
          oustanding: item.outstanding_amount,
        
          docstatus: item.docstatus
        }));
      } catch {
        return [];
      }
    };
    setFeesList(getFees());
  }, []);

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
    return feesList.filter((e) => {
      const searchContent = [e.status, e.program].join(" ").toLowerCase();
      const matchSearch = searchContent.includes(searchTerm.toLowerCase());
      const matchDate = isInRange(e.due_date);
      return matchSearch && matchDate;
    });
  }, [feesList, searchTerm, startDate, endDate]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <LandingPageLayout title="Fees List">
      <div className="px-4 py-6 container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
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
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="flex justify-end my-5">
          <div className="text-lg font-semibold">
            Total Data:{" "}
            <span className="text-gray-700 font-normal">
              {filteredData.length}
            </span>
          </div>
        </div>

        {paginatedData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedData.map((e, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 shadow-md rounded-xl p-6 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {e.id || "-"}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Group: {e.program || "-"}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      e.status === "Unpaid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {e.status || "-"}
                  </span>
                </div>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>
                    <span className="font-medium">Due Date:</span>{" "}
                    {e.due_date || "-"}
                  </p>
                  <p className="text-lg">
                    <span className="font-medium">Grand Total:</span>{" "}
                    {currencyFormat(e.grand_total || 0)}
                  </p>
                  <p className="text-lg">
                    <span className="font-medium">Kekurangan:</span>{" "}
                    {currencyFormat(e.oustanding || 0)}
                  </p>
                   <p className="text-lg">
                    <span className="font-medium">Terbayar:</span>{" "}
                    {currencyFormat(e.grand_total - e.oustanding || 0)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-4">
            Tidak ada data ditemukan.
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm rounded-md border ${
                currentPage === 1
                  ? "text-gray-400 border-gray-300"
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
                  className={`px-3 py-2 text-sm rounded-md border ${
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
              className={`px-4 py-2 text-sm rounded-md border ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-300"
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

export default FeesList;
