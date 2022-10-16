import { useState, useEffect, useMemo } from "react";
import {
  Table,
  Typography,
  Image,
  Toast,
  Space,
  Button,
  Popconfirm,
} from "@douyinfe/semi-ui";
import axios from "@/utils/axios";
import { IconPlus, IconDelete } from "@douyinfe/semi-icons";
import DialogAddSwiper from "@/components/dialogAddSwiper";

import "./index.less";

export default function App() {
  const { Text } = Typography;
  const [dataSource, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setPage] = useState(1);
  const [deleteIds, setDeleteIds] = useState<Array<number | string>>([]);
  const [total, setTotal] = useState(100);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const [operationType, setOperType] = useState("update"); // 默认操作类型是更新

  // 每次行选择重设新的选中数据
  const rowSelection = useMemo(
    () => ({
      onChange: (selectedRowKeys: number[] | string[]) => {
        setDeleteIds(selectedRowKeys);
      },
    }),
    []
  );

  // 批量删除分类信息
  const deleteCarousels = async (deleteId?: number) => {
    if (!deleteIds.length && !deleteId) return; // 判断删除列表是否为空以及是否传入要删除的ID
    try {
      const res = await axios.delete("/carousels", {
        data: { ids: !!deleteId ? [deleteId] : deleteIds },
      });
      Toast.success("删除成功");
    } catch (err) {
      Toast.error(`${err}`);
    }
  };

  const columns = [
    {
      title: "轮播图",
      dataIndex: "carouselUrl",
      render: (imgUrl: string) => {
        return <Image width={70} height={70} src={imgUrl} />;
      },
    },
    {
      title: "跳转链接",
      dataIndex: "redirectUrl",
      render: (link: string) => {
        return <Text link={{ href: link }}>{link}</Text>;
      },
    },
    {
      title: "排序值",
      dataIndex: "carouselRank",
      render: (text: number) => text,
      sorter: (a: number, b: number) => a - b,
    },
    {
      title: "添加时间",
      dataIndex: "createTime",
      sorter: (a: any, b: any) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
      render: (value: any) => value,
    },
    {
      title: "操作",
      dataIndex: "carouselId",
      render: (id: number, record: any) => {
        return (
          <Space>
            <Button
              theme="borderless"
              type="secondary"
              size="small"
              onClick={() => {
                setOperType("update");
                setDialogVisible(true);
                setDialogData(record);
              }}
            >
              修改
            </Button>
            <Popconfirm
              title="确定删除吗"
              content="删除后无法恢复"
              position="bottom"
              onConfirm={() => {
                deleteCarousels(id);
              }}
            >
              <Button theme="borderless" type="secondary" size="small">
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  // 请求数据
  const fetchData = async (page: number = 1) => {
    setLoading(true);
    try {
      const params = {
        pageNumber: page,
        pageSize: 10,
      };
      const data: any = await axios.get("/carousels", {
        params,
      });
      const { totalCount, currPage, list } = data;
      setPage(currPage);
      setTotal(totalCount);
      setData(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (page: number) => {
    fetchData(page);
  };

  return (
    <div className="swiper-wrapper">
      <div className="operation-container">
        <Space>
          <Button
            type="secondary"
            theme="solid"
            icon={<IconPlus />}
            onClick={() => {
              setOperType("add");
              setDialogVisible(true);
            }}
          >
            添加
          </Button>
          <Button
            type="danger"
            theme="solid"
            icon={<IconDelete />}
            onClick={() => {
              deleteCarousels();
            }}
          >
            批量删除
          </Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(record: any) => record.carouselId}
        rowSelection={rowSelection}
        pagination={{
          currentPage,
          pageSize: 10,
          total,
          onPageChange: handlePageChange,
        }}
        loading={loading}
      />

      <DialogAddSwiper
        visible={dialogVisible}
        swiperData={dialogData}
        setVisible={setDialogVisible}
        type={operationType}
      />
    </div>
  );
}
