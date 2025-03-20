import LandingPageLayout from "../layout/landing-page";
import { useEffect, useState, useRef, use } from "react";
import { useParams } from "react-router-dom";
import { apiGetProgramMateriPublicById, apiGetProgramMateriPublic } from "../api/apiPublic";
import { useFilter } from "../context/FilterContext";
const PageProgramMateri = () => {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [programById, setProgramById] = useState(null);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [program, setProgram] = useState([]);
    const { selectedCategories, setSelectedCategories } = useFilter();
    const { id } = useParams();
    const audioRefs = useRef([]);

    const itemsPerPage = 10;

    const replaceTitle = (title) => (title || "").replace(/-\s*/, ""); 
    const replaceTitle2 = (title) => (title ? title.split("-")[1]?.trim() || "" : "");

    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;
        setSelectedCategories((prev) =>
          checked ? [...prev, value] : prev.filter((cat) => cat !== value)
        );
      };

    const playTrack = (index) => {
    
        audioRefs.current.forEach((audio, i) => {
            if (audio && i !== index) {
                audio.pause();
                audio.currentTime = 0;
            }
        });
        setCurrentTrackIndex(index);
        if (audioRefs.current[index]) {
            audioRefs.current[index].play();
        }
    };

    useEffect(() => {
        const getProgramById = async () => {
            try {
                const response = await apiGetProgramMateriPublicById(id);
                setProgramById(response);
            } catch (error) {
                console.error(error);
            }
        };

        getProgramById();
    }, [id]);

useEffect(() => {
    const filterProgram = async() => {
        try {
            const response = await  apiGetProgramMateriPublic();
            setProgram(response);
        } catch (error) {
            console.error(error);
        }
    }

    filterProgram();
}, []);

    const filterFiles = (search) => {
        return programById?.file?.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
        ) || [];
    };

    const totalPages = Math.ceil(filterFiles(search).length / itemsPerPage) || 1;
    const programFilePaginatedData = filterFiles(search).slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <LandingPageLayout title={`${replaceTitle2(programById?.class_course)} ${replaceTitle(programById?.class_grade)}`}>
            <div className="flex flex-col w-full gap-10 px-4 md:px-10">
           
            <div className="flex flex-row items-center justify-center w-full">
             <input
                className="w-full max-w-lg md:max-w-[800px] h-[50px] rounded-lg bg-white placeholder:text-gray-500 text-gray-800 text-base border border-gray-300 px-4 pr-28 py-2 transition duration-300 ease-in-out focus:outline-none focus:border-blue-500 hover:border-gray-400 shadow-md focus:shadow-lg"
                value={search}
                autoFocus
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pencarian Materi ..."
             />
        </div>


       
                <div className="flex flex-col md:flex-row gap-7 w-full items-start">
                    <div className="flex flex-col w-full md:w-60">
                        <p className="text-slate-700 text-xl font-bold tracking-wide mb-3">Filter</p>
                        <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg">
                            <div className="mx-3 border-b flex justify-between border-slate-200 pt-3 pb-2 px-1">
                                <span className="text-sm text-slate-600 font-bold">Class Course</span>
                                <span className="text-sm text-slate-600 font-bold cursor-pointer" onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
                                    <i className={`fa-solid fa-chevron-${isCategoryOpen ? "up" : "down"}`}></i>
                                </span>
                            </div>
                            {isCategoryOpen && (
                                <div className="ps-6 py-2">
                                    <div className="flex flex-col gap-2">
                                        {/* filter navbar  */}
                                        {program.map((course, index) => (
                                           <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`category-${index}`}
                                        className="mr-2"
                                        value={course.class_course}
                                        onChange={handleCategoryChange} // Tambahkan event handler
                                    />
                                        <label htmlFor={`category-${index}`} className="text-sm text-slate-600 font-medium">
                                        {course.class_course}
                                            </label>
                                                </div>
                                        ))}
                                        
                                    
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="musik flex flex-col w-full md:max-w-[800px] gap-7 py-3">
                        <div className="flex-col">
                            <p className="text-white font-md font-semi-bold md:text-lg md:font-semibold px-3 tracking-wide bg-slate-600 p-2 rounded-lg">Program Materi</p>
                            <ul className="pt-3 ps-2">
                                {programFilePaginatedData.length > 0 ? (
                                    programFilePaginatedData.map((item, index) => {

                                        const fileType = item.title.split(".").pop()?.toLowerCase();
                       
                                        return (
                                        <li key={index} className="text-slate-700 text-sm md:text-m font-bold tracking-wide py-3">
                                            {item.title}
                                            <div className="mt-3">
                                                {(fileType === "mp3" || fileType === "wav") && (
                                                    <audio
                                                    ref={(el) => (audioRefs.current[index] = el)}
                                                    onPlay={() => playTrack(index)}
                                                   controls className="w-full">
                                                      <source src={`${import.meta.env.VITE_SISTER_URL}/${item.file_url}`} type="audio/mpeg" />
                                                  </audio>
                                                )}
                                                {fileType === "mp4" && (
                                                    <video
                                                    ref={(el) => (audioRefs.current[index] = el)}
                                                    onPlay={() => playTrack(index)}
                                                   controls className="w-80">
                                                      <source src={`${import.meta.env.VITE_SISTER_URL}/${item.file_url}`} type="audio/mpeg" />
                                                  </video>
                                                )}
                                            </div>
                                        </li>
                                )})
                                ) : (
                                    <li className="text-slate-700 text-sm md:text-m font-bold tracking-wide text-center py-3">
                                        Tidak ada data
                                    </li>
                                )}
                            </ul>
                        </div>

                        {/* Pagination */}
                
{totalPages > 1 && (
    <div className="flex justify-center items-center gap-2 mt-4">
        <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-sm rounded-md border ${currentPage === 1 ? "text-gray-400 border-gray-300" : "text-slate-700 border-slate-600 hover:bg-slate-200"}`}
        >
            Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
                key={page}
                onClick={() => changePage(page)}
                className={`px-3 py-2 text-sm rounded-md border ${
                    currentPage === page ? "bg-slate-600 text-white border-slate-600" : "text-slate-700 border-slate-300 hover:bg-slate-200"
                }`}
            >
                {page}
            </button>
        ))}

        <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-sm rounded-md border ${currentPage === totalPages ? "text-gray-400 border-gray-300" : "text-slate-700 border-slate-600 hover:bg-slate-200"}`}
        >
            Next
        </button>
    </div>
)}

                    </div>
                </div>
            </div>
        </LandingPageLayout>
    );
};

export default PageProgramMateri;