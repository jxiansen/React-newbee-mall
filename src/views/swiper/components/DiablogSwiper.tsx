import { Button, Form, Modal, Toast } from "@douyinfe/semi-ui";
import { IconEdit, IconUpload } from "@douyinfe/semi-icons";
import { IMAGE_PREVIEW_PREFIX, IMAGE_UPLOAD_API } from "@/api/config";
import { ResUploadImg } from "@/api/interface";
import { useRef, useState } from "react";
import isURL from "validator/es/lib/isURL";
import axios from "@/utils/axios";

/**
 * props 中传入数据源和类型,根据类型来判断组件是添加组件还是修改组件,
 * 默认是修改组件
 */

const DiablogSwiper = ({ dataSource, type }: any) => {
  const { carouselId, carouselUrl, redirectUrl, carouselRank } = dataSource;
  const [visible, setVisible] = useState(false);
  const [swiperUrl, setSwiperUrl] = useState(carouselId);
  const api: any = useRef();

  const showDialog = () => {
    setVisible(true);
  };

  // 处理图片上传成功
  const handleUploadSuccess = (resp: ResUploadImg) => {
    const newUrl = [
      IMAGE_PREVIEW_PREFIX,
      resp["@collectionId"],
      resp["id"],
      resp["img"],
    ].join("/");

    Toast.success("图片上传成功");
    setSwiperUrl(newUrl);
  };

  // 提交修改轮播图信息
  const handleOk = () => {
    try {
      const oldValue = api.current.getValues();
      const newData = {
        ...oldValue,
        carouselUrl: swiperUrl,
        carouselId,
      };

      axios.put("/carousels", newData).then(() => {
        Toast.success({
          content: "修改成功",
          duration: 2,
          onClose: () => {
            setVisible(false);
          },
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button icon={<IconEdit />} onClick={showDialog} />
      <Modal
        title={type === "add" ? "添加轮播图" : "修改轮播图"}
        visible={visible}
        onOk={handleOk}
        onCancel={() => {
          setVisible(false);
        }}
        closeOnEsc={true}
      >
        <Form
          labelPosition="left"
          labelWidth="120px"
          labelAlign="right"
          getFormApi={(formApi) => (api.current = formApi)}
          style={{ padding: "10px", width: 600 }}
        >
          <Form.Upload
            field="carouselUrl"
            label="图片"
            limit={1}
            fileName="img"
            listType="picture"
            action={IMAGE_UPLOAD_API}
            accept="image/*"
            onSuccess={handleUploadSuccess}
          >
            <IconUpload size="extra-large" />
          </Form.Upload>
          <Form.Input
            field="redirectUrl"
            label="跳转链接"
            trigger="blur"
            defaultValue={redirectUrl}
            initValue={redirectUrl}
            style={{ width: 200 }}
            rules={[
              {
                validator: (rule, value) => {
                  return isURL(value);
                },
                message: "链接地址错误,请检查",
              },
            ]}
          />
          <Form.InputNumber
            field="carouselRank"
            label="排序值"
            defaultValue={carouselRank}
            initValue={carouselRank}
            style={{ width: 200 }}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default DiablogSwiper;
