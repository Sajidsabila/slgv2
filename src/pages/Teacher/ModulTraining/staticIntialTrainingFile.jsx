import HeadingSection from "../../../components/headingSection";
import LandingPageLayout from "../../../layout/landing-page";

const StaticInitialTrainingFile = ({ title, filetitle, file }) => {
  return (
    <LandingPageLayout>
      <div className="px-4 py-6 container mx-auto">
        <HeadingSection
          title={title ?? "Data Kosong"}
          image="/assets/smile_image/icon-1.png"
        />

        <div className="list-program-edukasi my-5 flex flex-wrap gap-6">
          <div className="program-edukasi-item w-full  rounded-md shadow-sm gap-3">
            <div className="head-materi bg-red-800 p-3 rounded-md text-white font-sans font-bold">
              {filetitle}
            </div>
            <div className="link-materi bg-white p-3 h-[240mm] flex justify-center">
              <iframe
                src={file}
                width="100%"
                height="100%"
                title="file"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </LandingPageLayout>
  );
};

export default StaticInitialTrainingFile;
