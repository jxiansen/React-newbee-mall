import { Button } from "@douyinfe/semi-ui";
import { IconPlus, IconDelete } from "@douyinfe/semi-icons";

// 添加组件
const ButtonAdd = () => {
  return (
    <Button type="secondary" theme="solid" icon={<IconPlus />}>
      添加
    </Button>
  );
};

export default ButtonAdd;
