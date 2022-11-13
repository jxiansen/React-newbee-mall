import { Layout } from "@douyinfe/semi-ui";
import { IconBytedanceLogo } from "@douyinfe/semi-icons";
import { Outlet } from "react-router-dom";
import RenderLayoutSider from "./components/sider";
import RenderLayoutHeader from "./components/Header";
import RenderLayoutFooter from "./components/footer";

import "./index.less";

export default () => {
  const { Content } = Layout;

  return (
    <Layout className="page-layout-wrapper">
      <RenderLayoutSider />
      <Layout>
        <RenderLayoutHeader />
        <Content className="page-layout-content">
          <div className="page-layout-content-box">
            <Outlet />
          </div>
        </Content>
        <RenderLayoutFooter />
      </Layout>
    </Layout>
  );
};
