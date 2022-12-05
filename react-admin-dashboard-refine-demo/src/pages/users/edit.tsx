import {
  useForm,
  Form,
  Input,
  Select,
  Edit,
  useSelect,
} from "@pankod/refine-antd";
import { usePermissions } from "@pankod/refine-core";
import { IUser } from "../../interfaces/index";

export const UserEdit: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IUser>(); // it also show query result of post while showing default post values
  const { data: permissionsData } = usePermissions();
  return (
    <Edit
      saveButtonProps={saveButtonProps}
      canDelete={permissionsData?.includes("admin")}
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Is Active"
          name="is_active"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                label: "Yes",
                value: true,
              },
              {
                label: "No",
                value: false,
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
