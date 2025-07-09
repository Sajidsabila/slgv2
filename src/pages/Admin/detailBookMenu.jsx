import AdminLayout from "../../layout/admin-layout";

const DetailBookMenu = () => {
  return (
    <AdminLayout>
      <div className="px-4 md:px-9 py-6">
        {/* Judul Halaman */}
        <h3 className="text-2xl font-bold text-center md:text-left mb-8">
          Detail Program Materi
        </h3>
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <p className="font-semibold text-gray-800 col-span-1">Nama</p>
            <p className="text-gray-700 col-span-4">Test</p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <p className="font-semibold text-gray-800 col-span-1">Deskripsi</p>
            <p className="text-gray-700 col-span-4">
              Ini deskripsi singkat program materi.
            </p>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            <p className="font-semibold text-gray-800 col-span-1">Kategori</p>
            <p className="text-gray-700 col-span-4">Kelas Pemula</p>
          </div>

      
          <div className="w-full">
            <img
              src="https://tse3.mm.bing.net/th/id/OIP.wnA7lpjhCUraSgilpFY6PgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="Ilustrasi Program Materi"
              className="w-auto h-60 rounded-xl object-cover shadow"
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DetailBookMenu;
