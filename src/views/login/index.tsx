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
import axios from "@/utils/axios";
import logo from "@/assets/mlogo.png";
import md5 from "js-md5";

const Login = () => {
  axios
    .post("/manage-api/v1/adminUser/login", {
      userName: "admin",
      passwordMd5: "e10adc3949ba59abbe56e057f20f883e",
    })
    .then((a) => {
      console.log(a);
    });
  const { Text, Title } = Typography;
  const { Header, Content } = Layout;

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
          <Form
            onSubmit={(oldVal) => {
              const { passwordMd5 } = oldVal;
              const newVal = {
                ...oldVal,
                passwordMd5: md5(passwordMd5),
              };
              console.log(newVal);
            }}
          >
            <Form.Input
              field="username"
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
