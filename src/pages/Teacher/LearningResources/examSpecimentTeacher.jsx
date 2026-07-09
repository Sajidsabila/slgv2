import { Link } from "react-router-dom"
import LandingPageLayout from "../../../layout/landing-page";
import HeadingSection from "../../../components/headingSection";
import useFileMateri from "../../../hooks/useFileMateri";
import { Spin } from "antd";

const ExamSpecimentForTeacher = () => {
   const { loading, enrollWithMateri } = useFileMateri();

    return (
      <LandingPageLayout>
        <div className="px-4 py-6 container mx-auto">
       
          <HeadingSection title="Exam Speciment" image="/assets/smile_image/icon-1.png" />
         
        {loading ? (
          <div className="flex justify-center py-20">
            <Spin />
          </div>
        ) : (
          <>
           <div className="list-program-edukasi my-5 flex flex-wrap ">
            {enrollWithMateri.length > 0  ? (

           enrollWithMateri.map((item, index) => (
              <Link
                className="program-edukasi-item w-full md:w-1/4 lg:w-1/6  rounded-md shadow-sm gap-3 my-1"
                key={index}
                to={`/teacher/learning-resources/exam-speciment/${item.name}`}
              >
               <div className="bg-red-800 text-white py-3 text-center rounded-lg font-bold hover:bg-red-700 transition hover:scale-105">{`${item.class_course} | ${item.class_grade}`}</div>
              </Link>
            ))) : (
              
                <h1 className="w-full text-center py-3 bg-red-800 text-white rounded-lg font-bold">Belum Ada Materi</h1>
            
            )}
         </div>
          </>
        )}
        
        </div>
      </LandingPageLayout>
    )
}

export default ExamSpecimentForTeacher