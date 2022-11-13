import { useState, useEffect } from "react";
import {
  Table,
  Typography,
  Image,
  Toast,
  Space,
  Button,
  Popconfirm,
} from "@douyinfe/semi-ui";
const { Text } = Typography;
import { IconPlus, IconDelete } from "@douyinfe/semi-icons";
import axios from "@/utils/axios";
import SwiperModal from "@/views/swiper/swiperModal";
import "./index.less";

export default function App() {
  const [dataSource, setData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setPage] = useState(1);
  const [deleteIds, setDeleteIds] = useState<Array<number | string>>([]);
  const [total, setTotal] = useState(100);
  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState({});

  const dispatchSetData = (action: string, payload?: any) => {
    let newData = [...dataSource];
    switch (action) {
      case "add":
        if (payload && typeof payload === "object") {
          newData.push(payload);
        }
        break;
      case "delete":
        // payload为 idList
        const deleteIds =
          Array.isArray(payload) && payload.length
            ? payload
            : [payload].flat(1);
        newData = dataSource.filter(
          (item) => !deleteIds.includes(item.carouselId)
        );
        break;
      case "update":
        // payload为更新的目标 item
        const { carouselId } = payload;
        const targetIdx =
          carouselId &&
          dataSource.findIndex((row) => row.carouselId === carouselId);
        newData[targetIdx] = Object.assign({}, newData[targetIdx], payload);
        break;
      default:
        break;
    }
    setData(newData);
  };

  // 每次行选择重设新的选中数据
  const rowSelection = {
    onChange: (selectedRowKeys: any) => {
      setDeleteIds(selectedRowKeys);
    },
  };

  // 批量删除分类信息
  const deleteCarousels = (deleteId?: number) => {
    if (!deleteIds.length && !deleteId) return; // 判断删除列表是否为空以及是否传入要删除的ID
    axios
      .delete("/carousels", {
        data: { ids: !!deleteId ? [deleteId] : deleteIds },
      })
      .then((res) => {
        if (res === null) {
          Toast.success({
            content: "删除成功",
            duration: 1.5,
            onClose: () => {
              dispatchSetData("delete", deleteId ? deleteId : deleteIds);
            },
          });
        } else {
          Toast.error("删除失败");
        }
      })
      .catch((err) => {
        Toast.error(`${err}`);
      });
  };

  // 请求数据
  const fetchData = async (page: number = 1) => {
    setLoading(true);
    const params = {
      pageNumber: page,
      pageSize: 10,
    };
    axios
      .get("/carousels", {
        params,
      })
      .then((res: any) => {
        if (res) {
          const { totalCount, currPage, list } = res;
          setPage(currPage);
          setTotal(totalCount);
          setData(list);
          setLoading(false);
        }
      })
      .catch((err) => {});
  };

  const handlePageChange = (page: number) => {
    fetchData(page);
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
                setItem(record);
                setModalVisible(true);
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="swiper-wrapper">
      <div className="operation-container">
        <Space>
          <Button
            type="secondary"
            theme="solid"
            icon={<IconPlus />}
            onClick={() => {
              setItem({});
              setModalVisible(true);
            }}
          >
            添加
          </Button>
          <Button
            type="danger"
            theme="solid"
            icon={<IconDelete />}
            onClick={() => deleteCarousels()}
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

      <SwiperModal
        visible={modalVisible}
        item={item}
        onClose={() => setModalVisible(false)}
        onRefresh={fetchData}
      />
    </div>
  );
}
