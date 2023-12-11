import { createBrowserRouter } from "react-router-dom";

import RouterTest from "@/pages/RouterTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouterTest />,
  },
]);

export default router;
