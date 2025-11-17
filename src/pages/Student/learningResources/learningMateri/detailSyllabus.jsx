import LandingPageLayout from "../../../../layout/landing-page"
import { useState, useEffect } from "react";
import { urlLink } from "../../../../config/config";
import { Image } from "antd";
import { googledriveApi } from "../../../../api/gooledriveApi";
import { getDriveFileId, generatePreviewGDriveImage, generatePreviewGDriveVideo } from "../../../../helper/helper";
import { useParams } from "react-router-dom";
import { detailData } from "../../../../api/apiMethod";
import { Link } from "react-router-dom";
import { FilePdfTwoTone } from "@ant-design/icons";

const DetailSyllabus = () => {
      const [coursePaginatedData, setCoursePaginatedData ] = useState([]);
      const [course, setCourse] = useState([]);
      const { id } = useParams();
      const [extensions, setExtensions] = useState({});
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

      console.log(course);
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
        coursePaginatedData.forEach((file) => {
          if (file.file_url?.startsWith("http") && !extensions[file.name]) {
            getDriveFileExtension(file.file_url, file.name);
          }
        });
      }, [coursePaginatedData]);
    
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
            <audio controls className="w-80"  controlsList="nodownload">
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
      const url1 = urlLink.url + file.file_url;
      return (
        <a
          href={urlLink.url.startsWith("http") ? file.file_url : url1}
          target="_blank"
          rel="noreferrer"
        >
      <FilePdfTwoTone style={{ fontSize: "100px" }} className="mx-2 my-2 hover:text-red-500"/>
        </a>
      );
    }
        return <span className="text-gray-500">Tidak ada preview</span>;
      };
    return (
        <LandingPageLayout>
          <div className="px-4 py-6 container mx-auto">

        <div className="flex my-6">
              <img src="/assets/smile_image/icon-1.png" className="w-15 h-15 relative z-1 top-2 left-3"/>
              <div className="relative right-15 z-0 w-full md:w-72 bg-black text-white py-3 px-6 font-bold mt-4 rounded-lg shadow-xl hover:scale-105 transition">
                  <span className="ms-13">{course.class_course}</span>
              </div>
          </div>
             <div className="list-program-edukasi my-5 flex flex-wrap gap-6">
          {coursePaginatedData.map((item) => (
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
          ))}
        </div>
            </div>
        </LandingPageLayout>
    )
}

export default DetailSyllabus