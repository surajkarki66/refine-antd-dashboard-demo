import "./style.less";

type TitleProps = {
  collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  return (
    <div className="Logo">
      {collapsed ? <>LOGO Here</> : <>You can put logo here</>}
    </div>
  );
};
