import moment from "moment";
import {
  IResourceComponentsProps,
  usePermissions,
  useShow,
} from "@pankod/refine-core";
import {
  Row,
  Col,
  Card,
  Space,
  Avatar,
  Icons,
  Grid,
  List,
  Table,
  TextField,
  BooleanField,
  DateField,
  useTable,
  Typography,
} from "@pankod/refine-antd";
import { ITodo } from "../../interfaces/index";

const { useBreakpoint } = Grid;

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { xl } = useBreakpoint();
  const { CloseCircleOutlined, CheckCircleOutlined } = Icons;
  const { queryResult } = useShow(); // used to fetch a single result
  const { data } = queryResult;
  const record = data?.data;
  const { data: permissionsData } = usePermissions();
  const { tableProps } = useTable<ITodo>({
    resource: "todos",
    initialSorter: [
      {
        field: "created_at",
        order: "desc",
      },
    ],
    permanentFilter: [
      {
        field: "owner",
        operator: "eq",
        value: record?.id,
      },
    ],
    initialPageSize: 4,
    initialCurrent: 1,
    queryOptions: {
      enabled: record !== undefined,
    },
    syncWithLocation: false,
  });
  return (
    <>
      {" "}
      <Row gutter={[16, 16]}>
        <Col xl={6} lg={24} xs={24}>
          <Card bordered={false} style={{ height: "100%" }}>
            <Space
              direction="vertical"
              style={{ width: "100%", height: "100%" }}
            >
              <Space
                direction="vertical"
                style={{
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <Avatar size={120} src="https://i.pravatar.cc/150"></Avatar>
                <Typography.Title level={3}>
                  {record?.username}
                </Typography.Title>
              </Space>
              <Space
                direction="vertical"
                style={{
                  width: "100%",
                  textAlign: xl ? "unset" : "center",
                }}
              >
                <Typography.Text>
                  <Icons.MailOutlined /> {record?.email}
                </Typography.Text>
                <Typography.Text>
                  {" "}
                  {record?.is_active ? (
                    <>
                      <Icons.CheckOutlined />
                      Active
                    </>
                  ) : (
                    "Not active"
                  )}
                </Typography.Text>
                <Typography.Text>
                  <Icons.CalendarOutlined />{" "}
                  {moment(record?.created_at).format("MMMM Do YYYY")}
                </Typography.Text>
              </Space>
            </Space>
          </Card>
        </Col>
        <Col xl={18} xs={24}>
          <List
            title="Todos"
            pageHeaderProps={{
              extra: <></>,
            }}
            canCreate={permissionsData?.includes("admin")}
          >
            <Table rowKey="id" {...tableProps}>
              <Table.Column
                key="id"
                dataIndex="id"
                title="Id"
                sorter
                render={(value) => <TextField value={value} />}
              />
              <Table.Column
                key="title"
                dataIndex="title"
                title="Title"
                render={(value) => <TextField value={value} />}
                sorter
              />
              <Table.Column
                key="is_completed"
                dataIndex="is_completed"
                title="Status"
                render={(value) => {
                  return (
                    <BooleanField
                      value={value === true}
                      trueIcon={<CheckCircleOutlined />}
                      falseIcon={<CloseCircleOutlined />}
                      valueLabelTrue="completed"
                      valueLabelFalse="incomplete"
                    />
                  );
                }}
              />

              <Table.Column
                key="created_at"
                dataIndex="created_at"
                title="Created At"
                render={(value) => <DateField value={value} format="LLL" />}
                sorter
              />
              <Table.Column
                key="updated_at"
                dataIndex="updated_at"
                title="Updated At"
                render={(value) => <DateField value={value} format="LLL" />}
                sorter
              />
            </Table>
          </List>
        </Col>
      </Row>
    </>
  );
};
