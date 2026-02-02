import HeadingSection from "../../../../components/headingSection";
import { useSyllabus } from "../../../../hooks/useGetSyllabus";
import LandingPageLayout from "../../../../layout/landing-page";
import { Link } from "react-router-dom";

const Syllabus = () => {
  const { loading, enroll, materi, enrollWithMateri } = useSyllabus();
  console.log("ini enroll with materi", enrollWithMateri);
  console.log("ini enroll", enroll);
  console.log("ini materi", materi);
  return (
    <LandingPageLayout>
      <div className="px-4 py-6 container mx-auto">
        <HeadingSection
          title="Syllabus"
          image="/assets/smile_image/icon-4.png"
        />

        <div className="list-program-edukasi my-5 flex flex-wrap ">
          {enrollWithMateri.length > 0 ? (
            enrollWithMateri.map((item, index) => (
              <Link
                className="program-edukasi-item w-full md:w-1/4 lg:w-1/4 xl:w-1/6 rounded-md shadow-sm gap-3 my-1"
                key={index}
                to={`/student/learning-resources/materi-pembelajaran/syllabus/${item.name}`}
              >
                <div className="bg-red-800 text-white py-3 text-center rounded-lg font-bold hover:bg-red-700 transition hover:scale-105">
                  {item.class_course}
                </div>
              </Link>
            ))
          ) : (
            <h1 className="w-full text-center py-3 bg-red-800 text-white rounded-lg font-bold">
              Belum Ada Materi
            </h1>
          )}
        </div>
      </div>
    </LandingPageLayout>
  );
};

export default Syllabus;
