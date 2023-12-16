import { createBrowserRouter } from "react-router-dom";

import LayOut from "@/pages/LayOut";
import AuthPageLayOut from "@/pages/AuthPageLayOut";

import OnlyTest from "@/pages/OnlyTest/OnlyTest";
import SignUp from "@/pages/SignUp";
import SignIn from "@/pages/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path: "/test",
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
    ],
  },
]);

export default router;
