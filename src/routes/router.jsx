import { createBrowserRouter } from "react-router-dom";

import OnlyTest from "@/pages/OnlyTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <OnlyTest />,
  },
]);

export default router;
