import { useEffect, useRef } from "react";

const Page5 = ({ muted }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const tryPlay = async () => {
        try {
          await video.play();
        } catch (err) {
          console.warn("Autoplay gagal di Page5:", err);
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

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden relative">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/videos/5.mp4"
        autoPlay
        muted={muted}
        playsInline
      ></video>
    </div>
  );
};

export default Page5;
