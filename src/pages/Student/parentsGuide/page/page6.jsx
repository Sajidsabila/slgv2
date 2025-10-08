import { useEffect, useState, useRef } from "react";

const Page6 = ({ handleClick, muted }) => {
  const images = [
    { image: "parents_guide1.webp", value: "Mengikuti Kompetensi" },
    { image: "parents_guide2.webp", value: "Tampil dalam konser" },
    { image: "parents_guide3.webp", value: "Bermain dalam Ensemble/Band" },
    { image: "parents_guide4.webp", value: "Belajar Bikin Music" },
    { image: "parents_guide5.webp", value: "Rekaman" },
    { image: "parents_guide6.webp", value: "Mengikuti Ujian Musik" },
  ];

  const [selectedItems, setSelectedItems] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("selectedChoices");
    if (stored) {
      setSelectedItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const tryPlay = async () => {
        try {
          await video.play();
        } catch (err) {
          console.warn("Autoplay gagal di Page6:", err);
        }
      };

      tryPlay();
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

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

  return (
    <div className="w-screen lg:h-screen md:h-auto flex flex-col overflow-hidden relative items-center justify-center gap-5 ">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/videos/6.mp4"
        autoPlay
        loop
        muted={muted}
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
        <button
          onClick={handleClick}
          className="bg-blue-600 w-30 text-white px-7 py-2 rounded-lg shadow-lg cursor-pointer z-11 align- font-bold gotham relative md:bottom-15 lg:bottom-0"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Page6;
