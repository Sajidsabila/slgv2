import LandingPageLayout from "../../../layout/landing-page"
const MateriPembelajaran = () => {
    return (
           <LandingPageLayout>
                <div className="px-4 py-6 container mx-auto">
                 <div className="flex">
                        <img src="/assets/smile_image/icon-1.png" className="w-15 h-15 relative z-1 top-2 left-3"/>
                        <div className="relative right-15 z-0 w-full md:w-72 bg-black text-white py-3 px-6 font-bold mt-4 rounded-lg shadow-xl hover:scale-105 transition">
                        <span className="ms-13">Materi Pembelajaran</span>
            </div>
          </div>
           <div className="list-program-edukasi my-5 flex flex-wrap">
                     <div className="program-edukasi-item w-1/2 md:w-1/3 lg:w-1/4 p-3  rounded-md shadow-sm gap-3">
                        <div className="head-materi bg-red-800 p-3 rounded-md text-white font-sans font-bold">Materi Pertama</div>
                        <div className="link-materi bg-white ">
                            <Image src="/assets/smile_image/icon-1.png" width={50} className="relative z-1 top-2 left-3 py-2"/>
                        </div>
                     </div>

                      <div className="program-edukasi-item w-1/2 md:w-1/3 lg:w-1/4 p-3  rounded-md shadow-sm gap-3">
                        <div className="head-materi bg-red-800 p-3 rounded-md text-white font-sans font-bold">Materi Pertama</div>
                        <div className="link-materi bg-white ">
                            <Image src="/assets/smile_image/icon-1.png" width={50} className="relative z-1 top-2 left-3 py-2"/>
                        </div>
                     </div>

                 </div>
         </div>
        </LandingPageLayout>
    )
}

export default MateriPembelajaran