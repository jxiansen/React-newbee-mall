import { Button, Layout, Nav } from "@douyinfe/semi-ui";
import { IconBell, IconHelpCircle } from "@douyinfe/semi-icons";
import { useLocation } from "react-router-dom";

import AvatarIcon from "./components/AvatarIcon";

// 字段映射
const headerTextMap = {
  introduce: "系统介绍",
  dashboard: "Dashboard",
  add: "添加商品",
  swiper: "轮播图设置",
  hot: "热销商品配置",
  new: "新品上线配置",
  recommend: "为你推荐配置",
  category: "分类管理",
  good: "商品管理",
  guest: "会员管理",
  order: "订单管理",
  account: "修改密码",
};

const LayoutHeader = () => {
  const { Header } = Layout;
  let { pathname } = useLocation();
  const realPathName = pathname.replace("/", "");

  return (
    <Header
      style={{
        backgroundColor: "var(--semi-color-bg-1)",
      }}
    >
      <Nav
        mode="horizontal"
        header={
          <h1>
            {/* @ts-ignore */}
            {headerTextMap[realPathName] ?? realPathName}
          </h1>
        }
        footer={
          <>
            <Button
              theme="borderless"
              icon={<IconBell size="large" />}
              style={{
                color: "var(--semi-color-text-2)",
                marginRight: "12px",
              }}
            />
            <Button
              theme="borderless"
              icon={<IconHelpCircle size="large" />}
              style={{
                color: "var(--semi-color-text-2)",
                marginRight: "12px",
              }}
            />
            <AvatarIcon />
          </>
        }
      ></Nav>
    </Header>
  );
};

export default LayoutHeader;
