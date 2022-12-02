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
} from "@pankod/refine-antd";

type EditTodoProps = {
  drawerProps: DrawerProps;
  formProps: FormProps;
  saveButtonProps: ButtonProps;
  deleteButtonProps: ButtonProps;
};

export const EditTodo: React.FC<EditTodoProps> = ({
  drawerProps,
  formProps,
  saveButtonProps,
  deleteButtonProps,
}) => {
  const breakpoint = Grid.useBreakpoint();

  return (
    <Drawer
      {...drawerProps}
      width={breakpoint.sm ? "500px" : "100%"}
      bodyStyle={{ padding: 0 }}
      zIndex={1001}
    >
      <Edit
        saveButtonProps={saveButtonProps}
        pageHeaderProps={{ extra: null }}
        resource="todos"
        deleteButtonProps={deleteButtonProps}
      >
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
