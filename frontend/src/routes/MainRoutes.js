import { lazy } from "react";

// project import
import Loadable from "components/Loadable";

import MinimalLayout from "layout/MinimalLayout/index";

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import("pages/dashboard")));
const AllBookingDefault = Loadable(
  lazy(() => import("pages/dashboard/allBooking"))
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "/home",
      element: <DashboardDefault />,
    },

    {
      path: "/booking/all",
      element: <AllBookingDefault />,
    },
  ],
};

export default MainRoutes;
