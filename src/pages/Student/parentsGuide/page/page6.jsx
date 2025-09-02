import { image } from "framer-motion/client"

const Page6 = () => {
    const images = [
        {
            image: "parents_guide1.webp",
            value: "Mengikuti Kompetensi"
        },
        {
            image: "parents_guide2.webp",
            value: "Tampil dalam konser"
        },
        {
            image: "parents_guide3.webp",
            value: "Bermain dalam Ensemble/Band"
        },
        {
            image: "parents_guide4.webp",
            value: "Belajar Bikin Music"
        },
       
       {
           image: "parents_guide5.webp",
           value: "Rekaman"
       },
       {
        image: "parents_guide6.webp",
        value: "Mengikuti Ujian Musik"
       },
      
    ]
      
    
    return (
        <div className="w-full h-screen bg-red-900">
            <div className="container mx-auto ">
                <div className="grid grid-cols-3 gap-4 place-items-center content-center py-20">
                    {images.map((item, index) => (
                        <img
                            key={index}
                            src={`/images/${item.image}`}
                            alt={`Image ${index + 1}`}
                            className="w-full h-auto rounded-lg "
                        />
                    ))}
                </div>
            </div>
          
        </div>
    )
}

export default Page6