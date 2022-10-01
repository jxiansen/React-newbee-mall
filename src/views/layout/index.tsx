import { Layout } from "@douyinfe/semi-ui";
import { IconBytedanceLogo } from "@douyinfe/semi-icons";
import { Outlet } from "react-router-dom";
import CompSider from "./modules/CompSider";
import CompHeader from "./modules/CompHeader";
import "./index.less";

export default () => {
  const { Footer, Content } = Layout;

  return (
    <Layout className="layout">
      <CompSider />
      <Layout>
        <CompHeader />
        <Content className="content">
          <div className="content-container">
            <Outlet />
          </div>
        </Content>
        <Footer className="footer">
          <span
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconBytedanceLogo size="large" style={{ marginRight: "8px" }} />
            <span>Copyright © 2019 ByteDance. All Rights Reserved. </span>
          </span>
          <span>
            <span style={{ marginRight: "24px" }}>平台客服</span>
            <span>反馈建议</span>
          </span>
        </Footer>
      </Layout>
    </Layout>
  );
};
