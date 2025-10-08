import { Trash, Pencil } from "lucide-react";
import FilePreview from "./FilePreview";
import { urlLink } from "../../../config/config";

const FileTable = ({
  coursePaginatedData,
  currentPage,
  itemsPerPage,
  handleDeleteFile,
  handleEdit,
  search,
  setSearch,
  handleOpen,
}) => {
  return (
    <div className="mt-6">
      <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-3">
        <button
          onClick={handleOpen}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow"
        >
          Tambah File
        </button>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <table className="w-full text-sm text-left text-gray-600 border border-gray-300 rounded-lg shadow-sm">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="px-4 py-3 border">No</th>
            <th className="px-4 py-3 border">Title</th>
            <th className="px-4 py-3 border">Preview</th>
            <th className="px-4 py-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {coursePaginatedData.length > 0 ? (
            coursePaginatedData.map((fileItem, index) => {
              let fileType = fileItem.title?.split(".").pop()?.toLowerCase() || "";
              const fileSrc = fileItem.file_url?.startsWith("http")
                ? fileItem.file_url
                : `${urlLink.url}/${fileItem.file_url}`;

              return (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-center border">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-2 font-medium border">{fileItem.title}</td>
                  <td className="px-4 py-2 border">
                    <FilePreview
                      fileType={fileType}
                      fileSrc={fileSrc}
                      index={index}
                      audioRefs={{ current: [] }}
                      playTrack={() => {}}
                    />
                  </td>
                  <td className="px-4 py-2 flex gap-2 text-center border">
                    <button
                      className="bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 flex items-center gap-1 px-3 py-1 rounded-md"
                      onClick={() =>
                        window.confirm("Apakah Anda yakin ingin menghapus file ini?") &&
                        handleDeleteFile(fileItem.file ?? fileItem.file_url)
                      }
                    >
                      <Trash size={16} /> Hapus
                    </button>
                    <button
                      className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200 hover:text-yellow-800 flex items-center gap-1 px-3 py-1 rounded-md"
                      onClick={() => handleEdit(fileItem)}
                    >
                      <Pencil size={16} /> Edit
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-3 text-center text-gray-500 italic border">
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;
