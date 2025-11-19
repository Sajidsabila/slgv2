import LandingPageLayout from "../../../layout/landing-page";
import { useEffect, useState } from "react";
import { methodGet } from "../../../api/apiMethod";
import { Image } from "antd";
import { useAuth } from "../../../hooks/useAuth";
import { urlLink } from "../../../config/config";
import { googledriveApi } from "../../../api/gooledriveApi";
import { getDriveFileId, generatePreviewGDriveImage, generatePreviewGDriveVideo } from "../../../helper/helper";
import { FilePdfTwoTone } from "@ant-design/icons";
import { getModulTraining } from "../../../api/apiPublic";

const KalenderAkademik = () => {
  const { logout } = useAuth();
  const [modulTraining, setModulTraining] = useState([]);

  // Simpan ekstensi untuk file Google Drive berdasarkan item.name
  const [extensions, setExtensions] = useState({});

  useEffect(() => {
    const getModulFromApi = async () => {
      try {
        const response = await getModulTraining([["type", "=", "Calender Academic"]]);
        setModulTraining(response || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getModulFromApi();
  }, []);
  const getDriveFileExtension = async (url, fileName) => {
    try {
      const fileId = getDriveFileId(url);
      if (!fileId) return;

      const response = await googledriveApi(fileId);
      const ext = response.fileExtension || "";

      setExtensions((prev) => ({
        ...prev,
        [fileName]: ext.toLowerCase(),
      }));
    } catch (err) {
      setExtensions((prev) => ({ ...prev, [fileName]: "" }));
    }
  };


  const getFileType = (file) => {
    if (file.file_url?.startsWith("http")) {
      return extensions[file.name] || "loading";
    }
    return file.file_url?.split(".").pop()?.toLowerCase();
  };

  useEffect(() => {
    modulTraining.forEach((file) => {
      if (file.file_url?.startsWith("http") && !extensions[file.name]) {
        getDriveFileExtension(file.file_url, file.name);
      }
    });
  }, [modulTraining]);

  // === Render Preview Seragam ===
  const renderPreview = (file) => {
    const fileType = getFileType(file);
    const fileUrl = file.file_url;

    if (fileType === "loading") {
      return <span className="text-gray-500">Loading preview...</span>;
    }

    if (fileType === "mp3" || fileType === "wav") {
      return (
        <audio controls className="w-40" controlsList="nodownload">
          <source
            src={
              fileUrl.startsWith("http")
                ? generatePreviewGDriveVideo(fileUrl)
                : urlLink.url + fileUrl
            }
          />
        </audio>
      );
    }


    if (fileType === "mp4" || fileType === "webm") {
      return (
        <Image
          width={100}
          className="mx-2 my-2"
          preview={{
            destroyOnHidden: true,
            imageRender: () => (
              <video
                width="40%"
                controls
                src={
                  fileUrl.startsWith("http")
                    ? generatePreviewGDriveVideo(fileUrl)
                    : urlLink.url + fileUrl
                }
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

    // === IMAGE ===
    if (fileType === "png" || fileType === "jpg" || fileType === "jpeg") {
      return (
        <Image
          src={file.file_url.startsWith("http") ? generatePreviewGDriveImage(file.file_url) : urlLink.url + file.file_url}
          alt="Preview"
          width={100}
          className="mx-2 my-2"
        />
      );
    }


    if (fileType === "pdf") {
      const url = urlLink.url + file.file_url;
      return (
        <iframe
          src={url}
          width="100%"
     
          className="mx-2 my-2"
        ></iframe>
      );
    }

    return <span className="text-gray-500">Tidak ada preview</span>;
  };

  return (
    <LandingPageLayout>
      <div className="px-4 py-6 container mx-auto">

        <div className="flex my-6">
              <img src="/assets/smile_image/icon-1.png" className="w-15 h-15 relative z-1 top-2 left-3"/>
              <div className="relative right-15 z-0 w-full md:w-72 bg-black text-white py-3 px-6 font-bold mt-4 rounded-lg shadow-xl hover:scale-105 transition">
                  <span className="ms-13">Calender Academic</span>
              </div>
          </div>

        <div className="list-program-edukasi my-5 flex flex-wrap gap-6">
          {modulTraining.map((item) => (
            <div
              key={item.name}
              className="program-edukasi-item w-full  rounded-md shadow-sm gap-3"
            >
              <div className="head-materi bg-red-800 p-3 rounded-md text-white font-sans font-bold">
                {item.title ?? "-"}
              </div>
              <div className="link-materi bg-white p-3 h-[250mm] flex justify-center">
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
