import LandingPageLayout from "../../../layout/landing-page";
import { Image } from "antd";
import { FilePdfTwoTone } from "@ant-design/icons";
import { useProgramMateriSingleFile } from "../../../hooks/useProgramMateriSingleFile";
import HeadingSection from "../../../components/headingSection";

const KalenderAkademik = () => {
 const { modulTraining, renderPreview } = useProgramMateriSingleFile({type: "Kalender Akademik"});
  return (
    <LandingPageLayout>
      <div className="px-4 py-6 container mx-auto">
      <HeadingSection title="Calender Academic" image="/assets/smile_image/icon-1.png" />
        <div className="list-program-edukasi my-5 flex flex-wrap gap-6">
          {modulTraining >= 1 ? (
              modulTraining.map((item) => (
            <div
              key={item.name}
              className="program-edukasi-item w-full  rounded-md shadow-sm gap-3"
            >
              <div className="head-materi bg-red-800 p-3 rounded-md text-white font-sans font-bold">
                {item.title ?? "-"}
              </div>
              <div className="link-materi bg-white p-3 h-[240mm] flex justify-center">
                {renderPreview(item)}
              </div>
            </div>
          ))
          ) : (
            <h1 className="w-full text-center py-3 bg-red-800 text-white rounded-lg font-bold">Belum Ada Materi</h1>
          )
          }
        
        </div>
      </div>
    </LandingPageLayout>
  );
};

export default KalenderAkademik;
