import LandingPageLayout from "../../../layout/landing-page";
import { useEffect, useState } from "react";
import { methodGet } from "../../../api/apiMethod";
import { Image } from "antd";
import { useAuth } from "../../../hooks/useAuth";

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
        console.log("DATA:", response.data);
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
      const imageUrl = generatePreviewGDriveImage(file.file_url);
      const videoUrl = generatePreviewGDriveVideo(file.file_url);
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
        <audio
          controls
          className="w-64 my-2"
          controlsList="nodownload"
          src={file.file_url}
        />
      );
    }

    // === Video ===
    if (["mp4", "webm"].includes(fileType)) {
      return (
        <video
          width="250"
          height="150"
          controls
          controlsList="nodownload"
          className="my-2 rounded-md"
          onContextMenu={(e) => e.preventDefault()}
        >
          <source src={file.file_url} type={`video/${fileType}`} />
        </video>
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

    // === PDF ===
    if (fileType === "pdf") {
      return (
        <a
          href={file.file_url}
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
    <LandingPageLayout>
      <div className="px-4 py-6 container mx-auto">
        <div className="flex items-center mb-4">
          <img
            src="/assets/smile_image/icon-4.png"
            className="w-12 h-12 mr-3"
            alt="icon"
          />
          <div className="bg-black text-white py-3 px-6 font-bold mt-2 rounded-lg shadow-xl hover:scale-105 transition">
            Kalender Akademik
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
