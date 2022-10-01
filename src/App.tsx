import { Route, Routes } from "react-router-dom";
import Introduce from "./views/introduce";
import Dashboard from "./views/dashboard";
import NotFound from "./views/404";
import Layout from "./views/layout";
import Login from "./views/login";
import Swiper from "./views/swiper";
import Loading from "./components/Loading";

export default () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="introduce" element={<Introduce />} />
        <Route path="loading" element={<Loading />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="swiper" element={<Swiper />} />
        {/* <Route path="add" element={<Add />} />
        <Route path="swiper" element={<Swiper />} />
        <Route path="hot" element={<Hot />} />
        <Route path="new" element={<New />} /> */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
