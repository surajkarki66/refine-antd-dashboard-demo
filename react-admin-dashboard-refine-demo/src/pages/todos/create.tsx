import {
  Create,
  Form,
  Input,
  Select,
  useForm,
  useSelect,
  Button,
  Icons,
  Space,
} from "@pankod/refine-antd";
import {
  IResourceComponentsProps,
  useApiUrl,
  useCustom,
  HttpError,
  useCreate,
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
  console.log("Refetch", refetch);
  const { formProps } = useForm<ITodo>();
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
  const { form } = formProps;

  const { mutate } = useCreate();
  return (
    <Create
      actionButtons={
        <>
          <Button
            onClick={() => {
              mutate(
                {
                  resource: "todos",
                  values: {
                    title: form?.getFieldValue("title"),
                    desc: form?.getFieldValue("desc"),
                    owner: form?.getFieldValue("owner"),
                  },
                },
                {
                  onError: (error, variables, context) => {
                    // An error happened!
                  },
                  onSuccess: (data, variables, context) => {
                    if (form?.getFieldValue("subtasks")) {
                      // mutate subtask
                      mutate(
                        {
                          resource: "subtasks",
                          values: {
                            title: form?.getFieldValue("title"),
                            todo: data.data.id,
                          },
                        },
                        {
                          onError: (error, variables, context) => {
                            // An error happened!
                          },
                          onSuccess: (data, variables, context) => {
                            // Let's celebrate!
                          },
                        }
                      );
                    }
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
      //saveButtonProps={saveButtonProps}
    >
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
        <Form.List name={"subtasks"}>
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field, index) => {
                  return (
                    <Space
                      key={field.key}
                      direction="horizontal"
                      style={{
                        position: "relative",
                        marginRight: "13px",
                      }}
                    >
                      <Form.Item
                        name={field.name}
                        label={`subtask's title - ${index + 1}`}
                        style={{ width: "400px" }}
                        rules={[
                          {
                            required: true,
                            message: "please enter a title",
                          },
                          {
                            whitespace: true,
                          },
                        ]}
                        hasFeedback
                      >
                        <Input placeholder="title" />
                      </Form.Item>
                      <Button
                        danger
                        onClick={() => remove(field.name)}
                        style={{ marginTop: "5px" }}
                        icon={<Icons.DeleteOutlined />}
                      ></Button>
                    </Space>
                  );
                })}
                <Form.Item>
                  <Button
                    icon={<Icons.PlusOutlined />}
                    type="dashed"
                    block
                    style={{ maxWidth: "893px" }}
                    onClick={() => add()}
                  >
                    Add a subtask
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </Form>
    </Create>
  );
};
