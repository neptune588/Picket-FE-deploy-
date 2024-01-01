import { createBrowserRouter } from "react-router-dom";

import LayOut from "@/pages/LayOut";
import AuthPageLayOut from "@/pages/AuthPageLayOut";

import OnlyTest from "@/pages/OnlyTest/OnlyTest";
import SignUp from "@/pages/SignUp";
import SignIn from "@/pages/SignIn";
import RegisterSuccess from "@/pages/RegisterSuccess/RegisterSuccess";
import SiteLoading from "@/components/SiteLoading/SiteLoading";
import TestMain from "../pages/TestMain/TestMain";
import TestAlarm from "../pages/TestAlarm/TestAlarm";
import TestMyProfile from "../pages/TestProfile/TestProfile";
import TestAddBucket from "../pages/TestAddBucket/TestAddBucket";
import Browse from "@/pages/Browse";
import PassWordResearch from "@/pages/PassWordResearch";

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
        path: "/search/:keword",
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
      {
        path: "/add",
        element: <TestAddBucket />,
        label: "add",
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
        path: "/auth/passwordResearch",
        element: <PassWordResearch />,
      },
      {
        path: "/auth/registerSuccess/:message",
        element: <RegisterSuccess />,
      },
    ],
  },
  {
    path: "/loading",
    element: <SiteLoading />,
  },
]);

export default router;
