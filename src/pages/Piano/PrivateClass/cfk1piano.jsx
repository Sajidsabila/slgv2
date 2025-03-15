import LandingPageLayout from "../../../layout/landing-page";
import { useState } from "react";

const Cfk1Piano = () => {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    return (
        <LandingPageLayout title="Cfk1 Piano">
            <div className="flex flex-col w-full gap-10 px-4 md:px-10">
                {/* Search Bar */}
                <div className="flex flex-row items-center justify-center w-full">
                    <input
                        className="w-full max-w-lg md:max-w-[800px] h-[45px] rounded-lg bg-transparent placeholder:text-slate-400 text-slate-700  text-sm border border-slate-200 pl-3 pr-28 py-2 transition duration-300 ease-in-out focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow-md"
                        placeholder="Kolom Pencarian ......"
                    />
                    <button
                        className="ml-2 flex items-center rounded-lg bg-slate-800 py-2 px-3 border border-transparent text-sm text-white transition-all shadow-sm hover:bg-slate-700 focus:outline-none focus:ring focus:ring-slate-500"
                        type="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                            <path
                                fillRule="evenodd"
                                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Cari
                    </button>
                </div>

      
                <div className="flex flex-col md:flex-row gap-7 w-full items-start">
                    <div className="flex flex-col w-full md:w-60">
                        <p className="text-slate-700 dark:text-white text-xl font-bold tracking-wide mb-3">Filter</p>
                        <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg">
                            <div className="mx-3 border-b flex justify-between border-slate-200 pt-3 pb-2 px-1">
                                <span className="text-sm text-slate-600 font-bold">Kategori</span>
                                <span
                                    className="text-sm text-slate-600 font-bold cursor-pointer"
                                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                >
                                    <i className={`fa-solid fa-chevron-${isCategoryOpen ? 'up' : 'down'}`}></i>
                                </span>
                            </div>
                            {isCategoryOpen && (
                                <div className="ps-6 py-2">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center">
                                            <input type="checkbox" id="category-1" className="mr-2" />
                                            <label htmlFor="category-1" className="text-sm text-slate-600 font-medium">
                                                Kategori 1
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="checkbox" id="category-2" className="mr-2" />
                                            <label htmlFor="category-2" className="text-sm text-slate-600 font-medium">
                                                Kategori 2
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="checkbox" id="category-3" className="mr-2" />
                                            <label htmlFor="category-3" className="text-sm text-slate-600 font-medium">
                                                Kategori 3
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Music Section */}
                    <div className="musik flex flex-col w-full md:max-w-[800px] gap-7 py-3">
                        <div className="flex-col">
                            <p className="text-white text-l md:text-lg font-bold tracking-wide bg-slate-600 p-2 rounded-lg">Gloomy City</p>
                            <ul className="pt-3 ps-2">
                                <li className="text-slate-700 text-sm md:text-m font-bold tracking-wide">
                                    Gloomy City Tempo 80
                                    <div className="mt-3">
                                        <audio controls className="w-full">
                                            <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
                                            
                                        </audio>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="flex-col">
                            <p className="text-white text-lg font-bold tracking-wide bg-slate-600 p-2 rounded-lg">Hei Ha</p>
                            <ul className="pt-3 ps-2">
                                <li className="text-slate-700 text-sm md:text-m font-bold tracking-wide">
                                    Hei Ha Tempo 90
                                    <div className="mt-3">
                                        <audio controls className="w-full">
                                            <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" type="audio/mpeg" />
                                            Browser Anda tidak mendukung pemutar audio.
                                        </audio>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </LandingPageLayout>
    );
};

export default Cfk1Piano;
