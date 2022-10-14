import {
  Button,
  Checkbox,
  Form,
  Layout,
  Nav,
  Typography,
} from "@douyinfe/semi-ui";
import { IconMail, IconKey, IconGithubLogo } from "@douyinfe/semi-icons";
import "./index.less";
import logo from "@/assets/mlogo.png";
import md5 from "js-md5";
import { useState } from "react";
import Loading from "../../components/Loading";
import { Toast } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
import { isToken } from "@/utils";
import axios from "@/utils/axios";

// 登录表单接口
interface Login {
  userName: string;
  passwordMd5: string;
}

const Login = () => {
  const { Text, Title } = Typography;
  const { Header, Content } = Layout;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (loginForm: Login) => {
    try {
      setLoading(true);
      const { passwordMd5 } = loginForm;
      const newVal = {
        ...loginForm,
        passwordMd5: md5(passwordMd5),
      };
      const result = await axios.post("/adminUser/login", newVal);
      if (isToken(result)) {
        localStorage.token = result;
        Toast.success({
          content: "登录成功",
          duration: 1,
          onClose: () => {
            navigate("/introduce");
          },
        });
      } else {
        Toast.error(result);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="loginWrapper">
      <Header className="header">
        <Nav mode="horizontal" defaultSelectedKeys={["Home"]}>
          <Nav.Header>
            <img src={logo} alt="logo" className="logo" />
          </Nav.Header>
          <Nav.Footer>
            <Button
              theme="borderless"
              icon={<IconGithubLogo size="large" />}
              style={{
                color: "var(--semi-color-text-2)",
              }}
              size="large"
              onClick={() => {
                document.location = "https://www.github.com/jxiansen";
              }}
            />
            <Title
              heading={3}
              style={{
                color: "#1baeae",
              }}
            >
              新峰商城
              <Text type="secondary">React18 后台管理系统</Text>
            </Title>
          </Nav.Footer>
        </Nav>
      </Header>
      <Content className="content">
        <div className="formContainer">
          <h2 className="mb15">后台登录</h2>
          <Form onSubmit={onFinish}>
            <Form.Input
              field="userName"
              noLabel={true}
              prefix={<IconMail />}
              placeholder="请输入注册账号"
              className="inputStyle"
            />
            <Form.Input
              field="passwordMd5"
              mode="password"
              defaultValue="123456"
              noLabel={true}
              prefix={<IconKey />}
              placeholder="请输入密码"
              className="inputStyle"
            />
            <Button
              htmlType="submit"
              size="large"
              theme="solid"
              block
              className="m15"
              loading={loading}
            >
              登录
            </Button>
          </Form>
          <div className="extraLabel">
            <Text type="secondary">
              登录表示您已同意 <Text link={{ href: "#" }}>《服务条款》</Text>
            </Text>
            <Checkbox
              onChange={(checked) => console.log(checked)}
              aria-label="Checkbox 示例"
            >
              <Text link={{ href: "#" }}>下次自动登录</Text>
            </Checkbox>
          </div>
        </div>
      </Content>
    </Layout>
  );
};
export default Login;
