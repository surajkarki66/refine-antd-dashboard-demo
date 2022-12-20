import moment from "moment";
import {
  Show,
  Typography,
  Icons,
  Row,
  Col,
  Card,
  Space,
  List,
  Table,
  TextField,
  BooleanField,
  DateField,
  useEditableTable,
  Form,
  Input,
  SaveButton,
  Button,
  Radio,
  DeleteButton,
  useForm,
} from "@pankod/refine-antd";
import { useShow, IResourceComponentsProps, useOne } from "@pankod/refine-core";

import { ISubTask, IUser } from "../../interfaces/index";
import { CreateSubtask } from "../../components/subtask";

const { Title, Text } = Typography;

export const TodoShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();

  const { data, isLoading } = queryResult;
  const record = data?.data;

  const userQueryResult = useOne<IUser>({
    resource: "users",
    id: record?.owner,
  });
  const {
    tableProps,
    formProps,
    isEditing,
    setId: setEditId,
    saveButtonProps,
    cancelButtonProps,
  } = useEditableTable<ISubTask>({
    resource: "subtasks",
    initialSorter: [
      {
        field: "created_at",
        order: "desc",
      },
    ],
    permanentFilter: [
      {
        field: "todo",
        operator: "eq",
        value: record?.id,
      },
    ],
    initialPageSize: 7,
    initialCurrent: 1,
    queryOptions: {
      enabled: record !== undefined,
    },
    syncWithLocation: false,
  });
  const user = userQueryResult.data?.data;
  const { formProps: createFormProps, saveButtonProps: createSaveButtonProps } =
    useForm<ISubTask>({
      action: "create",
      resource: "subtasks",
      redirect: "show",
      submitOnEnter: true,
    });

  return (
    <>
      {" "}
      <Row gutter={[16, 16]}>
        <Col xl={16} xs={24}>
          <Show isLoading={isLoading}>
            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>
            <Title level={5}>Description</Title>
            <Text>{record?.desc}</Text>
            <Title level={5}>Status</Title>
            <Typography.Text>
              {" "}
              {record?.is_completed ? (
                <>
                  <Icons.CheckOutlined />
                  Completed
                </>
              ) : (
                "Not completed"
              )}
            </Typography.Text>
            <Title level={5}>Joined</Title>
            <Typography.Text>
              <Icons.CalendarOutlined />{" "}
              {moment(record?.created_at).format("MMMM Do YYYY")}
            </Typography.Text>
          </Show>
        </Col>
        <Col xl={8} lg={24} xs={24}>
          <Card
            bordered={false}
            style={{ height: "100%" }}
            loading={userQueryResult?.isLoading}
          >
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
                <Typography.Title level={3}>
                  {" "}
                  <Icons.UserOutlined />
                  {user?.username}
                </Typography.Title>
              </Space>

              <CreateSubtask
                formProps={createFormProps}
                saveButtonProps={createSaveButtonProps}
                taskId={record?.id}
              />
            </Space>
          </Card>
        </Col>

        <Col xl={24} xs={24}>
          <List
            canCreate={false}
            title="Subtasks"
            breadcrumb={null}
            headerProps={{
              title: <Typography.Text>Current Subtasks</Typography.Text>,
            }}
          >
            <Form {...formProps}>
              <Table
                rowKey="id"
                {...tableProps}
                onRow={(record) => ({
                  // eslint-disable-next-line
                  onClick: (event: any) => {
                    if (event.target.nodeName === "TD") {
                      setEditId && setEditId(record.id);
                    }
                  },
                })}
              >
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
                  render={(value, data: ISubTask) => {
                    if (isEditing(data.id)) {
                      return (
                        <Form.Item name="title" style={{ margin: 0 }}>
                          <Input />
                        </Form.Item>
                      );
                    }
                    return value;
                  }}
                  sorter
                  showSorterTooltip
                />
                <Table.Column
                  key="is_completed"
                  dataIndex="is_completed"
                  title="Status"
                  render={(value, data: ISubTask) => {
                    if (isEditing(data.id)) {
                      return (
                        <Form.Item name="is_completed">
                          <Radio.Group>
                            <Radio value={true}>Completed</Radio>
                            <Radio value={false}>Not Completed</Radio>
                          </Radio.Group>
                        </Form.Item>
                      );
                    }
                    return (
                      <BooleanField
                        value={value === true}
                        trueIcon={<Icons.CheckCircleOutlined />}
                        falseIcon={<Icons.CloseCircleOutlined />}
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
                <Table.Column<ISubTask>
                  title="Actions"
                  dataIndex="actions"
                  render={(_text, record): React.ReactNode => {
                    if (isEditing(record.id)) {
                      return (
                        <Space>
                          <SaveButton {...saveButtonProps} size="small" />
                          <Button {...cancelButtonProps} size="small">
                            Cancel
                          </Button>
                        </Space>
                      );
                    }
                    return (
                      <Space>
                        {" "}
                        <DeleteButton
                          resourceNameOrRouteName="subtasks"
                          size="small"
                          recordItemId={record.id}
                          hideText
                        />
                      </Space>
                    );
                  }}
                />
              </Table>
            </Form>
          </List>
        </Col>
      </Row>
    </>
  );
};
