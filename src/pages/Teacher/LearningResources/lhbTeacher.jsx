// import { useSlg } from "../../../hooks/useGetSlg";
import HeadingSection from "../../../components/headingSection";
import { useLearningMateri } from "../../../hooks/useLearningMateri";
import LandingPageLayout from "../../../layout/landing-page"
import { Link } from "react-router-dom"
import { Spin } from "antd";

const LhbTeacher = () => {
  const {loading, enrollWithMateri } = useLearningMateri({type: "LHB"});
    return (
      <LandingPageLayout>
        <div className="px-4 py-6 container mx-auto">
        <HeadingSection title="LHB" image="/assets/smile_image/icon-1.png" />
        {loading ? (
          <div className="flex justify-center py-20">
            <Spin />
          </div>
        ) : (
           <div className="list-program-edukasi my-5 flex flex-wrap ">
            {enrollWithMateri.length > 0  ? (

           enrollWithMateri.map((item, index) => (
              <Link
                className="program-edukasi-item w-full md:w-1/4 lg:w-1/4 xl:w-1/6 rounded-md shadow-sm gap-3 my-1"
                key={index}
                to={`/teacher/learning-resources/lhb/${item.name}`}
              >
               <div className="bg-red-800 text-white py-3 text-center rounded-lg font-bold hover:bg-red-700 transition hover:scale-105">{item.class_course}</div>
              </Link>
            ))) : (
              
                <h1 className="w-full text-center py-3 bg-red-800 text-white rounded-lg font-bold">Belum Ada Materi</h1>
            
            )}
         </div>
        )}
        
        </div>
      </LandingPageLayout>
    )
}


export default LhbTeacher