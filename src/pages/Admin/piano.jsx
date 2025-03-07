"use client";

import { useState, useEffect } from "react";
import AdminLayout from "../../layout/admin-layout";
import { Pencil, Trash } from "lucide-react";
import Modal from "../../components/Modal/modal";
import InputModal from "../../components/InputModal";
import { getCourse } from "../../api/apiCourse";

const AdminPiano = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [courseData, setCourseData] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await getCourse(); 
      setCourseData(courses); 
    };

    fetchCourses();
  }, []);


  const totalPages = Math.ceil(courseData.length / itemsPerPage) || 1;

  // Ambil data sesuai halaman yang dipilih
  const coursePaginatedData = courseData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form Submitted: ${JSON.stringify(formData)}`);
    setFormData({ name: "", email: "" });
    setIsOpen(false);
  };

  return (
    <AdminLayout>
      <h3 className="font-bold py-7 text-lg">Course List</h3>

      <div className="flex flex-col w-full p-4 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center mb-4 gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-800 hover:bg-blue-700 text-white py-1 px-3 rounded-md shadow"
          >
            Insert Data
          </button>

          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-lg px-4 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Modal Insert Data */}
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          titleModal="Form Insert Data"
          onSubmit={handleSubmit}
        >
          <InputModal
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          <InputModal
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </Modal>

        {/* Tabel */}
        <div className="relative overflow-x-auto rounded-xl shadow-md">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {coursePaginatedData.length > 0 ? (
                coursePaginatedData.map((item, index) => (
                  <tr
                    key={index}
                    className="odd:bg-gray-50 even:bg-gray-100 border-b border-gray-300"
                  >
                    <th className="px-6 py-4 font-medium text-gray-900">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </th>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4 text-center flex gap-4">
                      <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        <Pencil size={16} /> Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 flex items-center gap-1">
                        <Trash size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {courseData.length > 0 && (
          <div className="flex  mt-4 space-x-2">
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </button>

            {totalPages <= 5 ? (
              Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => changePage(i + 1)}
                  className={`px-4 py-2 ${
                    currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                  } rounded`}
                >
                  {i + 1}
                </button>
              ))
            ) : (
              <>
                <button onClick={() => changePage(1)} className="px-4 py-2 bg-gray-200 rounded">
                  1
                </button>
                {currentPage > 3 && <span className="px-2">...</span>}
                {Array.from({ length: 5 }, (_, i) => {
                  const page = currentPage - 2 + i;
                  return page > 1 && page < totalPages ? (
                    <button
                      key={page}
                      onClick={() => changePage(page)}
                      className={`px-4 py-2 ${
                        currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                      } rounded`}
                    >
                      {page}
                    </button>
                  ) : null;
                })}
                {currentPage < totalPages - 2 && <span className="px-2">...</span>}
                <button onClick={() => changePage(totalPages)} className="px-4 py-2 bg-gray-200 rounded">
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPiano;
