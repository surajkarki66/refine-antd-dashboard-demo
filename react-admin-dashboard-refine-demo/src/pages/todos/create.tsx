import {
  Create,
  Form,
  Input,
  Select,
  SelectProps,
  useForm,
  useSelect,
} from "@pankod/refine-antd";
import {
  IResourceComponentsProps,
  useApiUrl,
  useCustom,
  HttpError,
} from "@pankod/refine-core";
import { useEffect, useState } from "react";

import { axiosInstance } from "../../providers/authProvider";
import {
  IDistrict,
  IProvince,
  ITag,
  ITodo,
  IUser,
  TodoUniqueCheckRequestQuery,
} from "../../interfaces/index";

export const TodoCreate: React.FC<IResourceComponentsProps> = () => {
  const [title, setTitle] = useState("");
  const [districtOptions, setDistrictOptions] = useState([]);
  const [provinceId, setProvinceId] = useState<SelectProps>();
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

  const { selectProps: tagSelectProps } = useSelect<ITag>({
    resource: "tags",
    optionLabel: "name",
    optionValue: "id",
    sort: [
      {
        field: "name",
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
  const { formProps, saveButtonProps } = useForm<ITodo>();
  const { selectProps: provinceSelectProps } = useSelect<IProvince>({
    resource: "provinces",
    optionLabel: "name",
    optionValue: "id",
    sort: [
      {
        field: "name",
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

  useEffect(() => {
    const getDistricts = async () => {
      const { data } = await axiosInstance.get(
        `/provinces/districts?province=${provinceId}`
      );
      const newData = data.map((d: IDistrict) => {
        return { label: d.name, value: d.id };
      });
      setDistrictOptions(newData);
    };
    if (provinceId) getDistricts();
  }, [provinceId]);

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
          label="Tag"
          name={["tags"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select mode="multiple" showSearch={true} {...tagSelectProps} />
        </Form.Item>
        <Form.Item
          label="Province"
          name="province"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            {...provinceSelectProps}
            onSelect={(value) => setProvinceId(value)}
          />
        </Form.Item>
        <Form.Item
          label="District"
          name="district"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            disabled={provinceId ? false : true}
            options={districtOptions}
          />
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
