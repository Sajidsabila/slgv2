import LandingPageLayout from "../../../../layout/landing-page"

const StaticInitialTrainingFile = ({title, filetitle, file}) => {
    return ( 
         <LandingPageLayout>
      <div className="px-4 py-6 container mx-auto">

        <div className="flex my-6">
              <img src="/assets/smile_image/icon-1.png" className="w-15 h-15 relative z-1 top-2 left-3"/>
              <div className="relative right-15 z-0 w-full md:w-72 bg-black text-white py-3 px-6 font-bold mt-4 rounded-lg shadow-xl hover:scale-105 transition">
                  <span className="ms-13">{title}</span>
              </div>
          </div>

        <div className="list-program-edukasi my-5 flex flex-wrap gap-6">
            <div className="program-edukasi-item w-full  rounded-md shadow-sm gap-3">
              <div className="head-materi bg-red-800 p-3 rounded-md text-white font-sans font-bold">
               {filetitle}
              </div>
              <div className="link-materi bg-white p-3 h-[240mm] flex justify-center">
                <iframe src={file} width="100%" height="100%" title="file"></iframe>
              </div>
            </div>
       
        </div>
      </div>
    </LandingPageLayout>
    )
}

export default StaticInitialTrainingFile