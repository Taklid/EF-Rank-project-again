import { Outlet } from "react-router-dom";
import Footer from "../Pages/Share/Footer";
import Navber from "../Pages/Share/Navber";
import PrivateRoute from "../Routes/PrivateRoute";

const Main = () => {
    return (
        <div>
            <Navber></Navber>
            <Outlet></Outlet>
           <PrivateRoute>
             <Footer></Footer>
           </PrivateRoute>
        </div>
    );
};

export default Main;