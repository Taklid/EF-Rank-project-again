import { createBrowserRouter } from "react-router-dom";
import Main from "../MainLayout/Main";
import Home from "../Pages/Home";
import TaklidMenu from "../Menu/TaklidMenu";
import OrderFood from "../Pages/Order/OrderFood";
import Login from "../LoginPage/login";
import SignIn from "../LoginPage/SignUp";
import Scoreboard from "../EfootballRank/Scoreboard";
import PlayerInfo from "../EfootballRank/EFStatus/PlayerInfo";

// import MainBoard from "../EfootballRank/MainBoard";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "menu",
        element: <TaklidMenu></TaklidMenu>,
      },
      {
        path: "order",
        element: <OrderFood></OrderFood>,
      },
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
        element: <Scoreboard></Scoreboard>
      },
      {
        path: 'info',
        element: <PlayerInfo></PlayerInfo>
      },
      

    ],
  },
]);
