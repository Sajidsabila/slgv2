import { useState, useEffect } from "react";
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

const ParentsGuide = () => {
  const [page, setPage] = useState(0);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const checkMobile = () =>
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    setIsMobile(checkMobile());
  }, []);

  // Cek orientasi layar
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    checkOrientation();

    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);


  useEffect(() => {
    if (isMobile) {
      if (isLandscape) {
        setPage(1);
      } else {
        setPage(0); 
      }
    } else {
      setPage(1); 
    }
  }, [isMobile, isLandscape]);

 useEffect(() => {
    let timer;
    if (page === "2a") {
      timer = setTimeout(() => {
        setPage(2);
      }, 20000); 
    }
    return () => clearTimeout(timer);
  }, [page]);

  useEffect(() => {
    let timer;
    if(page === 5 ){
     timer = setTimeout(() => {
      setPage(6); 
    }, 146500); 
    return () => clearTimeout(timer);
    }
 
    });

    useEffect(() => {
      let timer; 
      if(page === 7) {
      timer = setTimeout(() => {
        setPage(8); 
      },171000); 
      return () => clearTimeout(timer);
      }
     
    })
  

  return (
    <>
      {page === 0 && <RotateVidio />}
      {page === 1 && <Page1 handleClick={() => setPage("2a")} />}
      {page === "2a" && <Page2a />}
      {page === 2 && <Page2 handleClick={() => setPage(3)} />}
      {page === 3 && <Page3 handleClick={() => setPage(4)} />}
      {page === 4 && (
        <Page4
          nextPage={() => setPage(5)}
          previusPage={() => setPage(3)}
        />
      )}

      {page === 5 && <Page5 />}
      {page === 6 && <Page6 handleClick={() => setPage(7)}/>}
      {page === 7 && <Page7 />}
      {page === 8 && <Page8 />}
    </>
  );
};

export default ParentsGuide;
