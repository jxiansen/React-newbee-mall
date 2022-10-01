import { Spin } from "@douyinfe/semi-ui";
import "./index.less";

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <Spin tip="加载中..." size="large">
        <h1 className="loading-text">{randomPoem(poems)}</h1>
      </Spin>
    </div>
  );
};

export default Loading;

// 诗句集
const poems = [
  "生有热烈，藏与俗常。",
  "花店不开了，花继续开",
  "你仅是你，万人非你。",
  "你仅是你，万人非你。",
  "一大堆平凡的日子拥挤在未来。",
  "活着就意味必须要做点什么，请好好努力。",
  "天空一无所有，为何给我安慰。",
  "一个人的行走范围，就是他的世界。",
  "有些人能感受雨，而其他人则只是被淋湿。",
  "我们终其一生,就是要摆脱别人的期待，找到真正的自己。",
  "人生碌碌，竞短论长，却不道荣枯有数，得失难量。",
  "自己有了光芒才配得上自己追逐的星星.",
];

/**
 * 随机诗句
 */
const randomPoem = (arr: string[]) => {
  let len = arr.length;
  const idx = ~~(Math.random() * len);
  return arr[idx];
};
