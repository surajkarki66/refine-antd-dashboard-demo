import { Row, Col, Card, Typography } from "@pankod/refine-antd";
import { useApiUrl, useCustom } from "@pankod/refine-core";
import { ITodo } from "../../interfaces/index";
import { MyBarChart, MyAreaChart } from "../../components/dashboard/index";

export const DashboardPage: React.FC = () => {
  const API_URL = useApiUrl();
  const url = `${API_URL}/todos/todays-todo/`;
  const { isLoading } = useCustom<ITodo>({ url, method: "get" });

  return (
    <Row gutter={[16, 16]}>
      <Col md={24}>
        <Card
          loading={isLoading}
          bodyStyle={{
            height: 300,
            padding: 0,
          }}
          title={
            <Typography>
              <b>Area Chart</b>
            </Typography>
          }
        >
          <MyAreaChart />
        </Card>
      </Col>
      <Col md={24}>
        <Card
          bodyStyle={{
            height: 300,
            padding: 0,
          }}
          title={
            <Typography>
              <b>Bar Chart</b>
            </Typography>
          }
        >
          <MyBarChart />
        </Card>
      </Col>
    </Row>
  );
};
