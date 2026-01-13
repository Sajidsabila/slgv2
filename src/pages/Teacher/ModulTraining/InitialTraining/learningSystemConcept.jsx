import { Link } from "react-router-dom"
import LandingPageLayout from "../../../../layout/landing-page"

const LearningSystemConcept = () => {

    return (
        <LandingPageLayout>
             <div className="px-4 py-3 container mx-auto">
                <div className="flex my-6">
                    <img src="/assets/smile_image/icon-1.png" className="w-15 h-15 relative z-1 top-2 left-3"/>
                    <div className="relative right-15 z-0 w-full md:w-72 bg-black text-white py-3 px-6 font-bold mt-4 rounded-lg shadow-xl hover:scale-105 transition">
                        <span className="ms-13">Learning System</span>
              </div>
          </div>
            <div className="list-program-edukasi my-5 flex flex-wrap gap-2">
               <Link
                className="program-edukasi-item w-full md:w-1/4 lg:w-1/4 xl:w-1/6 rounded-md shadow-sm gap-3 my-1"

                to={`/teacher/initial-training/smi-value`}
              >
               <div className="bg-red-800 text-white py-3 text-center rounded-lg font-bold hover:bg-red-700 transition hover:scale-105">SMI Value</div>
              </Link>

               <Link
                className="program-edukasi-item w-full md:w-1/4 lg:w-1/4 xl:w-1/6 rounded-md shadow-sm gap-3 my-1"

                to={`/teacher/learning-resources/syllabus/1`}
              >
               <div className="bg-red-800 text-white py-3 text-center rounded-lg font-bold hover:bg-red-700 transition hover:scale-105">SMI Value</div>
              </Link>
            </div>
          </div>
        </LandingPageLayout>
    )
}

export default LearningSystemConcept