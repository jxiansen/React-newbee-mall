import { Button, Form, Modal, Toast } from "@douyinfe/semi-ui";
import { IconEdit, IconUpload } from "@douyinfe/semi-icons";
import { useState } from "react";
import { IMAGE_PREVIEW_PREFIX, IMAGE_UPLOAD_API } from "@/api/config";
import { ResUploadImg } from "@/api/interface";
import isURL from "validator/lib/isURL";
import axios from "axios";

const DiablogSetSwiper = ({ dataSource }: any) => {
  const { carouselId, carouselUrl, redirectUrl, carouselRank } = dataSource;
  const [visible, setVisible] = useState(false);
  const [swiperUrl, setSwiperUrl] = useState(carouselId);
  const showDialog = () => {
    setVisible(true);
  };

  const handleAfterClose = () => {
    handleSubmit();
    console.log("After Close callback executed");
  };

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
  const handleSubmit = async (val: any) => {
    try {
      const newData = {
        ...val,
        carouselUrl: swiperUrl,
        carouselId,
      };

      const resp = await axios.put("/manage-api/v1/carousels", newData);
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button icon={<IconEdit />} onClick={showDialog} />
      <Modal
        title="修改轮播图"
        visible={visible}
        onOk={() => {
          setVisible(false);
        }}
        afterClose={handleAfterClose} //>=1.16.0
        onCancel={() => {
          setVisible(false);
        }}
        closeOnEsc={true}
      >
        <Form
          labelPosition="left"
          labelWidth="120px"
          labelAlign="right"
          onSubmit={(val) => {
            handleSubmit(val);
          }}
          // key={labelPosition + labelAlign}
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
          <Button htmlType="submit">提交</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default DiablogSetSwiper;
