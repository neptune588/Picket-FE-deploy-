import { createBrowserRouter } from "react-router-dom";

import LayOut from "@/pages/LayOut";
import OnlyTest from "@/pages/OnlyTest/OnlyTest";
import TestMain from "../pages/TestMain/TestMain";
import TestSearch from "../pages/TestSearch/TestSearch";
import TestAlarm from "../pages/TestAlarm/TestAlarm";
import TestMypage from "../pages/TestMypage/TestMypage";
import TestAddBucket from "../pages/TestAddBucket/TestAddBucket";
import TestAddBucketAlarm from "../pages/TestAddBucketAlarm/TestAddBucketAlarm";

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
        path: "/mypage",
        element: <TestMypage/>,
        label: 'mypage'
      },
      {
        path: "/add",
        element: <TestAddBucket/>,
        label: 'add'
      },
      {
        path: "/add-alarm",
        element: <TestAddBucketAlarm/>,
        label: 'add-alarm'
      },
      {
        path: "/test",
        element: <OnlyTest />,
      },
    ],
  },
]);

export default router;
