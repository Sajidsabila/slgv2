import LandingPageLayout from "../../../Layout/landing-page";
const Cfk1Piano = () => {
    return (
        <LandingPageLayout title="Cfk1 Piano">
        <div className="flex justify-center w-full gap-10">
          <div className="flex flex-row items-center">
            <input
              className="w-[800px] h-[45px] rounded-lg bg-transparent placeholder:text-slate-400 text-slate-700 dark:text-white text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease-in-out focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow-md"
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
        </div>
      </LandingPageLayout>
      
    );
}
export default Cfk1Piano