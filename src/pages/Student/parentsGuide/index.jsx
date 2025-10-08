import { useEffect, useLayoutEffect, useState } from "react";
import Page1 from "./page/page1";
import Page2 from "./page/page2";
import Page3 from "./page/page3";
import Page4 from "./page/page4";
import Page6 from "./page/page6";
import RotateVidio from "./page/rotateVidio";
import Page2a from "./page/page2.a";
import Page5 from "./page/page5";
import Page7 from "./page/page7";
import Page8 from "./page/page8";
import { FloatButton } from "antd";
import { SoundOutlined, AudioMutedOutlined } from "@ant-design/icons";

const ParentsGuide = () => {
  const [page, setPage] = useState(() => {
    const stored = sessionStorage.getItem("page");
    return !stored || stored === "0" ? "1" : stored;
  });

  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);
  const [isMobile, setIsMobile] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  
  useEffect(() => {
    const mobileCheck = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setIsMobile(mobileCheck);
  }, []);

 
  useLayoutEffect(() => {
    const updateOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    updateOrientation();

    window.addEventListener("resize", updateOrientation);
    window.addEventListener("orientationchange", updateOrientation);

    return () => {
      window.removeEventListener("resize", updateOrientation);
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, []);

  useEffect(() => {
    if (isMobile === null) return;

    if (isMobile) {
      if (!isLandscape) {
        setPage("0");
      } else {
        setPage((curPage) => {
          if (curPage === "0") {
            const saved = sessionStorage.getItem("page");
            return !saved || saved === "0" ? "1" : saved;
          }
          return curPage;
        });
      }
    } else {
      const saved = sessionStorage.getItem("page");
      setPage(!saved || saved === "0" ? "1" : saved);
    }
  }, [isMobile, isLandscape]);

  useEffect(() => {
    if (page !== "0") {
      sessionStorage.setItem("page", page);
    }
  }, [page]);

  // Timer untuk auto-next
  useEffect(() => {
    let timer;
    if (page === "2a") {
      timer = setTimeout(() => setPage("2"), 20500);
    } else if (page === "5") {
      timer = setTimeout(() => setPage("6"), 147000);
    } else if (page === "7") {
      timer = setTimeout(() => setPage("8"), 169000);
    }
    return () => clearTimeout(timer);
  }, [page]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  // hapus sessionStorage di satu jam setelah logout
  useEffect(() => {
    const timer = setTimeout(() => {
      sessionStorage.removeItem("page");
    }, 3600000);
    return () => clearTimeout(timer);
  }, []);

  if (isMobile && !isLandscape) {
    return (
      <>
        <RotateVidio muted={isMuted} />
        <FloatButton
          type="primary"
          icon={isMuted ? <AudioMutedOutlined /> : <SoundOutlined />}
          tooltip={isMuted ? "Unmute Video" : "Mute Video"}
          onClick={toggleMute}
          style={{ right: 24, bottom: 24 }}
        />
      </>
    );
  }

  return (
    <>
      <FloatButton
        icon={isMuted ? <AudioMutedOutlined /> : <SoundOutlined />}
        tooltip={isMuted ? "Unmute Video" : "Mute Video"}
        onClick={toggleMute}
        style={{ right: 24, bottom: 24 }}
      />

      {page === "1" && <Page1 handleClick={() => setPage("2a")} />}
      {page === "2a" && <Page2a muted={isMuted} />}
      {page === "2" && <Page2 handleClick={() => setPage("3")} muted={isMuted} />}
      {page === "3" && <Page3 handleClick={() => setPage("4")} muted={isMuted} />}
      {page === "4" && (
        <Page4
          nextPage={() => setPage("5")}
          previusPage={() => setPage("3")}
          muted={isMuted}
        />
      )}
      {page === "5" && <Page5 muted={isMuted} />}
      {page === "6" && <Page6 handleClick={() => setPage("7")} muted={isMuted} />}
      {page === "7" && <Page7 muted={isMuted} />}
      {page === "8" && (
        <Page8
          muted={isMuted}
          onEnd={() => {
            sessionStorage.removeItem("page");
          }}
        />
      )}
    </>
  );
};

export default ParentsGuide;
