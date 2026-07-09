import { useEffect, useState } from "react";
import { Image } from "antd";
import { googledriveApi } from "../api/gooledriveApi";
import { getDriveFileId, generatePreviewGDriveImage, generatePreviewGDriveVideo } from "../helper/helper";
import { FilePdfTwoTone } from "@ant-design/icons";
import { getDataResource } from "../api/apiResourceUser";
import { urlLink } from "../config/config";
export const useProgramMateriSingleFile = ({type}) => {
    const [modulTraining, setModulTraining] = useState([]);
    const [extensions, setExtensions] = useState({});

  useEffect(() => {
    const getModulFromApi = async () => {
      try {
        const response = await getDataResource("Program Materi", { type: type });
        setModulTraining(response || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getModulFromApi();
  }, [modulTraining, extensions]);

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
      console.log(err);
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
  if(!modulTraining.length) return
    modulTraining.forEach((file) => {
      if (file.file_url?.startsWith("http") && !extensions[file.name]) {
        getDriveFileExtension(file.file_url, file.name);
      }
    });
  }, [modulTraining, extensions]);

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

  return { modulTraining, renderPreview };

}