import {
  IResourceComponentsProps,
  useShow,
} from "@pankod/refine-core";
import { Typography, Show } from "@pankod/refine-antd";
import { ITag } from "../../interfaces/index";

const { Title, Text } = Typography;

export const TagShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<ITag>(); // used to fetch a single result
  const { data } = queryResult;
  const record = data?.data;
  return (
    <Show>
      <Title level={5}>Name</Title>
      <Text>{record?.name}</Text>
    </Show>
  );
};
