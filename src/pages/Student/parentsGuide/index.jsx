import Page1 from "./page/page1";
import Page2 from "./page/page2";
import Page3 from "./page/page3";
import { useState } from "react";
import Page4 from "./page/page4";
import Page6 from "./page/page6";

const ParentsGuide = () => {
  const [page, setPage] = useState(1);

  return (
    <>
      {page === 1 && <Page1 handleClick={() => setPage(2)} />}
      {page === 2 && <Page2 handleClick={() => setPage(3)} />}
      {page === 3 && <Page3  handleClick={() => setPage(4)}/>}
      {page === 4 && <Page4 nextPage={() => setPage(6)} previusPage={() => setPage(3)}/>}
      {page === 6 && <Page6 />}
    
    </>
  );
};

export default ParentsGuide;
