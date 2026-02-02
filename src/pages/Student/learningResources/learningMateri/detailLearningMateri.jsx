import LandingPageLayout from "../../../../layout/landing-page"
import { useState, useEffect, use } from "react";
import { urlLink } from "../../../../config/config";
import { Image } from "antd";
import { googledriveApi } from "../../../../api/gooledriveApi";
import { getDriveFileId, generatePreviewGDriveImage, generatePreviewGDriveVideo } from "../../../../helper/helper";
import { data, useParams } from "react-router-dom";
import { detailData } from "../../../../api/apiMethod";
import {DatePicker} from 'antd';
import { useMemo } from "react";
import { useLocation } from "react-router-dom";


const DetailLearningMateri = () => {
     const [coursePaginatedData, setCoursePaginatedData ] = useState([]);
      const [year, setYear] = useState(new Date().getFullYear());
      const [course, setCourse] = useState([]);
      const { id } = useParams();
      const [extensions, setExtensions] = useState({});
      const [searchTerm, setSearchTerm] = useState("");
      const location = useLocation().pathname;
      console.log(location);
      useEffect(() => {
        const materiDetail = async () => {
          try{
              const response = await detailData({doctype: "Program Materi", id});
              setCoursePaginatedData(response.data.file);
              setCourse(response.data);
          }catch(err){
            console.log(err);
          }
        }
        materiDetail();
      }, [id]);

      const getYear = (date, dateString) => {
        setYear(date ? Number(dateString) : null);
      };

      const dataFilter = useMemo(() => {
          return coursePaginatedData.filter((item) => {
            const itemYear = new Date(item.creation).getFullYear();
            const matchYear = year ? itemYear === year : true;
            const matchSearch = item.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchYear && matchSearch;
  });
    }, [coursePaginatedData, year, searchTerm]);

      const getDriveFileExtension = async (url, fileName) => {
        try {
          const fileId = getDriveFileId(url);
          if (!fileId) return;
    
          const response = await googledriveApi(fileId);
          const ext = response.fileExtension || ""; 
    
          setExtensions((prev) => ({
            ...prev,
            [fileName]: ext.toLowerCase(),
          }));
        } catch (err) {
          setExtensions((prev) => ({ ...prev, [fileName]: "" }));
        }
      };
      useEffect(() => {
        dataFilter.forEach((file) => {
          if (file.file_url?.startsWith("http") && !extensions[file.name]) {
            getDriveFileExtension(file.file_url, file.name);
          }
        });
      }, [dataFilter]);
    
      const getFileType = (file) => {
        if (file.file_url?.startsWith("http")) {
          return extensions[file.name] || "loading";
        }
        return file.title?.split(".").pop()?.toLowerCase();
      };
    
      const renderPreview = (file) => {
        const fileType = getFileType(file);
    
    
        if (fileType === "mp3" || fileType === "wav") {
          return (
            <audio controls className="w-80"  controlsList="nodownload" muted={false}>
              <source src={file.file_url.startsWith("http") ? generatePreviewGDriveVideo(file.file_url) : urlLink.url + file.file_url}/>
            </audio>
          );
        }
    
        if (fileType === "mp4" || fileType === "webm") {
          return (
           <Image
            width={100}
            preview={{
            destroyOnHidden: true,
            imageRender: () => (
            <video 
                width="40%"
                controls
                src={file.file_url.startsWith("http") ? generatePreviewGDriveVideo(file.file_url) : urlLink.url + file.file_url}
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
                />
            ),
            toolbarRender: () => null,
            }}
            src="/youtube.png"
        />
          );
        }
    
        if (fileType === "png" || fileType === "jpg" || fileType === "jpeg") {
          return (
            <Image
            src={file.file_url.startsWith("http") ? generatePreviewGDriveImage(file.file_url) : urlLink.url + file.file_url}
            alt="Preview"
            width={100}
            />
          );
        }
    
        if (fileType === "pdf") {
        const preview = file.file_url.startsWith("http") ? file.file_url : urlLink.url + file.file_url;
  
      return (
        <a
          href={preview}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline"
        >
          Lihat PDF
        </a>
      );
    }
        return <span className="text-gray-500">Tidak ada preview</span>;
      };
    return (
        <LandingPageLayout>
          <div className="px-4 py-6 container mx-auto">
            <HeadingSection title={course.class_course} image="/assets/smile_image/icon-4.png" />
         <div className="flex md:flex-row flex-col  w-full gap-2">
       
              <input type="text" className="bg-white py-2 px-2 rounded-md hover:border-red-800 "
               placeholder="Search Materi ..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}/>
         {location.startsWith("/student/learning-resources/materi-pembelajaran/exam-speciment") && (
            <DatePicker onChange={getYear} picker="year" />
         )}
                 
        
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
                ))) : (
                  <h1 className="w-full text-center py-3 bg-red-800 text-white rounded-lg font-bold">
                    Belum Ada Materi
                  </h1>
                )}
        </div>
            </div>
        </LandingPageLayout>
    )
}
export default DetailLearningMateri