import { AuthPage as AntdAuthPage, AuthProps } from "@pankod/refine-antd";

const authWrapperProps = {
  style: {
    background:
      "radial-gradient(50% 50% at 50% 50%,rgba(255, 255, 255, 0) 0%,rgba(0, 0, 0, 0.5) 100%),url('images/login-bg.png')",
    backgroundSize: "cover",
  },
};

const RenderAuthContent = (content: React.ReactNode) => {
  return (
    <div
      style={{
        maxWidth: 408,
        margin: "auto",
      }}
    >
      {content}
    </div>
  );
};

export const AuthPage: React.FC<AuthProps> = ({ type, formProps }) => {
  return (
    <AntdAuthPage
      type={type}
      wrapperProps={authWrapperProps}
      renderContent={RenderAuthContent}
      formProps={formProps}
    />
  );
};
