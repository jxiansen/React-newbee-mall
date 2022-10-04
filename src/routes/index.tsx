import Introduce from "@/views/introduce";
import Dashboard from "@/views/dashboard";
import NotFound from "@/views/404";
import Layout from "@/views/layout";
import Login from "@/views/login";
import Swiper from "@/views/swiper";
import Loading from "@/components/Loading";

const routes = [
  { path: "login", element: <Login /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "introduce",
        element: <Introduce />,
      },
      { path: "loading", element: <Loading /> },

      { path: "dashboard", element: <Dashboard /> },
      { path: "swiper", element: <Swiper /> },
    ],
  },
  { path: "*", element: <NotFound /> },
];

export default routes;
