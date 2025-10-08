import { use, useState, useEffect } from "react"
import LandingPageLayout from "../../layout/landing-page"
import { useParams } from "react-router-dom"
import { apiResourceAdmin } from "../../api/apiResourceAdmin"


const DetailModulTrainingTeacher = ({title}) => {
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
 
    useEffect(() => {
        const getDetailData = async () => {
            try{
                 const storedCredentials = sessionStorage.getItem("credentials");
                if (!storedCredentials) return;

                const decoded = atob(storedCredentials);
                setLoading(true);
                const response = await getDetailModulTrainingPublic(id, decoded);
                setData(response);
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        getDetailData();
    }, [id]);
    const fileType = data?.file_url?.split(".").pop()?.toLowerCase();   
    return ( 
      <LandingPageLayout title={title}>
  <div className="container mx-auto my-5 w-full rounded-xl bg-white shadow-xl">
    
    <div className="flex h-16 items-center justify-center rounded-t-xl bg-slate-300 text-lg font-bold">
      Detail Modul Training
    </div>

    <div className="px-10 py-7 space-y-5">
      {/* Title */}
      <div className="flex flex-row items-start gap-4">
        <div className="w-32 font-bold 2xl:text-xl">Title</div>
        <div className="font-bold 2xl:text-xl">:</div>
        <div className="font-semibold 2xl:text-xl">{data?.title}</div>
      </div>

      {/* Description */}
      <div className="flex flex-row items-start gap-4">
        <div className="w-32 font-bold 2xl:text-xl">Description</div>
        <div className="font-bold 2xl:text-xl">:</div>
        <div className="font-semibold 2xl:text-xl">
          {data?.description || "-"}
        </div>
      </div>
    </div>

    {fileType === "pdf" && (
      <div className="px-10 pb-10">
        <iframe
          src={`${import.meta.env.VITE_SISTER_URL}/${data?.file_url}`}
          width="100%"
          height="600px"
          className="rounded-xl"
        ></iframe>
      </div>
    )}

    {fileType === "mp4" && (
      <div className="px-10 pb-10">
        <video
          src={`${import.meta.env.VITE_SISTER_URL}/${data?.file_url}`}
          width="100%"
          height="600px"
          className="rounded-xl"
          controls
        ></video>
      </div>
    )}

    {fileType === "mp3" && (
      <div className="px-10 pb-10">
        <audio
          src={`${import.meta.env.VITE_SISTER_URL}/${data?.file_url}`}
          width="100%"
          height="600px"
          className="rounded-xl"
          controls
        ></audio>
      </div>
    )}

    {(fileType === "jpg") || (fileType === "png") || (fileType === "jpeg") || (fileType === "gif") ? (
      <div className="px-10 pb-10">
        <img
          src={`${import.meta.env.VITE_SISTER_URL}/${data?.file_url}`}
          width="100%"
          height="600px"
          className="rounded-xl"
        />
      </div>
    ) : null}
  </div>
  <div className="flex items-center justify-center">
    <button
      onClick={() => {
        window.history.back();
      }}
      className="mt-5 flex items-center justify-center hover:cursor-pointer rounded-lg bg-red-500 px-10 py-2 text-lg font-semibold text-white hover:bg-red-400"
    >
      Back
    </button>
  </div>
</LandingPageLayout>

    )
}

export default DetailModulTrainingTeacher