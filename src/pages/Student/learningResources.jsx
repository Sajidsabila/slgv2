import { Link } from "react-router-dom"
import LandingPageLayout from "../../layout/landing-page"

const LearningResources = () => {
  return (
    <LandingPageLayout title="Learning Resources">
      <div className="container mx-auto px-4 flex items-center lg:h-130 xl:h-150 justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:items-start w-full">
          <img
            src="/assets/smile_image/learning-resources.png"
            alt="Learning Resources"
            className="hidden lg:block lg:w-80 xl:w-95 lg:mt-5 xl:mt-10"
          />

 
          <div className="flex flex-col md:ml-20 xl:mt-50 lg:mt-40 text-center md:text-left">
            <p className="font-extrabold text-2xl md:text-center self-start">
              LEARNING RESOURCES
            </p>

            <div className="flex">
            <img src="/assets/smile_image/icon-4.png" className="w-15 h-15 relative z-1 top-2 left-3"/>
            <Link to="/kalender-academic" className="relative right-15 z-0 w-full md:w-72 bg-black text-white py-3 px-6 font-bold mt-4 rounded-lg shadow-xl hover:scale-105 transition">
                <span className="ms-13">Kalender Akademik</span>
            </Link>
          </div>
          <div className="flex">
               <img src="/assets/smile_image/icon-3.png" className="w-15 h-15 relative z-1 top-2 left-3"/>
            <Link className="relative right-15 z-0 w-full md:w-72 bg-black text-white py-3 px-6 font-bold mt-4 rounded-lg shadow-xl hover:scale-105 transition">
             <span className="ms-13">Program Edukasi</span>
            </Link>
          </div>
          <div className="flex">
              <img src="/assets/smile_image/icon-1.png" className="w-15 h-15 relative z-1 top-2 left-3"/>
            <Link className="relative right-15 z-0 w-full md:w-72 bg-black text-white py-3 px-6 font-bold mt-4 rounded-lg shadow-xl hover:scale-105 transition">
            <span className="ms-13">Materi Pembelajaran</span>      
             </Link>
             </div>
          </div>
        </div>
      </div>
    </LandingPageLayout>
  )
}

export default LearningResources
