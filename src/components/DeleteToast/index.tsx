import { Popconfirm, Toast } from "@douyinfe/semi-ui";

const DeleteToast = () => {
  const onConfirm = () => {
    Toast.success("删除成功");
  };

  return (
    <Popconfirm
      title="确定删除吗"
      content="删除后无法恢复"
      onConfirm={onConfirm}
    />
  );
};

export default DeleteToast;
