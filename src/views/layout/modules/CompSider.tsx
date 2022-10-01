import { Layout, Nav } from "@douyinfe/semi-ui";
import { useLocation, useNavigate } from "react-router-dom";
import {
  IconImage,
  IconUser,
  IconPlus,
  IconLive,
  IconStar,
  IconBriefcase,
  IconGridView,
} from "@douyinfe/semi-icons";

/*
 * items 是菜单栏的配置数组
 */
const items = [
  {
    itemKey: "1",
    text: "Dashboard",
    items: [
      {
        itemKey: "introduce",
        text: "系统介绍",
        icon: <IconLive size="large" />,
      },
      {
        itemKey: "Dashboard",
        text: "dashboard",
        icon: <IconLive size="large" />,
      },
      {
        itemKey: "add",
        text: "添加商品",
        icon: <IconPlus size="large" />,
      },
    ],
  },
  {
    itemKey: "2",
    text: "首页配置",
    items: [
      {
        itemKey: "swiper",
        text: "轮播图设置",
        icon: <IconImage size="large" />,
      },
      {
        itemKey: "hot",
        text: "热销商品配置",
        icon: <IconStar size="large" />,
      },
      {
        itemKey: "new",
        text: "新品上线配置",
        icon: <IconLive size="large" />,
      },
      {
        itemKey: "recommend",
        text: "为你推荐配置",
        icon: <IconLive size="large" />,
      },
    ],
  },
  {
    itemKey: "3",
    text: "模块管理",
    items: [
      {
        itemKey: "category",
        text: "分类管理",
        icon: <IconGridView size="large" />,
      },
      {
        itemKey: "good",
        text: "商品管理",
        icon: <IconBriefcase size="large" />,
      },
      {
        itemKey: "guest",
        text: "会员管理",
        icon: <IconUser size="large" />,
      },
      {
        itemKey: "order",
        text: "订单管理",
        icon: <IconLive size="large" />,
      },
    ],
  },
  {
    itemKey: "4",
    text: "系统管理",
    items: [
      {
        itemKey: "account",
        text: "修改密码",
        icon: <IconLive size="large" />,
      },
    ],
  },
];

export default () => {
  const { Sider } = Layout;
  let { pathname } = useLocation();
  const realPathName = pathname.replace("/", "");

  const navigate = useNavigate();
  return (
    <Sider style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
      <Nav
        defaultSelectedKeys={["Home"]}
        style={{ maxWidth: 220, height: "100%", overflow: "auto" }}
        items={items}
        header={{
          logo: (
            <img src="//lf1-cdn-tos.bytescm.com/obj/ttfe/ies/semi/webcast_logo.svg" />
          ),
          text: "React 商城后台",
        }}
        footer={{
          collapseButton: true,
        }}
        onClick={({ itemKey, isOpen }) => {
          if (!isOpen) {
            navigate(`${itemKey}`);
          }
        }}
      />
    </Sider>
  );
};
