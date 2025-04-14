import { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useNavigate, useSearchParams,  } from "react-router-dom";
import LandingPageLayout from "../layout/landing-page";
import { apiGetProgramMateriPublicById, apiGetProgramMateriPublic } from "../api/apiPublic";

const PageProgramMateri = () => {
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const [isFormatOpen, setIsFormatOpen] = useState(true);
    const [isGradeOpen, setIsGradeOpen] = useState(true);
    const [programById, setProgramById] = useState(null);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [program, setProgram] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedFormat, setSelectedFormat] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState([]);
    
    const navigate = useNavigate();
    const audioRefs = useRef([]);
    const { id } = useParams();
    const itemsPerPage = 10;

    const replaceTitle = (title) => (title || "").replace(/-\s*/, ""); 
    const replaceTitle2 = (title) => (title ? title.split("-")[1]?.trim() || "" : "");

    const handleSelectionChange = (event, setSelected) => {
        const { value } = event.target;
        setSelected((prev) => (prev.includes(value) ? [] : [value]));
    };
    useEffect(() => {
        if (selectedCategories.length && selectedFormat.length && selectedGrade.length) {
            const newId = `${selectedCategories[0]}${selectedFormat[0]}${selectedGrade[0]}`;
            if (newId !== id) {
                navigate(`/program-materi/${newId}`, { replace: true });
            }
        }
    }, [selectedCategories, selectedFormat, selectedGrade, navigate, id]);

    const getFilteredFiles = useMemo(
        () => (search ? programById?.file?.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())) : programById?.file || []),
        [search, programById]
    );

    
    useEffect(() => {
        if (!id) return;
        const fetchProgramById = async () => {
            try {
                setProgramById(null);
                const response = await apiGetProgramMateriPublicById(id);
                setProgramById(response?.data || response);
            } catch (error) {
                console.error("API Error:", error);
            }
        };
    
        fetchProgramById();
    }, [id]); 
    

    useEffect(() => {
        if (id) {
            const regex = /^([A-Z]{2})([A-Z]{2})(\d+)$/;
        const match = id.match(regex);
    
            if (match) {
                const [, abbr_course, class_format, abbr_grade] = match;
                setSelectedCategories([abbr_course]);
                setSelectedFormat([class_format]);
                setSelectedGrade([abbr_grade]);
            } else {
                console.log("Regex tidak cocok dengan ID:", id);
            }
        }
    }, [id]);
    

    useEffect(() => {
        const fetchProgram = async () => {
            try {
                const response = await apiGetProgramMateriPublic();
                setProgram(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProgram();
    }, []);
    
    const playTrack = (index) => {
    };
    const filterFiles = (search) =>
        programById?.file?.filter((item) => item.title.toLowerCase().includes(search.toLowerCase())) || [];

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

    const renderFilterSection = (title, isOpen, setIsOpen, items, selectedItems, setSelectedItems, valueKey, labelKey) => (
        <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg mt-2">
            <div className="border-b flex justify-between border-slate-200 p-2">
                <span className="text-sm text-slate-600 font-bold">{title}</span>
                <span className="text-sm text-slate-600 font-bold cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <i className={`fa-solid fa-chevron-${isOpen ? "up" : "down"}`}></i>
                </span>
            </div>
            {isOpen && (
                <div className="p-0">
                    <div className="flex flex-col gap-0">
                        {[...new Map(items.map((item) => [item[labelKey], item])).values()].map((item, index) => (
                            <div key={index} className="flex items-center px-2 py-1">
                                <input
                                    type="checkbox"
                                    id={`${valueKey}-${index}`}
                                    className="mr-2"
                                    value={item[valueKey]}
                                    checked={selectedItems.includes(item[valueKey])}
                                    onChange={(e) => handleSelectionChange(e, setSelectedItems)}
                                />
                                <label htmlFor={`${valueKey}-${index}`} className="text-sm text-slate-600 font-medium">
                                    {item[labelKey]}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <LandingPageLayout
        title={
            `${replaceTitle2(programById?.class_course ?? "")} ${replaceTitle(programById?.class_grade ?? "")}`.trim() || "Data Tidak Ditemukan"
        }
    >
        <div  key={id} className="flex flex-col w-full gap-10 px-4 md:px-10">
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
                        <p className="text-slate-700 text-xl font-bold tracking-wide mb-2">Filter</p>
                        {renderFilterSection("Class Course", isCategoryOpen, setIsCategoryOpen, program, selectedCategories, setSelectedCategories, "abbr_course", "class_course")}
                        {renderFilterSection("Class Format", isFormatOpen, setIsFormatOpen, program, selectedFormat, setSelectedFormat, "abbr_format", "class_format")}
                        {renderFilterSection("Class Grade", isGradeOpen, setIsGradeOpen, program, selectedGrade, setSelectedGrade, "abbr_grade", "class_grade")}
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