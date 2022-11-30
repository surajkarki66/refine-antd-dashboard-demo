import React from "react";
import { useRegister, useRouterContext } from "@pankod/refine-core";
import {
  Row,
  Col,
  AntdLayout,
  Card,
  Typography,
  Form,
  Input,
  Button,
} from "@pankod/refine-antd";
import "./styles.css";

const { Text, Title } = Typography;

export interface IRegisterForm {
  email: string;
  username: string;
  password: string;
}

export const Register: React.FC = () => {
  const [form] = Form.useForm<IRegisterForm>();
  const { Link } = useRouterContext();
  const { mutate: register } = useRegister<IRegisterForm>();

  const CardTitle = (
    <Title level={3} className="title">
      Sign up your account
    </Title>
  );

  return (
    <AntdLayout className="layout">
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Col xs={22}>
          <div className="container">
            <Card title={CardTitle} headStyle={{ borderBottom: 0 }}>
              <Form<IRegisterForm>
                layout="vertical"
                form={form}
                onFinish={(values) => {
                  register(values);
                }}
                requiredMark={false}
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true }]}
                >
                  <Input type="email" size="large" placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[{ required: true }]}
                >
                  <Input size="large" placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true }]}
                  style={{ marginBottom: "12px" }}
                >
                  <Input type="password" placeholder="●●●●●●●●" size="large" />
                </Form.Item>
                <div style={{ marginBottom: "12px" }}>
                  <Link
                    style={{
                      float: "right",
                      fontSize: "12px",
                    }}
                    to="/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button type="primary" size="large" htmlType="submit" block>
                  Sign up
                </Button>
              </Form>
              <div style={{ marginTop: 8 }}>
                <Text style={{ fontSize: 12 }}>
                  Already have an account?{" "}
                  <Link to="/login" style={{ fontWeight: "bold" }}>
                    Sign in
                  </Link>
                </Text>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </AntdLayout>
  );
};
