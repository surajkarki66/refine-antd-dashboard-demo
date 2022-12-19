import {
  List,
  DateField,
  Table,
  BooleanField,
  Icons,
  Space,
  useEditableTable,
  Form,
  Input,
  SaveButton,
  Button,
  ExportButton,
  FormProps,
  DatePicker,
  Row,
  Col,
  Select,
  Card,
  TextField,
} from "@pankod/refine-antd";
import {
  useExport,
  IResourceComponentsProps,
  CrudFilters,
  useMany,
} from "@pankod/refine-core";

import { ISubTask, ITodo } from "../../interfaces/index";
import { SubtaskActions } from "../../components/subtaskActions/index";

export const SubtaskList: React.FC<IResourceComponentsProps> = () => {
  const {
    tableProps,
    formProps,
    isEditing,
    saveButtonProps,
    cancelButtonProps,
    setId: setEditId,
    sorter,
    filters,
    searchFormProps,
  } = useEditableTable<ISubTask>({
    initialCurrent: 1,
    initialPageSize: 7,
    onSearch: (params: any) => {
      const filters: CrudFilters = [];
      const { search, created_at, updated_at, is_completed } = params;

      filters.push({
        field: "search",
        operator: "contains",
        value: search,
      });

      filters.push(
        {
          field: "created_at",
          operator: "gte",
          value: created_at
            ? created_at[0].startOf("day").toISOString()
            : undefined,
        },
        {
          field: "created_at",
          operator: "lte",
          value: created_at
            ? created_at[1].endOf("day").toISOString()
            : undefined,
        }
      );
      filters.push(
        {
          field: "updated_at",
          operator: "gte",
          value: updated_at
            ? updated_at[0].startOf("day").toISOString()
            : undefined,
        },
        {
          field: "updated_at",
          operator: "lte",
          value: updated_at
            ? updated_at[1].endOf("day").toISOString()
            : undefined,
        }
      );
      filters.push({
        field: "is_completed",
        operator: "eq",
        value: is_completed,
      });

      return filters;
    },
    syncWithLocation: false,
  });

  const { CloseCircleOutlined, CheckCircleOutlined } = Icons;
  const { triggerExport, isLoading } = useExport<ISubTask>({
    sorter,
    filters,
    mapData: (item) => {
      return {
        id: item.id,
        title: item.title,
        is_completed: item.is_completed,
        created_at: item.created_at,
        updated_at: item.updated_at,
      };
    },
  });
  const todoIds = tableProps?.dataSource?.map((item) => item.todo) ?? [];

  const { data, isLoading: isloading }: any = useMany<ITodo>({
    resource: "todos",
    ids: todoIds,
    queryOptions: {
      enabled: todoIds.length > 0,
    },
  });

  return (
    <Row gutter={[16, 16]}>
      <Col xl={6} lg={24} xs={24}>
        <Card title="Filters">
          <Filter formProps={searchFormProps} />
        </Card>
      </Col>{" "}
      <Col xl={18} xs={24}>
        <List
          headerButtons={({ defaultButtons }: any) => (
            <>
              {defaultButtons}
              <ExportButton onClick={triggerExport} loading={isLoading} />
            </>
          )}
        >
          <Form {...formProps}>
            <Table
              {...tableProps}
              rowKey="id"
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
                dataIndex="id"
                title="Id"
                sorter
                showSorterTooltip
              />
              <Table.Column
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
                dataIndex={["todo"]}
                title="Todo"
                render={(value) => {
                  if (isloading) {
                    return <TextField value="Loading..." />;
                  }

                  return (
                    <TextField
                      value={
                        data?.data?.find(
                          (item: { id: any }) => item.id === value
                        )?.title
                      }
                    />
                  );
                }}
              />

              <Table.Column
                dataIndex="is_completed"
                title="Status"
                render={(value) => (
                  <BooleanField
                    value={value === true}
                    trueIcon={<CheckCircleOutlined />}
                    falseIcon={<CloseCircleOutlined />}
                    valueLabelTrue="completed"
                    valueLabelFalse="incomplete"
                  />
                )}
              />
              <Table.Column
                dataIndex="created_at"
                title="CreatedAt"
                render={(value) => <DateField format="LLL" value={value} />}
                sorter
                showSorterTooltip
              />
              <Table.Column
                dataIndex="updated_at"
                title="UpdatedAt"
                render={(value) => <DateField format="LLL" value={value} />}
                sorter
                showSorterTooltip
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
                      <SubtaskActions record={record} />
                    </Space>
                  );
                }}
              />
            </Table>
          </Form>
        </List>
      </Col>
    </Row>
  );
};

const Filter: React.FC<{ formProps: FormProps }> = (props) => {
  const { RangePicker } = DatePicker;

  return (
    <Form layout="vertical" {...props.formProps}>
      <Row gutter={[10, 0]} align="bottom">
        <Col xs={24} xl={24} md={12}>
          <Form.Item label="Search" name="search">
            <Input placeholder="Title, id" prefix={<Icons.SearchOutlined />} />
          </Form.Item>
        </Col>
        <Col xs={24} xl={24} md={12}>
          <Form.Item label="Created At" name="created_at">
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Updated At" name="updated_at">
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={24} xl={24} md={8}>
          <Form.Item label="Status" name="is_completed">
            <Select
              allowClear
              placeholder="What is the status of todo?"
              options={[
                {
                  label: "Completed",
                  value: true,
                },
                {
                  label: "Not completed",
                  value: false,
                },
              ]}
            />
          </Form.Item>
        </Col>

        <Col xs={24} xl={24} md={8}>
          <Form.Item>
            <Button style={{ width: "100%" }} htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
