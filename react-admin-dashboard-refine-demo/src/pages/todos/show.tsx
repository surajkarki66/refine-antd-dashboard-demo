import moment from "moment";
import { Show, Typography, Icons } from "@pankod/refine-antd";
import { useShow, useOne, IResourceComponentsProps } from "@pankod/refine-core";

import { IUser } from "interfaces";

const { Title, Text } = Typography;

export const TodoShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: userData } = useOne<IUser>({
    resource: "users",
    id: record?.owner,
    queryOptions: {
      enabled: !!record?.owner,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>
      <Title level={5}>Description</Title>
      <Text>{record?.desc}</Text>
      <Title level={5}>Status</Title>
      <Typography.Text>
        {" "}
        {record?.is_completed ? (
          <>
            <Icons.CheckOutlined />
            Completed
          </>
        ) : (
          "Not completed"
        )}
      </Typography.Text>
      <Title level={5}>Owner</Title>
      <Text>{userData?.data.username}</Text>
      <Title level={5}>Joined</Title>
      <Typography.Text>
        <Icons.CalendarOutlined />{" "}
        {moment(record?.created_at).format("MMMM Do YYYY")}
      </Typography.Text>
    </Show>
  );
};
