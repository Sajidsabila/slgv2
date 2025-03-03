import AdminLayout from "../../layout/admin-layout";

const AdminPiano = () => {
  return (
    <AdminLayout>
 
      <div className="flex flex-col md:flex-row md:justify-between items-center pt-4 pb-1">
        <h3 className="font-bold">List Piano</h3>
        <form>
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-3 mt-3 md:mt-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Cari..."
          />
        </form>
      </div>
      
      <button className="bg-blue-800 hover:bg-blue-700 text-white  py-1 px-4 border border-blue-700 rounded my-3">
        Tambah Data
        </button>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Product Name</th>
              <th scope="col" className="px-6 py-3">Color</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Apple MacBook Pro 17"', color: "Silver", category: "Laptop", price: "$2999" },
              { name: "Microsoft Surface Pro", color: "White", category: "Laptop PC", price: "$1999" },
              { name: "Magic Mouse 2", color: "Black", category: "Accessories", price: "$99" },
              { name: "Google Pixel Phone", color: "Gray", category: "Phone", price: "$799" },
              { name: "Apple Watch 5", color: "Red", category: "Wearables", price: "$999" },
            ].map((item, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
              >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.name}
                </th>
                <td className="px-6 py-4">{item.color}</td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4">{item.price}</td>
                <td className="px-6 py-4">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminPiano;
