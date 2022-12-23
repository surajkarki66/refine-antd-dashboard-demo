import {
  List,
  DateField,
  Table,
  useTable,
  ShowButton,
  Space,
  EditButton,
  DeleteButton,
  BooleanField,
  Icons,
  FormProps,
  DatePicker,
  Form,
  Row,
  Col,
  Input,
  Select,
  Button,
  Card,
  ExportButton,
  useDrawerForm,
  Popover,
  Tag,
} from "@pankod/refine-antd";
import {
  CrudFilters,
  useExport,
  IResourceComponentsProps,
  usePermissions,
} from "@pankod/refine-core";
import { useState } from "react";

import { EditTodo } from "../../components/todo/index";
import { ITodo } from "../../interfaces/index";
import { randomHexColor } from "../../utility/randomRGBColor";

export const TodoList: React.FC<IResourceComponentsProps> = () => {
  const [deprecated, setDeprecated] = useState<
    "deleted" | "updated" | undefined
  >();
  const handleRefresh = () => {
    queryResult?.refetch();
    setDeprecated(undefined);
  };
  const { tableProps, searchFormProps, sorter, filters } = useTable<ITodo>({
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
  const { isLoading, triggerExport } = useExport<ITodo>({
    sorter,
    filters,
    mapData: (item) => {
      return {
        id: item.id,
        title: item.title,
        description: item.desc,
        is_completed: item.is_completed,
        created_at: item.created_at,
        updated_at: item.updated_at,
      };
    },
  });
  const { data: permissionsData } = usePermissions();

  const {
    drawerProps: editDrawerProps,
    formProps: editFormProps,
    saveButtonProps: editSaveButtonProps,
    deleteButtonProps,
    show: editShow,
    queryResult,
  } = useDrawerForm<ITodo>({
    action: "edit",
    resource: "todos",
    metaData: {populate: true},
    redirect: false,
    liveMode: "manual",
    onLiveEvent: (event) => {
      if (event.type === "deleted" || event.type === "updated") {
        setDeprecated(event.type);
      }
    },
  });

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xl={6} lg={24} xs={24}>
          <Card title="Filters">
            <Filter formProps={searchFormProps} />
          </Card>
        </Col>
        <Col xl={18} xs={24}>
          <List
            canCreate={permissionsData?.includes("admin")}
            headerButtons={({ defaultButtons }: any) => (
              <>
                {defaultButtons}
                <ExportButton onClick={triggerExport} loading={isLoading} />
              </>
            )}
          >
            <Table {...tableProps} rowKey="id">
              <Table.Column
                dataIndex="id"
                title="Id"
                sorter
                showSorterTooltip
              />
              <Table.Column
                dataIndex="title"
                title="Title"
                sorter
                showSorterTooltip
              />
              <Table.Column dataIndex={["owner", "username"]} title="Owner" />
              <Table.Column<ITodo>
                key="tags"
                dataIndex="tags"
                title="Tags"
                render={(_, record) => (
                  <Popover
                    content={
                      <>
                        {record.tags.map((tag) => (
                          <Tag color={randomHexColor()}>{tag.name}</Tag>
                        ))}
                      </>
                    }
                    title="Tags"
                    trigger="hover"
                  >
                    <Tag color={randomHexColor()}>{record.tags[0]?.name}</Tag>
                  </Popover>
                )}
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
                title="Created At"
                render={(value) => <DateField format="LLL" value={value} />}
                sorter
                showSorterTooltip
              />
              <Table.Column
                dataIndex="updated_at"
                title="Updated At"
                render={(value) => <DateField format="LLL" value={value} />}
                sorter
                showSorterTooltip
              />
              <Table.Column<ITodo>
                title="Actions"
                dataIndex="actions"
                render={(_text, record): React.ReactNode => {
                  return (
                    <Space>
                      <ShowButton
                        size="small"
                        recordItemId={record.id}
                        hideText
                      />
                      <EditButton
                        onClick={() => editShow(record.id)}
                        size="small"
                        recordItemId={record.id}
                        hideText
                      />
                      <DeleteButton
                        size="small"
                        recordItemId={record.id}
                        hideText
                      />
                    </Space>
                  );
                }}
              />
            </Table>
          </List>
        </Col>
      </Row>
      <EditTodo
        drawerProps={editDrawerProps}
        formProps={editFormProps}
        saveButtonProps={editSaveButtonProps}
        deleteButtonProps={deleteButtonProps}
        handleRefresh={handleRefresh}
        deprecated={deprecated}
      />
    </>
  );
};

const Filter: React.FC<{ formProps: FormProps }> = (props) => {
  const { RangePicker } = DatePicker;

  return (
    <Form layout="vertical" {...props.formProps}>
      <Row gutter={[10, 0]} align="bottom">
        <Col xs={24} xl={24} md={12}>
          <Form.Item label="Search" name="search">
            <Input
              placeholder="Title, Description, id"
              prefix={<Icons.SearchOutlined />}
            />
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
