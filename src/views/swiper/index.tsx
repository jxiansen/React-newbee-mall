import { useState, useEffect } from "react";
import {
  Table,
  Typography,
  Button,
  Popconfirm,
  Image,
  Toast,
  Modal,
} from "@douyinfe/semi-ui";
import * as dateFns from "date-fns";
import "./index.less";
import axios from "../../utils/axios";
import Loading from "../../components/Loading";
import { ResPage } from "../../api/interface";
import { IconDelete, IconChevronDown } from "@douyinfe/semi-icons";
import DiablogSetSwiper from "./module/DiablogSetSwiper";

export default function App() {
  const [dataSource, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setPage] = useState(1);
  const [imageVisible, setVisible] = useState(false);
  const [total, setTotal] = useState(100);
  const { Text } = Typography;
  // const rowSelection = useMemo(
  //   () => ({
  //     onChange: (selectedRowKeys, selectedRows) => {
  //       console.log(
  //         `selectedRowKeys: ${selectedRowKeys}`,
  //         "selectedRows: ",
  //         selectedRows
  //       );
  //     },
  //     getCheckboxProps: (record) => ({
  //       disabled: record.name === "Michael James", // Column configuration not to be checked
  //       name: record.name,
  //     }),
  //   }),
  //   []
  // );
  // const scroll = useMemo(() => ({ y: 300 }), []);

  const columns = [
    {
      title: "轮播图",
      dataIndex: "carouselUrl",
      // width: 200,
      render: (imgUrl: string) => {
        return <Image width={70} height={70} src={imgUrl} />;
      },
    },
    {
      title: "跳转链接",
      dataIndex: "redirectUrl",
      // width: 200,
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
            <DiablogSetSwiper dataSource={record} />
            <Popconfirm
              title="确定删除吗"
              content="删除后无法恢复"
              position="bottom"
              onConfirm={() => {
                try {
                  axios
                    .delete("/manage-api/v1/carousels", {
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
              }}
            >
              <Button icon={<IconDelete />} style={{ marginLeft: "10px" }} />
            </Popconfirm>
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
      const data: any = await axios.get("/manage-api/v1/carousels", {
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
    console.log(dataSource);
  }, [dataSource]);

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={{
        currentPage,
        pageSize: 10,
        total,
        onPageChange: handlePageChange,
      }}
      loading={loading}
      // rowSelection={rowSelection}
      // scroll={scroll}
      // className="table"
    />
  );
}
