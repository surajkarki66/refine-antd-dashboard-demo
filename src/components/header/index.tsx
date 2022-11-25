import { useState, useEffect } from "react";
import { useGetIdentity } from "@pankod/refine-core";

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
import "./style.less";

import debounce from "lodash/debounce";

const { SearchOutlined } = Icons;
const { Text } = Typography;
const { useBreakpoint } = Grid;

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

  useEffect(() => {
    setOptions([]);
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
              {user?.name}
            </Text>
            <Avatar size="large" src={user?.avatar} alt={user?.name} />
          </Space>
        </Col>
      </Row>
    </AntdLayout.Header>
  );
};
