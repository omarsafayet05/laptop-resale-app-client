import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Blog from "../Pages/Blog/Blog";

import SignUp from "../Pages/SignUp/SignUp";
import SignIn from "../Pages/SignIn/SignIn";
import LapItems from "../Pages/LapItems/LapItems";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/lapitems/:brand", element: <LapItems></LapItems> },
      { path: "/blog", element: <Blog></Blog> },
      { path: "/login", element: <SignIn></SignIn> },
      { path: "/signup", element: <SignUp></SignUp> },
    ],
  },
]);
