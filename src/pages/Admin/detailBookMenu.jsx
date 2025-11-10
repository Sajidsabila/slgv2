import { useEffect, useState } from "react";
import AdminLayout from "../../layout/admin-layout";
import { useParams } from "react-router-dom";
import { urlLink } from "../../config/config";
import { apiResourceAdminDetail } from "../../api/apiResourceAdmin";
import { getDriveFileId } from "../../helper/helper";
import { googledriveApi } from "../../api/gooledriveApi";
import { Image } from "antd";

const DetailBookMenu = () => {
  const { id } = useParams();
  const [detailmodulTrainingBookMenu, setModulTrainingBookMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [extension, setExtension] = useState({});

 
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

   const getDriveFileExtension = async (url) => {
     try {
       const fileId = getDriveFileId(url);
       if (!fileId) return;
       const response = await googledriveApi(fileId);
       const fileData = Array.isArray(response.files) ? response.files[0] : response;
       const ext = fileData.fileExtension || "";
 
       setFileExt(ext.toLowerCase());
     } catch (err) {
       console.error("Gagal ambil ekstensi dari Google Drive:", err);
       setFileExt("");
     }
   };
 
 
   useEffect(() => {
     if (file_url.includes("drive.google.com")) {
       getDriveFileExtension(file_url);
     } else {
       const ext = file_url.split(".").pop()?.toLowerCase() || "";
       setFileExt(ext);
     }
   }, [file_url]);
   console.log(fileExt);
 
   const renderFileViewer = () => {
     if (!file_url) {
       return <p className="text-gray-400 italic text-center">File Tidak Tersedia</p>;
     }
 
     if (fileExt === "pdf") {
      return ( 
       <a href={file_url} target="_blank" rel="noopener noreferrer" className="bg-blue-800 rounded-md hover:bg-blue-900 text-white px-3 py-3">Lihat PDF</a>
      )
     }
 
 
     if(["mp4", "mov", "webm"].includes(fileExt)) {
       return (
        <Image
         width={200}
         preview={{
         destroyOnHidden: true,
         imageRender: () => (
         <video 
             width="40%"
             controls
             src={detailmodulTrainingBookMenu.file_url.startsWith("http") ? generatePreviewGDriveVideo(detailmodulTrainingBookMenu.file_url) : urlLink.url + detailmodulTrainingBookMenu.file_url}
             controlsList="nodownload"
             onContextMenu={(e) => e.preventDefault()}
             />
         ),
         toolbarRender: () => null,
         }}
         src="/youtube.png"
     />
       );
     }
 
     if(['mp3', 'wav'].includes(fileExt)) {
       return (
        <audio controls className="w-80"  controlsList="nodownload">
         <source src={detailmodulTrainingBookMenu.file_url.startsWith("http") ? generatePreviewGDriveVideo(detailmodulTrainingBookMenu.file_url) : urlLink.url + detailmodulTrainingBookMenu.file_url}/>
       </audio>
       );
     }
 
     return (
       <p className="text-gray-500 text-center italic">
         File tidak dapat ditampilkan (tipe: {fileExt || "tidak diketahui"})
       </p>
     );
   };
 
    

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
            <div className="w-full">{renderPreview(file_url)}</div>

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

export default DetailBookMenu;
