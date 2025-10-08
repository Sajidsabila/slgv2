import { useEffect, useState } from "react";
import AdminLayout from "../../layout/admin-layout";
import { useParams } from "react-router-dom";
import { urlLink } from "../../config/config";
import { apiResourceAdminDetail } from "../../api/apiResourceAdmin";

const DetailModulTraining = () => {
  const { id } = useParams();
  const [detailmodulTrainingBookMenu, setModulTrainingBookMenu] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const detailData = async () => {
      setLoading(true);
      try {
        const response = await apiResourceAdminDetail({ doctype: "Modul Training", id });
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
  const fileType = file_url.split(".").pop()?.toLowerCase();
  return (
    <AdminLayout>
      <div className="px-4 md:px-9 py-6">
        <h3 className="font-bold py-7 text-lg">Detail Modul Training</h3>

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
  fileType === "pdf" ? (
    <iframe
      src={file_url}
      title="PDF Viewer"
      className="w-full h-[500px] rounded-md border"
    />
  ) : (
    <video
      src={file_url}
      controls
      className="w-full h-[500px] rounded-md"
    />
  )
) : (
  <p className="text-gray-400 italic text-center">
  File Tidak Tersedia
  </p>
)}

          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default DetailModulTraining
