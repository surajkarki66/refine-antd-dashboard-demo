import {
  Form,
  FormProps,
  Input,
  ButtonProps,
  Icons,
  Typography,
  DrawerProps,
  Drawer,
  Grid,
  Edit,
} from "@pankod/refine-antd";

type EditSubtaskProps = {
  drawerProps: DrawerProps;
  formProps: FormProps;
  saveButtonProps: ButtonProps;
};

export const EditSubtask: React.FC<EditSubtaskProps> = ({
  formProps,
  drawerProps,
  saveButtonProps
}) => {
  const breakpoint = Grid.useBreakpoint();

  return (
    <Drawer
      {...drawerProps}
      width={breakpoint.sm ? "500px" : "80%"}
      bodyStyle={{ padding: 0 }}
      zIndex={1001}
    >
      <Edit
        resource="subtasks"
        breadcrumb={null}
        goBack={null}
        headerProps={{
          title: <Typography.Text>Edit Subtask</Typography.Text>,
        }}
        headerButtons={()=><></>}
        saveButtonProps={saveButtonProps}
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
            <Input
              prefix={<Icons.FileTextOutlined />}
              allowClear
              size="large"
            />
          </Form.Item>
        </Form>
      </Edit>
    </Drawer>
  );
};
