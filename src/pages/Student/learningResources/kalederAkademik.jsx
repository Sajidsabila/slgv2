import LandingPageLayout from "../../../layout/landing-page";
import { useEffect, useState } from "react";
import { methodGet } from "../../../api/apiMethod";
import { Image } from "antd";
import { useAuth } from "../../../hooks/useAuth";
import { urlLink } from "../../../config/config";

// === Helper Functions ===

// Ambil ID file dari URL Google Drive
const getDriveFileId = (url) => {
  const match = url.match(/\/d\/(.*?)\//);
  return match ? match[1] : null;
};


const generatePreviewGDriveVideo = (url) => {
  const fileId = getDriveFileId(url);
  return `https://drive.google.com/uc?export=preview&id=${fileId}`;
};

// Generate preview link untuk image
const generatePreviewGDriveImage = (url) => {
  const fileId = getDriveFileId(url);
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
};

// Generate link untuk PDF
const generatePreviewGDrivePDF = (url) => {
  const fileId = getDriveFileId(url);
  return `https://drive.google.com/file/d/${fileId}/preview`;
};

const KalenderAkademik = () => {
  const { logout } = useAuth();
  const [modulTraining, setModulTraining] = useState([]);


  useEffect(() => {
    const getModulFromApi = async () => {
      try {
        const response = await methodGet("Modul Training", [
          ["type", "=", "Calender Academic"],
        ]);
        setModulTraining(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getModulFromApi();
  }, []);


  const getFileExtension = (url) => {
    if (!url) return "";
    if (url.includes("drive.google.com")) return "gdrive";
    return url.split(".").pop().toLowerCase();
  };


  const renderPreview = (file) => {
    if (!file || !file.file_url) return <span>Tidak ada file</span>;
    const fileType = getFileExtension(file.file_url);

    if (fileType === "gdrive") {

      const pdfUrl = generatePreviewGDrivePDF(file.file_url);

    

    
      return (
        <div className="my-2 flex justify-center">
          <iframe
            src={pdfUrl}
            width="250"
            height="150"
            allow="autoplay"
            title={file.title}
            className="rounded-md border"
          />
        </div>
      );
    }

    // === Audio ===
    if (["mp3", "wav"].includes(fileType)) {
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

    // === Video ===
    if (["mp4", "webm"].includes(fileType)) {
      return (
       <p>jwjski</p>
      );
    }
    if (["png", "jpg", "jpeg"].includes(fileType)) {
      return (
        <Image
          src={file.file_url}
          alt="Preview"
          width={150}
          className="rounded-md"
        />
      );
    }

    if (fileType === "pdf") {
      return (
      <div className="my-2 flex justify-center">
          <iframe
            src={urlLink.url + file.file_url}
            width="250"
            height="150"
            allow="autoplay"
            title={file.title}
            className="rounded-md border"
          />
        </div>
      );
    }

    return <span className="text-gray-500">Tidak ada preview</span>;
  };

  return (
    <LandingPageLayout>
      <div className="px-4 py-6 container mx-auto">
             <div className="flex">
                        <img src="/assets/smile_image/icon-1.png" className="w-15 h-15 relative z-1 top-2 left-3"/>
                        <div className="relative right-15 z-0 w-full md:w-72 bg-black text-white py-3 px-6 font-bold mt-4 rounded-lg shadow-xl hover:scale-105 transition">
                        <span className="ms-13">Materi Pembelajaran</span>
            </div>
          </div>

        <div className="list-program-edukasi my-5 flex flex-wrap">
          {modulTraining.map((item) => (
            <div
              key={item.name}
              className="program-edukasi-item w-full md:w-1/3 lg:w-1/4 p-3 rounded-md shadow-sm gap-3"
            >
              <div className="head-materi bg-red-800 p-3 rounded-md text-white font-sans font-bold">
                {item.title ?? "-"}
              </div>
              <div className="link-materi bg-white p-3 flex justify-center">
                {renderPreview(item)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </LandingPageLayout>
  );
};

export default KalenderAkademik;
