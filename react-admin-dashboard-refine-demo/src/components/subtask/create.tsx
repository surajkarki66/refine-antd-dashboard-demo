import {
  Create,
  Drawer,
  DrawerProps,
  Form,
  FormProps,
  Input,
  ButtonProps,
  Grid,
  Button,
  Icons,
} from "@pankod/refine-antd";
import { BaseKey, useCreate } from "@pankod/refine-core";

type CreateSubtaskProps = {
  drawerProps: DrawerProps;
  formProps: FormProps;
  saveButtonProps: ButtonProps;
  taskId?: BaseKey;
};

export const CreateSubtask: React.FC<CreateSubtaskProps> = ({
  drawerProps,
  formProps,
  taskId,
}) => {
  const breakpoint = Grid.useBreakpoint();
  const { mutate } = useCreate();
  const { form } = formProps;

  return (
    <Drawer
      {...drawerProps}
      width={breakpoint.sm ? "500px" : "100%"}
      bodyStyle={{ padding: 0 }}
      zIndex={1001}
    >
      <Create
        resource="subtasks"
        breadcrumb={null}
        actionButtons={
          <>
            <Button
              onClick={() => {
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
                      form?.resetFields(["title"]);
                    },
                  }
                );
              }}
              type="primary"
              icon={<Icons.SaveFilled />}
            >
              Save
            </Button>
          </>
        }
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
        </Form>
      </Create>
    </Drawer>
  );
};
