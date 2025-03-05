"use client";
import AdminLayout from "../../layout/admin-layout";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import Modal from "../../components/Modal/modal";

const AdminPiano = () => {
 const [isOpen, setIsOpen] = useState(false);
//  const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       const api_key = localStorage.getItem("api_key");
//       const api_secret = localStorage.getItem("api_secret");
//       try {
//         const response = await fetch(`${import.meta.env.VITE_SISTER_URL}/api/resource/Designation`, {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
          
//           },

//           mode: "cors",
//         });
    
//         if (!response.ok) {
//           throw new Error("Gagal mengambil data");
//         }

//         const data = await response.json();
//         console.log(data);
//         setUserData(data);
//       } catch (err) {
//        console.log(err.message);
//       }
//     };

//     fetchData();
//   }, []);

  return (
    <AdminLayout>
      <h3 className="font-bold py-7 text-lg">List Data</h3>

      <div className="flex flex-col w-full p-4 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center mb-4 gap-2">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-800 hover:bg-blue-700 text-white py-1 px-3 rounded-md shadow"
      >
        Tambah Data
      </button>
      <form >
        <input type="text" placeholder="Search" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </form>

    
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} >
        <form>
          <label className="text-bold mb-2">Title</label>
          <input type="text" placeholder="Search" className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </form>
      </Modal>
    </div>


        <div className="relative overflow-x-auto rounded-xl shadow-md">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Color</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
             
                <tr className="odd:bg-gray-50 even:bg-gray-100 border-b border-gray-300">
                  <th className="px-6 py-4 font-medium text-gray-900">1</th>
                  <td className="px-6 py-4">test</td>
                  <td className="px-6 py-4">itme</td>
                  <td className="px-6 py-4">item</td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                      <Pencil size={16} /> Edit
                    </button>
                  </td>
                </tr>
           
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPiano;