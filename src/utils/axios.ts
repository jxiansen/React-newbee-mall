import axios from "axios";
import { localGet } from ".";

// 这边由于后端没有区分测试和正式，姑且都写成一个接口。
axios.defaults.baseURL = "http://81.68.86.225:28019/manage-api/v1";

// 请求头，headers 信息
// @ts-ignore
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
// @ts-ignore
axios.defaults.headers["token"] = localGet("token") || "";
// 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post["Content-Type"] = "application/json";

// 请求拦截器，内部根据返回值，重新组装，统一管理。
axios.interceptors.response.use((res) => {
  if (typeof res.data !== "object") {
    console.log("服务端异常！");
    return Promise.reject(res);
  }
  if (res.data.resultCode != 200) {
    if (res.data.message) console.log(res.data.message);
    // if (res.data.resultCode == 419) {
    //   router.push({ path: "/login" });
    // }
    return Promise.reject(res.data);
  }
  return res.data.data;
});

export default axios;
