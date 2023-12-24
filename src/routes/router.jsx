import { createBrowserRouter } from "react-router-dom";

import LayOut from "@/pages/LayOut";
import AuthPageLayOut from "@/pages/AuthPageLayOut";

import OnlyTest from "@/pages/OnlyTest/OnlyTest";
import SignUp from "@/pages/SignUp";
import SignIn from "@/pages/SignIn";
import RegisterSuccess from "@/pages/RegisterSuccess/RegisterSuccess";
import TestMain from "../pages/TestMain/TestMain";
import TestSearch from "../pages/TestSearch/TestSearch";
import TestAlarm from "../pages/TestAlarm/TestAlarm";
import TestMypage from "../pages/TestMypage/TestMypage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path: "/",
        element: <TestMain />,
        label: "main",
      },
      {
        path: "/search",
        element: <TestSearch />,
        label: "search",
      },
      {
        path: "/alarm",
        element: <TestAlarm />,
        label: "alarm",
      },
      {
        path: "/mypage",
        element: <TestMypage />,
        label: "mypage",
      },
      {
        path: "/test5",
        element: <OnlyTest />,
      },
    ],
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
        path: "/auth/registerSuccess/:message",
        element: <RegisterSuccess />,
      },
    ],
  },
]);

export default router;
