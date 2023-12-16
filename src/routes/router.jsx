import { createBrowserRouter } from "react-router-dom";

import LayOut from "@/pages/LayOut";

import OnlyTest from "@/pages/OnlyTest/OnlyTest";
import SignUp from "@/pages/SignUp";

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
    path: "/signup",
    element: <SignUp />,
  },
]);

export default router;
