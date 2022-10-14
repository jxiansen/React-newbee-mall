import { Button, Popconfirm, Toast } from "@douyinfe/semi-ui";
import { IconDelete } from "@douyinfe/semi-icons";
import axios from "@/utils/axios";

const DeletePopConfirm = ({ id }: any) => {
  // 批量删除分类信息
  const deleteAllCarouses = () => {
    try {
      axios
        .delete("/carousels", {
          data: {
            ids: [id],
          },
        })
        .then((res) => {
          Toast.success("删除成功");
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Popconfirm
      title="确定删除吗"
      content="删除后无法恢复"
      position="bottom"
      onConfirm={deleteAllCarouses}
    >
      <Button icon={<IconDelete />} style={{ marginLeft: "10px" }} />
    </Popconfirm>
  );
};

export default DeletePopConfirm;
