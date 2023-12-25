import { createBrowserRouter } from "react-router-dom";

import LayOut from "@/pages/LayOut";
import OnlyTest from "@/pages/OnlyTest/OnlyTest";
import TestMain from "../pages/TestMain/TestMain";
import TestSearch from "../pages/TestSearch/TestSearch";
import TestAlarm from "../pages/TestAlarm/TestAlarm";
import TestMyProfile from "../pages/TestProfile/TestProfile"
import TestAddBucket from "../pages/TestAddBucket/TestAddBucket";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path: "/",
        element: <TestMain/>,
        label: 'main'
      },
      {
        path: "/search",
        element: <TestSearch/>,
        label: 'search'
      },
      {
        path: "/alarm",
        element: <TestAlarm/> ,
        label: 'alarm'
      },
      {
        path: "/profile",
        element: <TestMyProfile/>,
        label: 'profile'
      },
      {
        path: "/add",
        element: <TestAddBucket/>,
        label: 'add'
      },
      {
        path: "/test",
        element: <OnlyTest />,
      },
    ],
  },
]);

export default router;
