import {
  useForm,
  Form,
  Input,
  Select,
  Edit,
  useSelect,
  Alert,
  ListButton,
  RefreshButton,
} from "@pankod/refine-antd";
import { usePermissions } from "@pankod/refine-core";
import { useState } from "react";
import { IUser } from "../../interfaces/index";

export const UserEdit: React.FC = () => {
  const [deprecated, setDeprecated] = useState<
    "deleted" | "updated" | undefined
  >();
  const { formProps, saveButtonProps, queryResult } = useForm<IUser>({
    liveMode: "manual",
    onLiveEvent: (event) => {
      if (event.type === "deleted" || event.type === "updated") {
        setDeprecated(event.type);
      }
    },
  });

  const handleRefresh = () => {
    queryResult?.refetch();
    setDeprecated(undefined);
  };
  const { data: permissionsData } = usePermissions();
  return (
    <Edit
      saveButtonProps={saveButtonProps}
      canDelete={permissionsData?.includes("admin")}
    >
      {deprecated === "deleted" && (
        <Alert
          message="This user is deleted."
          type="warning"
          style={{ marginBottom: 20 }}
          action={<ListButton size="small" />}
        />
      )}
      {deprecated === "updated" && (
        <Alert
          message="This user is updated. Refresh to see changes."
          type="warning"
          style={{ marginBottom: 20 }}
          action={<RefreshButton size="small" onClick={handleRefresh} />}
        />
      )}
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
