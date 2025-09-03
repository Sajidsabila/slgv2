import { useEffect, useState } from "react";

const Page6 = ({ handleClick }) => {
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
    ];

    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const stored = sessionStorage.getItem("selectedChoices");
        if (stored) {
            setSelectedItems(JSON.parse(stored));
        }
    }, []);

    const toggleSelection = (value) => {
        let updated;
        if (selectedItems.includes(value)) {
            updated = selectedItems.filter((item) => item !== value);
        } else {
            updated = [...selectedItems, value];
        }
        setSelectedItems(updated);
        sessionStorage.setItem("selectedChoices", JSON.stringify(updated));
    };

    const isSelected = (value) => selectedItems.includes(value);

    const options = sessionStorage.getItem("selectedChoices");
    console.log(options);

    return (
        <div className="w-screen h-screen flex flex-col overflow-hidden relative items-center justify-center gap-5">
              <video
                className="absolute top-0 left-0 w-full h-full md:object-cover object-contain z-0"
                src="/videos/6.mp4"
                autoPlay
                playsInline
              
            ></video>
            <div className="container mx-auto flex flex-col gap-5 fadeinanimation">
                <div className="grid grid-cols-3 gap-10 place-items-center">
                    {images.map((item, index) => (
                        <img
                            key={index}
                            src={`/images/${item.image}`}
                         alt="gambar"
                            onClick={() => toggleSelection(item.value)}
                            className={`w-full h-auto rounded-lg cursor-pointer transition transform duration-300 ${
                                isSelected(item.value) ? "scale-105 ring-6 ring-blue-400" : "hover:scale-105"
                            }`}
                        />
                    ))}
                </div>
          
            </div>
            {selectedItems.length > 0 && (
                 <button onClick={handleClick} className="bg-blue-600 w-30 text-white px-7 py-2 rounded-lg shadow-lg cursor-pointer z-11 align- font-bold">Next</button>
            )}
            
        </div>
        
    );
};

export default Page6;

