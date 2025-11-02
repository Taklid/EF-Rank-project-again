import { Outlet } from "react-router-dom";
import Footer from "../Pages/Share/Footer";
import Navber from "../Pages/Share/Navber";

const Main = () => {
    return (
        <div>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;