import { useParams, Link } from "react-router-dom";
import AdminLayout from "../../../layout/admin-layout";
import Modal from "../../../components/modal";
import InputModal from "../../../components/inputModal";
import { Spin } from "antd";
import TableDetailProgramMateri from "./tableDetailProgramMateri";
import useFileMateri from "../../../hooks/useFileMateri"; // useFileMateri 

const DetailProgramMateri = ({ type, back, title }) => {
  const { id } = useParams();
  const {
    programMateri,
    loading,
    error,
    success,
    isOpen,
    isEditMode,
    formData,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    handleSubmit,
    handleChange,
    handleToogleFileUrl,
    handleClose,
    handleOpen,
    handleEdit,
    handleDeleteFile,
    coursePaginatedData,
    totalPages,
    itemsPerPage,
  } = useFileMateri(id, type);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  

  return (
    <AdminLayout>
      {loading && <Spin fullscreen size="large" />}
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        titleModal={isEditMode ? "Edit File Materi" : "Add File Materi"}
        onSubmit={handleSubmit}
      >
        {isEditMode && (
          <InputModal type="hidden" name="name" value={formData.name} onChange={handleChange} />
        )}

        <div className="flex items-center space-x-2 mb-2">
          <input
            type="checkbox"
            checked={formData.useFileUrl}
            onChange={handleToogleFileUrl}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
          />
          <label className="text-sm font-medium text-gray-700">Use File Url</label>
        </div>

           <InputModal
           label="Judul File"
           type="text"
           name="description"
           value={formData.description}
           placeholder="Masukkan judul file..."
           onChange={handleChange}
         />

        {formData.useFileUrl ? (
          <>
           <InputModal
            label="File URL"
            type="text"
            name="file_url"
            value={formData.file_url}
            placeholder="Masukkan URL file..."
            onChange={handleChange}
          />
       
          </>
         
        ) : (
          <>
            <InputModal label="File" type="file" name="file" onChange={handleChange} />
            {isEditMode && (
              <p className="text-sm text-gray-500">Kosongkan jika file tidak ingin diubah</p>
            )}
          </>
          
        )}
      </Modal>

      <h3 className="font-bold text-lg py-5 text-center md:text-left">{title}</h3>

      <div className="w-full p-6 bg-white rounded-xl shadow-lg relative overflow-y-auto h-auto">
        {error && <p className="bg-red-700 text-sm text-white py-3 px-4 my-3">{error}</p>}
        {success && <p className="bg-green-700 text-sm text-white py-3 px-4 my-3">{success}</p>}

        {programMateri && (
          <div className="flex flex-col gap-6">
            {/* Info Program */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-extrabold text-gray-700">Nama</p>
                <p className="text-gray-900">{programMateri.name}</p>
              </div>
              <div>
                <p className="font-extrabold text-gray-700">Format Kelas</p>
                <p className="text-gray-900">{programMateri.class_format ?? "Kosong"}</p>
              </div>
              <div>
                <p className="font-extrabold text-gray-700">Grading Kelas</p>
                <p className="text-gray-900">{programMateri.class_grade ?? "Kosong"}</p>
              </div>
              <div>
                <p className="font-extrabold text-gray-700">Class Course</p>
                <p className="text-gray-900">{programMateri.class_course ?? "Kosong"}</p>
              </div>
            </div>

            <hr className="border-black border-1" />

            {/* List File */}
            <TableDetailProgramMateri
              coursePaginatedData={coursePaginatedData}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              handleDeleteFile={handleDeleteFile}
              handleEdit={handleEdit}
              search={search}
              setSearch={setSearch}
              handleOpen={handleOpen}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex mt-4 space-x-2">
                <button
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                >
                  Previous
                </button>

                {totalPages <= 5 ? (
                  Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => changePage(i + 1)}
                      className={`px-4 py-2 ${
                        currentPage === i + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      } rounded`}
                    >
                      {i + 1}
                    </button>
                  ))
                ) : (
                  <>
                    <button
                      onClick={() => changePage(1)}
                      className="px-4 py-2 bg-gray-200 rounded"
                    >
                      1
                    </button>
                    {currentPage > 3 && <span className="px-2">...</span>}
                    {Array.from({ length: 5 }, (_, i) => {
                      const page = currentPage - 2 + i;
                      return page > 1 && page < totalPages ? (
                        <button
                          key={page}
                          onClick={() => changePage(page)}
                          className={`px-4 py-2 ${
                            currentPage === page
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          } rounded`}
                        >
                          {page}
                        </button>
                      ) : null;
                    })}
                    {currentPage < totalPages - 2 && <span className="px-2">...</span>}
                    <button
                      onClick={() => changePage(totalPages)}
                      className="px-4 py-2 bg-gray-200 rounded"
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}

            {/* Back Button */}
            <div className="text-center md:text-left flex gap-2 py-3">
              <Link
                to={back}
                className="bg-slate-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow"
              >
                Kembali
              </Link>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default DetailProgramMateri;
