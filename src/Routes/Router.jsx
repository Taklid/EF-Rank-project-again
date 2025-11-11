import { createBrowserRouter } from "react-router-dom";
import Main from "../MainLayout/Main";
import Home from "../Pages/Home";
import TaklidMenu from "../Menu/TaklidMenu";
import Login from "../LoginPage/login";
import SignIn from "../LoginPage/SignUp";
import Scoreboard from "../EfootballRank/Scoreboard";
import PlayerInfo from "../EfootballRank/EFStatus/PlayerInfo";
import PrivateRoute from "./PrivateRoute";

// import MainBoard from "../EfootballRank/MainBoard";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <PrivateRoute>
          <Home></Home>
        </PrivateRoute>,
      },
      {
        path: "menu",
        element: <PrivateRoute>
          <TaklidMenu></TaklidMenu>
        </PrivateRoute>,
      },
      // {
      //   path: "order",
      //   element: <OrderFood></OrderFood>,
      // },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signin",
        element: <SignIn></SignIn>
      },
      {
        path: 'form',
        element: <PrivateRoute>
          <Scoreboard></Scoreboard>
        </PrivateRoute>
      },
      {
        path: 'info',
        element: <PrivateRoute>
          <PlayerInfo></PlayerInfo>
        </PrivateRoute>
      },
      
      

    ],
  },
]);
