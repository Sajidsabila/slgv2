import ModulTrainingDynamicFile from "./modulTrainingDynamicFile";
import { useParams } from "react-router-dom";

const PageDynamicModulTraining = () => {
    const {id} = useParams();
    return (
     <ModulTrainingDynamicFile key={id}/>
      
    )
}

export default PageDynamicModulTraining