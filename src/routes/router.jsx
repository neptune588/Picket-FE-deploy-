import { createBrowserRouter } from "react-router-dom";

import LayOut from "@/pages/LayOut";
import AuthPageLayOut from "@/pages/AuthPageLayOut";

import SignUp from "@/pages/SignUp";
import SignIn from "@/pages/SignIn";
import RegisterSuccess from "@/pages/RegisterSuccess/RegisterSuccess";
import Main from "@/pages/Main";
import TestAlarm from "../pages/TestAlarm/TestAlarm";
import TestMyProfile from "../pages/TestProfile/TestProfile";
import AddBucket from "@/pages/AddBucket/AddBucket";
import Browse from "@/pages/Browse";
import PassWordResearch from "@/pages/PassWordResearch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: `/search/:keyword`,
        element: <Browse />,
        label: "search",
      },
      {
        path: "/alarm",
        element: <TestAlarm />,
        label: "alarm",
      },
      {
        path: "/profile",
        element: <TestMyProfile />,
        label: "profile",
      },
    ],
  },
  {
    path: "/add",
    element: <AddBucket />,
  },
  {
    path: "/auth",
    element: <AuthPageLayOut />,
    children: [
      {
        path: "/auth/signup",
        element: <SignUp />,
      },
      {
        path: "/auth/signin",
        element: <SignIn />,
      },
      {
        path: "/auth/passwordResearch",
        element: <PassWordResearch />,
      },
      {
        path: "/auth/registerSuccess/:message",
        element: <RegisterSuccess />,
      },
    ],
  },
]);

export default router;
