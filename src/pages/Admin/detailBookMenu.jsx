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

  const getGoogleDriveExtension = async (url) => {
   try{
      const fileId = getDriveFileId(url);
      if(!fileId) return;
 
      const response = await googledriveApi(fileId);
      setExtension(response.fileExtension);
   }catch(e){
    console.log(e);
   }
  };

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

  console.log()

  const file_url  =`${urlLink.url}/${detailmodulTrainingBookMenu.file_url}`;
    const getFileType = (file) => {
    if (file.file_url?.startsWith("http")) {
      return extension[file.name] || "loading";
    }
    return file.title?.split(".").pop()?.toLowerCase();
  };

  console.log(extension);

  const renderPreview = (file) => {
    const fileType = getFileType(file);


    if (fileType === "mp3" || fileType === "wav") {
      return (
        <audio controls className="w-80"  controlsList="nodownload">
          <source src={file.file_url.startsWith("http") ? generatePreviewGDriveVideo(file.file_url) : urlLink.url + file.file_url}/>
        </audio>
      );
    }

    if (fileType === "mp4" || fileType === "webm") {
      return (
       <Image
        width={200}
        preview={{
        destroyOnHidden: true,
        imageRender: () => (
        <video 
            width="50%"
            controls
            src={file.file_url.startsWith("http") ? generatePreviewGDriveVideo(file.file_url) : urlLink.url + file.file_url}
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

    if (fileType === "png" || fileType === "jpg" || fileType === "jpeg") {
      return (
        <Image
        src={file.file_url.startsWith("http") ? generatePreviewGDriveImage(file.file_url) : urlLink.url + file.file_url}
        alt="Preview"
        width={150}
        />
      );
    }

    if (fileType === "pdf") {
        const url = urlLink.url + file.file_url;
      return (
        <a
          href={urlLink.url.startsWith("http") ? file.file_url : url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline"
        >
          Lihat PDF
        </a>
      );
    }

    return <span className="text-gray-500">Tidak ada preview</span>;
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
