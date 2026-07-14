import LandingPageLayout from "../../../../layout/landing-page";
import { Image } from "antd";
import { DatePicker } from "antd";
import HeadingSection from "../../../../components/headingSection";
import { useDetailLearningMateri } from "../../../../hooks/useDetailLearningMateri";

const DetailLearningMateri = () => {
  const { location, course, searchTerm, setSearchTerm, getYear, renderPreview, dataFilter } = useDetailLearningMateri();
  return (
    <LandingPageLayout>
      <div className="px-4 py-6 container mx-auto">
        <HeadingSection
          title={course.class_course}
          image="/assets/smile_image/icon-4.png"
        />
        <div className="flex md:flex-row flex-col  w-full gap-2">
          <input
            type="text"
            className="bg-white py-2 px-2 rounded-md hover:border-red-800 "
            placeholder="Search Materi ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {location.startsWith(
            "/student/learning-resources/materi-pembelajaran/exam-speciment",
          ) && <DatePicker onChange={getYear} picker="year" />}
        </div>
        <div className="list-program-edukasi my-5 flex flex-wrap gap-6">
          {dataFilter.length > 0 ? (
            dataFilter.map((item) => (
              <div
                key={item.name}
                className="program-edukasi-item w-full md:w-1/3 lg:w-1/4  rounded-md shadow-sm gap-3"
              >
                <div className="head-materi bg-red-800 p-3 rounded-md text-white font-sans font-bold">
                  {item.description ?? "-"}
                </div>
                <div className="link-materi bg-white p-3 flex justify-center">
                  {renderPreview(item)}
                </div>
              </div>
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
export default DetailLearningMateri;
