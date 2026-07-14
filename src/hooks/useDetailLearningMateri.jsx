import { useState, useEffect } from "react";
import { urlLink } from "../config/config";
import { Image } from "antd";
import { googledriveApi } from "../api/gooledriveApi";
import {
  getDriveFileId,
  generatePreviewGDriveImage,
  generatePreviewGDriveVideo,
} from "../helper/helper";
import { useParams } from "react-router-dom";
import { detailData } from "../api/apiResourceUser";
import { DatePicker } from "antd";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import HeadingSection from "../components/headingSection";
export const useDetailLearningMateri  = () => {
    const [coursePaginatedData, setCoursePaginatedData] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [course, setCourse] = useState([]);
    const { id } = useParams();
    const [extensions, setExtensions] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation().pathname;

  useEffect(() => {
    const materiDetail = async () => {
      try {
        const response = await detailData({ doctype: "Program Materi", id });
        setCoursePaginatedData(response.data.file);
        setCourse(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    materiDetail();
  }, [id]);

  const getYear = (date, dateString) => {
    setYear(date ? Number(dateString) : null);
  };

  const dataFilter = useMemo(() => {
    return coursePaginatedData.filter((item) => {
      const itemYear = new Date(item.creation).getFullYear();
      const matchYear = year ? itemYear === year : true;
      const matchSearch = item.description?.toLowerCase().includes(searchTerm);

      return matchYear && matchSearch;
    });
  }, [coursePaginatedData, year, searchTerm]);

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
  useEffect(() => {
    dataFilter.forEach((file) => {
      if (file.file_url?.startsWith("http") && !extensions[file.name]) {
        getDriveFileExtension(file.file_url, file.name);
      }
    });
  }, [dataFilter]);

  const getFileType = (file) => {
    if (file.file_url?.startsWith("http")) {
      return extensions[file.name] || "loading";
    }
    return file.title?.split(".").pop()?.toLowerCase();
  };

  const renderPreview = (file) => {
    const fileType = getFileType(file);

    if (fileType === "mp3" || fileType === "wav") {
      return (
        <audio
          controls
          className="w-80"
          controlsList="nodownload"
          muted={false}
        >
          <source
            src={
              file.file_url.startsWith("http")
                ? generatePreviewGDriveVideo(file.file_url)
                : urlLink.url + file.file_url
            }
          />
        </audio>
      );
    }

    if (fileType === "mp4" || fileType === "webm") {
      return (
        <Image
          width={100}
          preview={{
            destroyOnHidden: true,
            imageRender: () => (
              <video
                width="40%"
                controls
                src={
                  file.file_url.startsWith("http")
                    ? generatePreviewGDriveVideo(file.file_url)
                    : urlLink.url + file.file_url
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

    if (fileType === "png" || fileType === "jpg" || fileType === "jpeg") {
      return (
        <Image
          src={
            file.file_url.startsWith("http")
              ? generatePreviewGDriveImage(file.file_url)
              : urlLink.url + file.file_url
          }
          alt="Preview"
          width={100}
        />
      );
    }

    if (fileType === "pdf") {
      const preview = file.file_url.startsWith("http")
        ? file.file_url
        : urlLink.url + file.file_url;

      return (
        <a
          href={preview}
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
  return { 
    searchTerm,
    setSearchTerm,
    getYear,
    year,
    course,
    location,
    renderPreview,
    dataFilter
  }
}