import {
  Create,
  Form,
  Input,
  useForm,
} from "@pankod/refine-antd";

import { ITag} from "../../interfaces/index";

export const TagCreate = () => {
  const { formProps, saveButtonProps } = useForm<ITag>();
 
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
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
  );
};
