import { Avatar, Form, Modal, Toast } from "@douyinfe/semi-ui";
import { IconUpload } from "@douyinfe/semi-icons";
import { useEffect, useRef, useState } from "react";
import { ResUploadImg } from "@/api/interface";
import { IMAGE_PREVIEW_PREFIX, IMAGE_UPLOAD_API } from "@/api/config";
import isURL from "validator/es/lib/isURL";
import axios from "@/utils/axios";

function SwiperModal(props: any) {
  const { item, visible, onClose, onRefresh } = props;
  const { carouselId, carouselUrl, redirectUrl, carouselRank } = item;
  const [swiperUrl, setSwiperUrl] = useState("");

  const apiRef: any = useRef();

  // 处理图片上传成功
  const handleUploadSuccess = (resp: ResUploadImg) => {
    if (!resp) return;

    const newUrl = [
      IMAGE_PREVIEW_PREFIX,
      resp["@collectionId"],
      resp["id"],
      resp["img"],
    ].join("/");

    Toast.success("图片上传成功");
    setSwiperUrl(newUrl);
  };

  // 点击提交按钮
  const handleOk = () => {
    const oldValue = apiRef.current.getValues();
    const newData = {
      ...oldValue,
      carouselUrl: swiperUrl,
      carouselId,
    };
    Object.keys(item).length ? updateCarousels(newData) : addCarousels(newData);
  };

  // 修改轮播图
  const updateCarousels = (payload: any) => {
    axios
      .put("/carousels", payload)
      .then((res) => {
        if (res === null) {
          onRefresh();
          Toast.success({
            content: "修改成功",
            duration: 1.5,
            onClose: onClose,
          });
        } else {
          Toast.error("修改失败");
        }
      })
      .catch((err) => {});
  };

  // 新增轮播图
  const addCarousels = (payload: any) => {
    const { carouselRank, carouselUrl, redirectUrl } = payload;
    
    axios
      .post("/carousels", {
        carouselRank,
        carouselUrl,
        redirectUrl,
      })
      .then((res) => {
        if (res === null) {
          onRefresh();
          Toast.success({
            content: "添加成功",
            duration: 1.5,
            onClose: onClose,
          });
        } else {
          Toast.error("添加失败");
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    setSwiperUrl(carouselUrl);
  }, [carouselUrl]);

  return (
    <Modal
      title={Object.keys(item).length ? "添加轮播图" : "修改轮播图"}
      closeOnEsc={true}
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
    >
      <Form
        labelPosition="left"
        labelWidth="120px"
        labelAlign="right"
        getFormApi={(formApi) => (apiRef.current = formApi)}
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
          onError={() => Toast.error("图片上传失败")}
        >
          {Object.keys(item).length ? (
            <Avatar
              size="extra-large"
              shape="square"
              src={carouselUrl}
              style={{ minHeight: "100px", minWidth: "100px" }}
            />
          ) : (
            <IconUpload size="extra-large" />
          )}
        </Form.Upload>

        <Form.Input
          field="redirectUrl"
          label="跳转链接"
          trigger="blur"
          style={{ width: 200 }}
          initValue={redirectUrl}
          rules={[
            {
              validator: (rule, value) => isURL(value),
              message: "链接地址错误,请检查",
            },
          ]}
        />
        <Form.InputNumber
          field="carouselRank"
          label="排序值"
          style={{ width: 200 }}
          initValue={carouselRank}
          rules={[
            {
              validator: (rule, value) => !!value,
              message: "排序值不能为空",
            },
          ]}
        />
      </Form>
    </Modal>
  );
}

export default SwiperModal;
