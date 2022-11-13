import { Avatar, Dropdown, Form, Modal, Toast } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { IconUserSetting, IconUser, IconExit } from "@douyinfe/semi-icons";
import { useNavigate } from "react-router-dom";
import { newAccountInfo, newPasswordInfo, UserInfo } from "@/api/interface";
import axios from "@/utils/axios";
import { useRef } from "react";
import md5 from "js-md5";

const AvatarIcon = (props: any) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const formRef: any = useRef();
  const [userInfo, setInfo] = useState({
    adminUserId: 1,
    loginUserName: "admin",
    loginPassword: "******",
    nickName: "周盐祖",
    locked: 0,
  });
  const showDialog = () => {
    setVisible(true);
  };

  const handleOk = () => {
    const formApi = formRef.current;
    const { loginUserName, nickName, newPassword, originalPassword } =
      formApi.getValues();
    const userInfo = { loginUserName, nickName };
    console.log(userInfo);
    updateUserName(userInfo);

    if (newPassword && originalPassword) {
      if (newPassword === originalPassword) {
        formApi.setError("originalPassword", "旧密码和新密码不能相同");
      }

      const passwdInfo = {
        newPassword: md5(newPassword),
        originalPassword: md5(originalPassword),
      };
      updatePasswd(passwdInfo);
    }
    Toast.success("账户信息更新成功");
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
    console.log("Cancel button clicked");
  };

  const handleAfterClose = () => {
    console.log("After Close callback executed");
  };

  // 更新用户账号信息
  const updateUserName = async (payload: newAccountInfo) => {
    try {
      const result = await axios.put("/adminUser/name", payload);
    } catch (err) {
      console.log(err);
    }
  };

  // 更新用户密码
  const updatePasswd = async (payload: newPasswordInfo) => {
    try {
      const result = await axios.put("/adminUser/password", payload);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  // 获取用户信息
  const getUserInfo = async () => {
    try {
      const userInfo: UserInfo = await axios.get("/adminUser/profile");
      setInfo(userInfo);
    } catch (err) {
      console.log(err);
    }
  };

  // 退出登录
  const logOut = () => {
    try {
      axios.delete("/logout");
      Toast.success({
        content: "您已退出登录",
        duration: 2,
        onClose: () => {
          navigate("/login");
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Dropdown
        position={"bottomRight"}
        render={
          <Dropdown.Menu>
            <Dropdown.Item icon={<IconUser />}>个人信息</Dropdown.Item>
            <Dropdown.Item icon={<IconUserSetting />} onClick={showDialog}>
              更改账户
            </Dropdown.Item>
            <Dropdown.Item icon={<IconExit />} onClick={logOut}>
              退出登录
            </Dropdown.Item>
          </Dropdown.Menu>
        }
      >
        <Avatar color="orange" size="small">
          {userInfo.nickName}
        </Avatar>
      </Dropdown>
      <Modal
        title="修改账户信息"
        visible={visible}
        onOk={handleOk}
        afterClose={handleAfterClose}
        onCancel={handleCancel}
        closeOnEsc={true}
      >
        <Form
          labelPosition="left"
          labelWidth="100px"
          labelAlign="right"
          getFormApi={(formApi) => (formRef.current = formApi)}
          style={{ padding: "10px", width: 500 }}
        >
          <Form.Input
            field="loginUserName"
            label="登录名:"
            trigger="blur"
            initValue={userInfo.loginUserName}
            style={{ width: 250 }}
          />
          <Form.Input
            field="nickName"
            label="昵称:"
            trigger="blur"
            initValue={userInfo.nickName}
            style={{ width: 250 }}
          />
          <Form.Input
            field="originalPassword"
            label="原始密码:"
            mode="password"
            style={{ width: 250 }}
            placeholder="如无需修改可不填写"
            rules={[{ required: true, message: "密码不能为空" }]}
          />
          <Form.Input
            field="newPassword"
            mode="password"
            label="新密码:"
            style={{ width: 250 }}
            rules={[{ required: true, message: "密码不能为空" }]}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default AvatarIcon;
