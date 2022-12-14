import React, { useState } from "react";
import {
  useTitle,
  ITreeMenu,
  CanAccess,
  useRouterContext,
  useRefineContext,
  useIsExistAuthentication,
  useLogout,
  useMenu,
  useSubscription,
} from "@pankod/refine-core";
import { AntdLayout, Menu, Grid, Sider, Badge } from "@pankod/refine-antd";
import {
  DashboardOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { antLayoutSider, antLayoutSiderMobile } from "./styles";

export const CustomSider: typeof Sider = ({ render }) => {
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const isExistAuthentication = useIsExistAuthentication();
  const { Link } = useRouterContext();
  const { mutate: mutateLogout } = useLogout();
  const Title = useTitle();
  const { menuItems, selectedKey, defaultOpenKeys } = useMenu();
  const { hasDashboard } = useRefineContext();
  const { SubMenu } = Menu;

  const breakpoint = Grid.useBreakpoint();

  const isMobile =
    typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

  useSubscription({
    channel: "resources/todos",
    types: ["created", "updated"],
    onLiveEvent: () => setSubscriptionCount((prev) => prev + 1),
  });

  const renderTreeView = (tree: ITreeMenu[], selectedKey: string) => {
    return tree.map((item: ITreeMenu) => {
      const { icon, label, route, name, children, parentName } = item;

      if (children.length > 0) {
        return (
          <SubMenu
            key={route}
            icon={icon ?? <UnorderedListOutlined />}
            title={label}
          >
            {renderTreeView(children, selectedKey)}
          </SubMenu>
        );
      }
      const isSelected = route === selectedKey;
      const isRoute = !(parentName !== undefined && children.length === 0);
      return (
        <CanAccess
          key={route}
          resource={name.toLowerCase()}
          action="list"
          params={{ resource: item }}
        >
          <Menu.Item
            key={route}
            style={{
              fontWeight: isSelected ? "bold" : "normal",
            }}
            icon={icon ?? (isRoute && <UnorderedListOutlined />)}
          >
            <div>
              <Link to={route}>{label}</Link>
              {label === "Todos" && (
                <Badge
                  size="small"
                  count={subscriptionCount}
                  offset={[2, -15]}
                />
              )}
              {!collapsed && isSelected && (
                <div className="ant-menu-tree-arrow" />
              )}
            </div>
          </Menu.Item>
        </CanAccess>
      );
    });
  };

  const logout = isExistAuthentication && (
    <Menu.Item
      key="logout"
      onClick={() => mutateLogout()}
      icon={<LogoutOutlined />}
    >
      Logout
    </Menu.Item>
  );

  const dashboard = hasDashboard ? (
    <Menu.Item
      key="dashboard"
      style={{
        fontWeight: selectedKey === "/" ? "bold" : "normal",
      }}
      icon={<DashboardOutlined />}
    >
      <Link to="/">Dashboard</Link>
      {!collapsed && selectedKey === "/" && (
        <div className="ant-menu-tree-arrow" />
      )}
    </Menu.Item>
  ) : null;

  const items = renderTreeView(menuItems, selectedKey);

  const renderSider = () => {
    if (render) {
      return render({
        dashboard,
        items,
        logout,
        collapsed,
      });
    }
    return (
      <>
        {dashboard}
        {items}
        {logout}
      </>
    );
  };

  return (
    <AntdLayout.Sider
      collapsible
      collapsedWidth={isMobile ? 0 : 80}
      collapsed={collapsed}
      breakpoint="lg"
      onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
      style={isMobile ? antLayoutSiderMobile : antLayoutSider}
    >
      {Title && <Title collapsed={collapsed} />}
      <Menu
        defaultOpenKeys={defaultOpenKeys}
        selectedKeys={[selectedKey]}
        mode="inline"
        onClick={() => {
          if (!breakpoint.lg) {
            setCollapsed(true);
          }
        }}
      >
        {renderSider()}
      </Menu>
    </AntdLayout.Sider>
  );
};
