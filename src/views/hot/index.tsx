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
import axios from "@/utils/axios";
import Loading from "@/components/Loading";
import { IconDelete } from "@douyinfe/semi-icons";
// import "./index.less";

const Hot = () => {
  const [dataSource, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setPage] = useState(1);
  const [imageVisible, setVisible] = useState(false);
  const [total, setTotal] = useState(100);
  const { Text } = Typography;

  /* {
    "configId": 786,
    "configName": "德国dm denkmit厕所马桶芳香除臭剂",
    "configType": 3,
    "goodsId": 11979,
    "redirectUrl": "##",
    "configRank": 200,
    "isDeleted": 0,
    "createTime": "2022-10-04 21:00:22",
    "createUser": 0,
    "updateTime": "2022-10-05 20:01:11",
    "updateUser": 0
} */
  const columns = [
    {
      title: "商品名称",
      dataIndex: "configName",
      // width: 200,
      render: (imgUrl: string) => {
        return imgUrl;
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
      dataIndex: "configRank",
      render: (text: number) => text,
      sorter: (a: number, b: number) => a - b,
    },
    {
      title: "商品编号",
      dataIndex: "goodsId",
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
      dataIndex: "configId",
      render: (id: number, record: any) => {
        return (
          <div style={{ display: "flex" }}>
            {/* <DiablogSetSwiper dataSource={record} /> */}
            <Popconfirm
              title="确定删除吗"
              content="删除后无法恢复"
              position="bottom"
              // onConfirm={() => {
              //   try {
              //     axios
              //       .delete("/carousels", {
              //         data: {
              //           ids: [id],
              //         },
              //       })
              //       .then((res) => {
              //         Toast.success("删除成功");
              //       });
              //   } catch (err) {
              //     console.log(err);
              //   }
              // }}
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
        configType: 3, // 热销商品
      };
      const data: any = await axios.get("/indexConfigs", {
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
};

export default Hot;
