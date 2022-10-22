import { Avatar, Form, Modal, Toast } from "@douyinfe/semi-ui";
import { IconUpload } from "@douyinfe/semi-icons";
import { useEffect, useRef, useState } from "react";
import { ResUploadImg } from "@/api/interface";
import { IMAGE_PREVIEW_PREFIX, IMAGE_UPLOAD_API } from "@/api/config";
import isURL from "validator/es/lib/isURL";
import axios from "@/utils/axios";

const DiablogSwiper = (props: any) => {
  const { swiperData, visible, setVisible, type, dispatchSetData } = props;
  const { carouselId, carouselUrl, redirectUrl, carouselRank } = swiperData;
  const [swiperUrl, setSwiperUrl] = useState("");

  useEffect(() => {
    setSwiperUrl(carouselUrl);
  }, [carouselUrl]);

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

  // 图片上传失败
  const handleUploadFail = () => {
    Toast.error("图片上传失败");
  };

  // 点击提交按钮
  const handleOk = () => {
    const oldValue = apiRef.current.getValues();
    const newData = {
      ...oldValue,
      carouselUrl: swiperUrl,
      carouselId,
    };
    swiperData ? updateCarousels(newData) : addCarousels();
    setVisible(false);
  };

  // 修改轮播图
  const updateCarousels = (payload: any) => {
    axios
      .put("/carousels", payload)
      .then((res) => {
        if (res === null) {
          Toast.success({
            content: "修改成功",
            duration: 1.5,
            onClose: () => {
              setVisible(false);
              dispatchSetData("update", payload);
            },
          });
        } else {
          Toast.error("修改失败");
        }
      })
      .catch((err) => {
        Toast.error(err);
      });
  };

  // 新增轮播图
  const addCarousels = () => {
    return;
  };

  return (
    <Modal
      title={type && type === "add" ? "添加轮播图" : "修改轮播图"}
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
          onError={handleUploadFail}
        >
          {type === "update" ? (
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
          defaultValue={type && type === "update" ? redirectUrl : ""}
          initValue={type && type === "update" ? redirectUrl : ""}
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
          defaultValue={type && type === "update" ? carouselRank : 0}
          initValue={type && type === "update" ? carouselRank : 0}
          style={{ width: 200 }}
        />
      </Form>
    </Modal>
  );
};

export default DiablogSwiper;
