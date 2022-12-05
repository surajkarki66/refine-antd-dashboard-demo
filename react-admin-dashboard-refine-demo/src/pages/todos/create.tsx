import {
  Create,
  Form,
  Input,
  Select,
  useForm,
  useSelect,
} from "@pankod/refine-antd";
import { IResourceComponentsProps } from "@pankod/refine-core";

import { ITodo, IUser } from "../../interfaces/index";

export const TodoCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<ITodo>();
  const { selectProps: userSelectProps } = useSelect<IUser>({
    resource: "users",
    optionLabel: "username",
    optionValue: "id",
    filters: [
      {
        field: "is_active",
        operator: "eq",
        value: true,
      },
    ],
    sort: [
      {
        field: "username",
        order: "asc",
      },
    ],
    onSearch: (value) => [
      {
        field: "search",
        operator: "contains",
        value,
      },
    ],
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
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
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label="Owner"
          name={["owner"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select filterOption={true} {...userSelectProps} />
        </Form.Item>
      </Form>
    </Create>
  );
};
