import {
  Create,
  Form,
  FormProps,
  Input,
  ButtonProps,
  Button,
  Icons,
  Typography,
  notification,
} from "@pankod/refine-antd";
import { BaseKey, useCreate } from "@pankod/refine-core";

type CreateSubtaskProps = {
  formProps: FormProps;
  saveButtonProps: ButtonProps;
  taskId?: BaseKey;
};

export const CreateSubtask: React.FC<CreateSubtaskProps> = ({
  formProps,
  taskId,
}) => {
  const { mutate } = useCreate();
  const { form } = formProps;

  return (
    <Create
      resource="subtasks"
      breadcrumb={null}
      headerProps={{
        title: <Typography.Text>Add Subtask</Typography.Text>,
      }}
      footerButtons={() => (
        <>
          <Button
            onClick={async () => {
              mutate(
                {
                  resource: "subtasks",
                  values: {
                    title: form?.getFieldValue("title"),
                    todo: taskId,
                  },
                },
                {
                  onError: (error, variables, context) => {
                    console.error(error);
                    notification.error({
                      message: "Error !",
                      description: "Something went wrong!",
                    });
                  },
                  onSuccess: (data, variables, context) => {
                    form?.resetFields();
                    notification.success({
                      message: "Created !",
                      description: "Subtask is successfully added!",
                    });
                  },
                }
              );
            }}
            type="primary"
            htmlType="submit"
            icon={<Icons.SaveFilled />}
          >
            Save
          </Button>
        </>
      )}
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
          <Input prefix={<Icons.FileTextOutlined />} allowClear size="large" />
        </Form.Item>
      </Form>
    </Create>
  );
};
