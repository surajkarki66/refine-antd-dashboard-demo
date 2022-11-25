import { useShow, useOne } from "@pankod/refine-core";
import { Show, Typography, Tag } from "@pankod/refine-antd";

import { IPost, ICategory } from "interfaces";

const { Title, Text } = Typography;

export const PostShow = () => {
  const { queryResult } = useShow(); // used to fetch a single result

  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: categoryData } = useOne<ICategory>({
    // used to retrieve a single category from items. lowlevel than useShow()
    resource: "categories",
    id: record?.category.id || "",
    queryOptions: {
      enabled: !!record?.category.id,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>

      <Title level={5}>Status</Title>
      <Text>
        <Tag>{record?.status}</Tag>
      </Text>

      <Title level={5}>Category</Title>
      <Text>{categoryData?.data.title}</Text>
    </Show>
  );
};
