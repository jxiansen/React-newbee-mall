import { Layout } from "@douyinfe/semi-ui";
import { IconBytedanceLogo } from "@douyinfe/semi-icons";

const LayoutFooter = () => {
  const { Footer } = Layout;
  return (
    <Footer className="footer">
      <span
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconBytedanceLogo size="large" style={{ marginRight: "8px" }} />
        <span>Copyright © 2022 Mr-j All Rights Reserved. </span>
      </span>
      <span>
        <span style={{ marginRight: "24px" }}>平台客服</span>
        <span>反馈建议</span>
      </span>
    </Footer>
  );
};

export default LayoutFooter;
