import { Link } from "react-router-dom"
import LandingPageLayout from "../../../layout/landing-page"
import { Image } from "antd"
const MateriPembelajaran = () => {
    const array = [
        {
            id: 1,
            text: "Syllabus",
            url: "/student/learning-resources/materi-pembelajaran/syllabus"
        },
        {
            id: 2,
            text: "Exam Speciment",
            url: "/student/learning-resources/materi-pembelajaran/exam-speciment"
        }
    ]
    return (
           <LandingPageLayout>
                <div className="px-4 py-6 container mx-auto">
                 <div className="flex">
                        <img src="/assets/smile_image/icon-1.png" className="w-15 h-15 relative z-1 top-2 left-3"/>
                        <div className="relative right-15 z-0 w-full md:w-72 bg-black text-white py-3 px-6 font-bold mt-4 rounded-lg shadow-xl hover:scale-105 transition">
                        <span className="ms-13">Learning Materi</span>
            </div>
          </div>
            <div className="list-program-edukasi my-5 flex flex-wrap gap-2">
            {array .length > 0  ? (

            array.map((item, index) => (
              <Link
                className="program-edukasi-item w-full md:w-1/4 lg:w-1/6  rounded-md shadow-sm gap-3 my-1"
                key={index}
                to={item.url}
              >
               <div className="bg-red-800 text-white py-3 text-center rounded-lg font-bold hover:bg-red-700 transition hover:scale-105">{item.text}</div>
              </Link>
            ))) : (
              
                <h1 className="w-full text-center py-3 bg-red-800 text-white rounded-lg font-bold">Belum Ada Materi</h1>
            
            )}
         </div>
         </div>
        </LandingPageLayout>
    )
}

export default MateriPembelajaran