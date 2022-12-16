import { useUpdate } from "@pankod/refine-core";
import { Dropdown, Icons, Menu } from "@pankod/refine-antd";

import { ISubTask } from "../../interfaces/index";

type SubtaskActionProps = {
  record: ISubTask;
};

export const SubtaskActions: React.FC<SubtaskActionProps> = ({ record }) => {
  const { mutate } = useUpdate();

  const moreMenu = (record: ISubTask) => (
    <Menu
      mode="vertical"
      onClick={({ domEvent }) => domEvent.stopPropagation()}
    >
      <Menu.Item
        key="completed"
        style={{
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
        }}
        disabled={record.is_completed === true}
        icon={
          <Icons.CheckCircleOutlined
            style={{
              color: "#52c41a",
              fontSize: 17,
              fontWeight: 500,
            }}
          />
        }
        onClick={() => {
          mutate({
            resource: "subtasks",
            id: record.id,
            values: {
              is_completed: true,
            },
          });
        }}
      >
        Completed
      </Menu.Item>
      <Menu.Item
        key="Not completed"
        style={{
          fontSize: 15,
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
        }}
        icon={
          <Icons.CloseCircleOutlined
            style={{
              color: "#EE2A1E",
              fontSize: 17,
            }}
          />
        }
        disabled={record.is_completed === false}
        onClick={() =>
          mutate({
            resource: "subtasks",
            id: record.id,
            values: {
              is_completed: false,
            },
          })
        }
      >
        Not completed
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={moreMenu(record)} trigger={["click"]}>
      <Icons.MoreOutlined
        onClick={(e) => e.stopPropagation()}
        style={{
          fontSize: 24,
        }}
      />
    </Dropdown>
  );
};
