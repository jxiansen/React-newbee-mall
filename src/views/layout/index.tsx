import { Layout } from "@douyinfe/semi-ui";
import { IconBytedanceLogo } from "@douyinfe/semi-icons";
import { Outlet } from "react-router-dom";
import LayoutSider from "./components/Sider";
import LayoutHeader from "./components/Header";
import LayoutFooter from "./components/Footer";

import "./index.less";

export default () => {
  const { Content } = Layout;

  return (
    <Layout className="layout">
      <LayoutSider />
      <Layout>
        <LayoutHeader />
        <Content className="content">
          <div className="content-container">
            <Outlet />
          </div>
        </Content>
        <LayoutFooter />
      </Layout>
    </Layout>
  );
};
