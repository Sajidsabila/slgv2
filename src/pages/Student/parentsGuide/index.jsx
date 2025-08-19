import Page1 from "./page/page1"
import Page2 from "./page/page2"    
import { useState } from "react"
const ParentsGuide = () => {
    const [openPage2, setOpenPage2] = useState(false);

    const handlePage2 = () => {
        setOpenPage2(true);
    }
    return (
        <>
         <Page1 handleClick={handlePage2}/>

         {openPage2 && <Page2 />}
        </>
    

    
    )
}

export default ParentsGuide