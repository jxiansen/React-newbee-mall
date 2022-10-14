import { useState, useEffect, useMemo } from "react";
import {
  Table,
  Typography,
  Image,
  Toast,
  Space,
  Button,
} from "@douyinfe/semi-ui";
import DiablogSwiper from "./components/DiablogSwiper";
import DeletePopConfirm from "./components/DeletePopConfirm";
import ButtonAdd from "./components/ButtonAdd";
import axios from "@/utils/axios";
import "./index.less";

export default function App() {
  const { Text } = Typography;
  const [dataSource, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setPage] = useState(1);
  const [deleteIds, setDeleteIds] = useState<Array<number | string>>([]);
  const [total, setTotal] = useState(100);

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
  const batchDelete = async () => {
    try {
      const res = await axios.delete("/carousels", {
        data: { ids: deleteIds },
      });
      console.log(res);
      // if(res)
      Toast.success("删除成功");
    } catch (err) {}
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
          <div style={{ display: "flex" }}>
            <DiablogSwiper dataSource={record} type="set" />
            <DeletePopConfirm id={id} />
          </div>
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

  useEffect(() => {
    // console.log(dataSource);
  }, [dataSource]);

  return (
    <div className="swiper-wrapper">
      <div className="operation-container">
        <Space>
          <ButtonAdd />
          <Button type="warning" theme="solid" onClick={batchDelete}>
            批量删除
          </Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(record: any) => record.carouselId}
        pagination={{
          currentPage,
          pageSize: 10,
          total,
          onPageChange: handlePageChange,
        }}
        loading={loading}
        rowSelection={rowSelection}
        // className="table"
      />
    </div>
  );
}
