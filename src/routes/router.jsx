import { createBrowserRouter } from "react-router-dom";

import LayOut from "@/pages/LayOut";
import OnlyTest from "@/pages/OnlyTest/OnlyTest";

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
]);

export default router;
