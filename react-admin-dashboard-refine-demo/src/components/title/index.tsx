import "./style.less";

type TitleProps = {
  collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  return (
    <div className="logo">
      {collapsed ? (
        <img
          style={{ margin: "10px auto 10px", display: "block" }}
          src="/images/logo.svg"
          alt="Todo"
        />
      ) : (
        <img
          style={{ margin: "10px auto -20px", display: "block" }}
          src="/images/Logo.svg"
          alt="Todo"
        />
      )}
    </div>
  );
};
