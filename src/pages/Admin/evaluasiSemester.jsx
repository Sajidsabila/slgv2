"use client";

import { useState, useEffect, use } from "react";
import AdminLayout from "../../layout/admin-layout";


import { Link } from "react-router-dom";
import { apiResourceAdmin } from "../../api/apiResourceAdmin";


const EvaluasiSemester = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [students, setStudents] = useState([]);
  
  
    const itemsPerPage = 10;
    
    useEffect(() => {
      const fetchStudent = async() => {
       try{
         const response = await apiResourceAdmin({doctype: "Student"  });
         setStudents(response);
       }catch(e){
         return [];
       }
      }
      fetchStudent();
      
    }, []);
    console.log(students)
  const filteredStudents = students.filter((item) =>
    (item.title ?? '').toLowerCase().includes(search.toLowerCase()) ||
    (item.name ?? '').toLowerCase().includes(search.toLowerCase()) 
  );
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
    
    const coursePaginatedData = filteredStudents.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    
    const changePage = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    };
    
      return (
        <AdminLayout>
          <h3 className="font-bold py-7 text-lg">Evaluasi Semester</h3>
          <div className="flex flex-col w-full p-4 bg-white rounded-xl shadow-lg">
            <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center mb-4 gap-2">
    
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2  focus:outline-none focus:ring-2 focus:ring-blue-500 ms-auto"
              />
            </div>
    
        
 
            <div className="relative overflow-x-auto rounded-xl shadow-md">
          
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th className="px-6 py-3">No</th>
                    <th className="px-6 py-3">ID Siswa</th>
                    <th className="px-6 py-3">Nama Siswa</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Aksi</th>
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
                        <td className="px-6 py-4 font-bold">{item.name}</td>
                        <td className="px-6 py-4">{item.title}</td>
                   
                    
                      <td className="px-6 py-4">
                          <div
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium 
                              ${item.status === "Active" ? "text-green-700 bg-green-50" : ""} 
                              ${item.status === "Idle" || item.status === "Waiting" || item.status === "Trial" ? "text-yellow-700 bg-yellow-50" : ""} 
                              ${item.status === "Out" || item.status === "Cancelled" ? "text-red-600 bg-red-50" : ""}`}
                          >
                            {item.status}
                          </div>
                        </td>
                        <td> 
                          <Link to={`/admin/evaluasi-semester/${item.name}`} className="px-5 text-center py-2 bg-green-700 rounded-md text-white font-bold hover:cursor-pointer hover:bg-green-900 hover:transition duration-300">Upload ES</Link>
                            
                        </td>
                      </tr>
                      
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500 font-bold">
                        Tidak ada data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
    
            {/* Pagination Controls */}
            {students.length > 0 && (
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

export default EvaluasiSemester