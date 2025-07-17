import { useEffect, useState } from "react";
import AdminLayout from "../../layout/admin-layout";
import { useParams } from "react-router-dom";
import { detailModulTraining } from "../../api/apiProgramMateri";
import { urlLink } from "../../config/config";

const DetaiCalenderAcademic = () => {
  const { id } = useParams();
  const [detailmodulTrainingBookMenu, setModulTrainingBookMenu] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const detailData = async () => {
      setLoading(true);
      try {
        const response = await detailModulTraining(id);
        setModulTrainingBookMenu(response);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    detailData();
  }, [id]);

  const file_url  =`${urlLink.url}/${detailmodulTrainingBookMenu.file_url}`;

  return (
    <AdminLayout>
      <div className="px-4 md:px-9 py-6">
        <h3 className="font-bold py-7 text-lg">Detail Program Materi</h3>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="text-gray-600 text-center animate-pulse">
              Memuat data...
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
              <p className="font-semibold text-gray-800 col-span-1">Nama</p>
              <p className="text-gray-700 col-span-4">
                {detailmodulTrainingBookMenu.name || "-"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
              <p className="font-semibold text-gray-800 col-span-1">Deskripsi</p>
              <p className="text-gray-700 col-span-4">
                {detailmodulTrainingBookMenu.description || "-"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
              <p className="font-semibold text-gray-800 col-span-1">Kategori</p>
              <p className="text-gray-700 col-span-4">
                {detailmodulTrainingBookMenu.type || "-"}
              </p>
            </div>

            {detailmodulTrainingBookMenu.file_url ? (
            
                <img
                  src={file_url}
                  alt="Ilustrasi Program Materi"
                  className="rounded-xl object-cover shadow my-5"
                />

            ) : (
              <p className="text-gray-400 italic text-center">
                Gambar tidak tersedia
              </p>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default DetaiCalenderAcademic;
