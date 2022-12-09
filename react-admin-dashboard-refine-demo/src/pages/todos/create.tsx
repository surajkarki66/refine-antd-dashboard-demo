import {
  Create,
  Form,
  Input,
  Select,
  useForm,
  useSelect,
} from "@pankod/refine-antd";
import {
  IResourceComponentsProps,
  useApiUrl,
  useCustom,
  HttpError,
} from "@pankod/refine-core";
import { useState } from "react";

import {
  ITodo,
  IUser,
  TodoUniqueCheckRequestQuery,
} from "../../interfaces/index";

export const TodoCreate: React.FC<IResourceComponentsProps> = () => {
  const [title, setTitle] = useState("");
  const apiUrl = useApiUrl();
  const url = `${apiUrl}/todos/getTodoByTitle/${title}/`;
  const { refetch } = useCustom<ITodo, HttpError, TodoUniqueCheckRequestQuery>({
    url,
    method: "get",
    config: {
      query: {
        title,
      },
    },
    queryOptions: {
      enabled: false,
    },
  });
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
            // {
            //   // Custom form validation
            //   validator: async (_, value) => {
            //     if (!value) return;
            //     const { data } = await refetch();
            //     if (data && data.data) {
            //       return Promise.reject(new Error("'title' must be unique"));
            //     }
            //     return Promise.resolve();
            //   },
            // },
          ]}
        >
          <Input onChange={(event) => setTitle(event.target.value)} />
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
