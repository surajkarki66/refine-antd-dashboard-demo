import {
  Edit,
  Drawer,
  DrawerProps,
  Form,
  FormProps,
  Input,
  Radio,
  ButtonProps,
  Grid,
  Alert,
  RefreshButton,
  ListButton,
} from "@pankod/refine-antd";
import { usePermissions } from "@pankod/refine-core";

type EditTodoProps = {
  drawerProps: DrawerProps;
  formProps: FormProps;
  saveButtonProps: ButtonProps;
  deleteButtonProps: ButtonProps;
  handleRefresh: () => void;
  deprecated: "deleted" | "updated" | undefined;
};

export const EditTodo: React.FC<EditTodoProps> = ({
  drawerProps,
  formProps,
  saveButtonProps,
  deleteButtonProps,
  handleRefresh,
  deprecated,
}) => {
  const breakpoint = Grid.useBreakpoint();
  const { data: permissionsData } = usePermissions();

  return (
    <Drawer
      {...drawerProps}
      width={breakpoint.sm ? "500px" : "100%"}
      bodyStyle={{ padding: 0 }}
      zIndex={1001}
    >
      <Edit
        canDelete={permissionsData?.includes("admin")}
        saveButtonProps={saveButtonProps}
        pageHeaderProps={{ extra: null }}
        resource="todos"
        deleteButtonProps={deleteButtonProps}
      >
        {deprecated === "deleted" && (
          <Alert
            message="This todo is deleted."
            type="warning"
            style={{ marginBottom: 20 }}
            action={<ListButton size="small" />}
          />
        )}
        {deprecated === "updated" && (
          <Alert
            message="This todo is updated. Refresh to see changes."
            type="warning"
            style={{ marginBottom: 20 }}
            action={<RefreshButton size="small" onClick={handleRefresh} />}
          />
        )}
        <Form {...formProps} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="desc"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>
          <Form.Item label="Is completed" name="is_completed">
            <Radio.Group>
              <Radio value={true}>Completed</Radio>
              <Radio value={false}>Not Completed</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Edit>
    </Drawer>
  );
};
