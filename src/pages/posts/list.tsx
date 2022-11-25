import {
  List,
  TagField,
  DateField,
  Table,
  useTable,
  TextField,
  FilterDropdown,
  Select,
  useSelect,
  ShowButton,
  Space,
  EditButton,
  DeleteButton,
} from "@pankod/refine-antd";
import { useMany, useTranslate } from "@pankod/refine-core";

import { IPost, ICategory } from "interfaces";

export const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();
  const t = useTranslate();

  const categoryIds =
    tableProps?.dataSource?.map((item) => item.category.id) ?? [];
  const { data: categoriesData, isLoading } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0, // Start fetching when the data is available
    },
  });

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="title" title="title" />
        <Table.Column
          dataIndex="status"
          title="status"
          render={(value) => <TagField value={value} />}
        />
        <Table.Column
          dataIndex="createdAt"
          title="createdAt"
          render={(value) => <DateField format="LLL" value={value} />}
        />
        <Table.Column
          dataIndex={["category", "id"]}
          title="category"
          render={(value) => {
            if (isLoading) {
              return <TextField value="Loading..." />;
            }

            return (
              <TextField
                value={
                  categoriesData?.data.find((item) => item.id === value)?.title
                }
              />
            );
          }}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Category"
                {...categorySelectProps}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          render={(_text, record): React.ReactNode => {
            return (
              <Space>
                <ShowButton size="small" recordItemId={record.id} hideText />
                <EditButton size="small" recordItemId={record.id} hideText />
                <DeleteButton size="small" recordItemId={record.id} hideText />
              </Space>
            );
          }}
        />
      </Table>
    </List>
  );
};
