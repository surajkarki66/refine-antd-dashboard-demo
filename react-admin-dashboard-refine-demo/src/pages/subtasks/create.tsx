import {
  Create,
  Form,
  Input,
  Select,
  useForm,
  useSelect,
} from "@pankod/refine-antd";

import { ISubTask, ITodo } from "../../interfaces/index";

export const SubtaskCreate = () => {
  const { formProps, saveButtonProps } = useForm<ISubTask>();
  const { selectProps: todoSelectProps } = useSelect<ITodo>({
    resource: "todos",
    optionLabel: "title",
    optionValue: "id",
    sort: [
      {
        field: "title",
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
          label="Todo"
          name={["todo"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...todoSelectProps} />
        </Form.Item>
      </Form>
    </Create>
  );
};
