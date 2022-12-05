import { useState, useEffect } from "react";
import { useGetIdentity, useList } from "@pankod/refine-core";

import {
  AntdLayout,
  Icons,
  Input,
  Avatar,
  Typography,
  Space,
  Grid,
  Row,
  Col,
  AutoComplete,
} from "@pankod/refine-antd";

import RefineReactRouter from "@pankod/refine-react-router-v6";
import "./style.less";

import debounce from "lodash/debounce";
import { ITodo, IUser } from "../../interfaces";

const { SearchOutlined } = Icons;
const { Text } = Typography;
const { useBreakpoint } = Grid;
const { Link } = RefineReactRouter;

interface IOptionGroup {
  value: string;
  label: string | React.ReactNode;
}

interface IOptions {
  label: string | React.ReactNode;
  options: IOptionGroup[];
}

export const Header: React.FC = () => {
  const { data: user } = useGetIdentity(); //useGetIdentity calls the getUserIdentity method from the `authProvider` under the hood.
  const screens = useBreakpoint();

  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<IOptions[]>([]);

  const renderTitle = (title: string) => (
    <div className="header-title">
      <Text style={{ fontSize: "16px", fontWeight: "bold" }}>{title}</Text>
      <Link style={{ float: "right" }} to={`/${title.toLowerCase()}`}>
        More
      </Link>
    </div>
  );
  const renderItem = (title: string, link: string) => ({
    value: title,
    label: (
      <Link to={link} style={{ display: "flex", alignItems: "center" }}>
        <Text style={{ marginLeft: "16px" }}>{title}</Text>
      </Link>
    ),
  });
  const { refetch: refetchTodos } = useList<ITodo>({
    resource: "todos",
    config: {
      filters: [{ field: "search", operator: "contains", value }],
    },
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        const todoOptionGroup = data.data.map((item) =>
          renderItem(`${item.title}`, `/todos/show/${item.id}`)
        );
        if (todoOptionGroup.length > 0) {
          setOptions((prevOptions) => [
            ...prevOptions,
            {
              label: renderTitle("Todos"),
              options: todoOptionGroup,
            },
          ]);
        }
      },
    },
  });
  const { refetch: refetchUsers } = useList<IUser>({
    resource: "users",
    config: {
      filters: [{ field: "search", operator: "contains", value }],
    },
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        const todoOptionGroup = data.data.map((item) =>
          renderItem(`${item.username}`, `/users/show/${item.id}`)
        );
        if (todoOptionGroup.length > 0) {
          setOptions((prevOptions) => [
            ...prevOptions,
            {
              label: renderTitle("Users"),
              options: todoOptionGroup,
            },
          ]);
        }
      },
    },
  });
  useEffect(() => {
    setOptions([]);
    setOptions([]);
    refetchTodos();
    refetchUsers();
  }, [value]);

  return (
    <AntdLayout.Header
      style={{
        padding: "0px 24px",
        height: "64px",
        backgroundColor: "#FFF",
      }}
    >
      <Row align="middle" justify={screens.sm ? "space-between" : "end"}>
        <Col xs={0} sm={12}>
          <AutoComplete
            dropdownClassName="header-search"
            style={{ width: "100%", maxWidth: "550px" }}
            options={options}
            filterOption={false}
            onSearch={debounce((value: string) => setValue(value), 300)}
          >
            <Input
              size="large"
              placeholder="Search"
              suffix={<SearchOutlined />}
            />
          </AutoComplete>
        </Col>
        <Col>
          <Space size="middle">
            {/* You can put locale changing dropdown here */}
            <Text ellipsis strong>
              {user?.username}
            </Text>
            <Avatar size="large" src={user?.avatar} alt={user?.username} />
          </Space>
        </Col>
      </Row>
    </AntdLayout.Header>
  );
};
