// 分页响应参数
export interface ResPage<T> {
  totalCount: number;
  pageSize: number;
  totalPage: number;
  currPage: number;
  list: T[];
}

// {
//   "carouselId": 8,
//   "carouselUrl": "http://backend-api-02.newbee.ltd/upload/20220420_11414333.png",
//   "redirectUrl": "888",
//   "carouselRank": 200,
//   "isDeleted": 0,
//   "createTime": "2022-10-03 07:47:24",
//   "createUser": 0,
//   "updateTime": "2022-10-03 07:47:24",
//   "updateUser": 0
// }

// 分页请求参数
export interface ReqPage {
  pageNumber: number;
  pageSize: number;
}

export interface ResUploadImg {
  "@collectionId": string;
  "@collectionName": string;
  created: Date;
  id: string;
  img: string;
  updated: Date;
}

export interface UserInfo {
  adminUserId: number;
  loginUserName: string;
  loginPassword: string;
  nickName: string;
  locked: number;
}

// 更新用户账户 payload
export interface newAccountInfo {
  loginUserName: "string";
  nickName: "string";
}

// 更新账户密码 payload
export interface newPasswordInfo {
  newPassword: "string";
  originalPassword: "string";
}
