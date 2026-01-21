import { useState, useEffect } from "react";
import { urlLink } from "../config/config";
import { Image } from "antd";
import { googledriveApi } from "../api/gooledriveApi";
import { getDriveFileId, generatePreviewGDriveImage, generatePreviewGDriveVideo } from "../helper/helper";
const TableDetailModulTrainingForTeacher= ({
  coursePaginatedData,
  currentPage,
  itemsPerPage,
  handleDeleteFile,
  handleEdit,
  search,
  setSearch,
  handleOpen,
}) => {
  // simpan extension per file.name
  const [extensions, setExtensions] = useState({});
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
  useEffect(() => {
    coursePaginatedData.forEach((file) => {
      if (file.file_url?.startsWith("http") && !extensions[file.name]) {
        getDriveFileExtension(file.file_url, file.name);
      }
    });
  }, [coursePaginatedData]);

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
        <audio controls className="w-80"  controlsList="nodownload" muted={false}>
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
        const preview = file.file_url.startsWith("http") ? file.file_url : urlLink.url + file.file_url;
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

  return (
    <div>
      {/* Search & Add Button */}
      <div className="flex lg:flex-row flex-col justify-between items-center mb-4 gap-2 ">
        <button
          onClick={handleOpen}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md lg:w-auto w-full hover:cursor-pointer"
        >
          Tambah File
        </button>
        <input
          type="text"
          placeholder="Cari file..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md lg:w-auto w-full"
        />
      </div>

      {/* Table */}
      <table className="w-full border border-gray-300 rounded-md text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">No</th>
            <th className="p-3">Judul</th>
            <th className="p-3">Description</th>
            <th className="p-3">Preview</th>
            <th className="p-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {coursePaginatedData.length > 0 ? (
            coursePaginatedData.map((file, idx) => (
              <tr key={file.name || idx} className="border-t">
                <td className="p-3">
                  {(currentPage - 1) * itemsPerPage + idx + 1}
                </td>
                <td className="p-3">{file.title}</td>
                <td className="p-3">{file.description}</td>
                <td className="p-3">{renderPreview(file)}</td>
           
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(file)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded hover:cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteFile(file.file)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded hover:cursor-pointer"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-3 text-center">
                Tidak ada file
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


export default TableDetailModulTrainingForTeacher