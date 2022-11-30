import React from "react";
import { useLogin, useRouterContext } from "@pankod/refine-core";
import {
  Row,
  Col,
  AntdLayout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
} from "@pankod/refine-antd";
import "./styles.css";

const { Text, Title } = Typography;

export interface ILoginForm {
  email: string;
  username: string;
  password: string;
  remember: boolean;
}

export const Login: React.FC = () => {
  const [form] = Form.useForm<ILoginForm>();
  const { Link } = useRouterContext();
  const { mutate: login } = useLogin<ILoginForm>();

  const CardTitle = (
    <Title level={3} className="title">
      Sign in your account
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
              <Form<ILoginForm>
                layout="vertical"
                form={form}
                onFinish={(values) => {
                  login(values);
                }}
                requiredMark={false}
                initialValues={{
                  remember: false,
                }}
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
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      Remember me
                    </Checkbox>
                  </Form.Item>

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
                  Sign in
                </Button>
              </Form>
              <div style={{ marginTop: 8 }}>
                <Text style={{ fontSize: 12 }}>
                  Don’t have an account?{" "}
                  <Link to="/register" style={{ fontWeight: "bold" }}>
                    Sign up
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
