import { Helmet } from "react-helmet-async";
import CoverPhoto from "../Pages/Share/cover/CoverPhoto";
import DownCover from "./DownCover";


const TaklidMenu = () => {
    return (
        <div>
            <Helmet>
               <title className="text-orange-700">Menu</title>
            </Helmet>
            <CoverPhoto></CoverPhoto>
            <DownCover></DownCover>
           

        </div>
    );
};

export default TaklidMenu;