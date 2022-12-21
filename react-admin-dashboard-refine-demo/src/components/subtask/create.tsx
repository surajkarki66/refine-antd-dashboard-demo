import {
  Create,
  Form,
  FormProps,
  Input,
  ButtonProps,
  Button,
  Icons,
  Typography,
  DrawerProps,
  Drawer,
  Grid,
} from "@pankod/refine-antd";
import { BaseKey, useCreate } from "@pankod/refine-core";

type CreateSubtaskProps = {
  drawerProps: DrawerProps;
  formProps: FormProps;
  saveButtonProps: ButtonProps;
  taskId?: BaseKey;
  closeCreate: () => void;
};

export const CreateSubtask: React.FC<CreateSubtaskProps> = ({
  formProps,
  taskId,
  drawerProps,
  closeCreate,
}) => {
  const { mutate } = useCreate();
  const { form } = formProps;
  const breakpoint = Grid.useBreakpoint();

  const handleSubmit = async (e: any, isRedirect: boolean) => {
    e.preventDefault();
    mutate(
      {
        resource: "subtasks",
        values: {
          title: form?.getFieldValue("title"),
          todo: taskId,
        },
      },
      {
        onError: (error, variables, context) => {},
        onSuccess: (data, variables, context) => {
          form?.resetFields();
          if (isRedirect) {
            closeCreate();
          }
        },
      }
    );
  };
  return (
    <Drawer
      {...drawerProps}
      width={breakpoint.sm ? "500px" : "80%"}
      bodyStyle={{ padding: 0 }}
      zIndex={1001}
    >
      <Create
        resource="subtasks"
        breadcrumb={null}
        goBack={null}
        headerProps={{
          title: <Typography.Text>Add Subtask</Typography.Text>,
        }}
        footerButtons={() => (
          <>
            <Button
              onClick={(e) => handleSubmit(e, true)}
              type="primary"
              icon={<Icons.SaveFilled />}
            >
              Save
            </Button>
            <Button
              onClick={(e) => handleSubmit(e, false)}
              type="primary"
              icon={<Icons.SaveFilled />}
            >
              Save and add another
            </Button>
          </>
        )}
      >
        <Form form={form} layout="vertical">
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
      </Create>
    </Drawer>
  );
};
