import React from "react";
import { newEnforcer } from "casbin";
import { Refine } from "@pankod/refine-core";
import { RefineKbar, RefineKbarProvider } from "@pankod/refine-kbar";
import {
  notificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
  ConfigProvider,
  Icons,
} from "@pankod/refine-antd";
import { DjangoDataProvider } from "./providers/dataProvider";
import "@pankod/refine-antd/dist/styles.min.css";
import routerProvider from "@pankod/refine-react-router-v6";

import { CustomSider } from "./components/index";
import { authProvider } from "./providers/authProvider";
import { AuthPage } from "./pages/auth/index";
import { model, adapter } from "./providers/accessControl";
import { UserList, UserEdit, UserShow } from "./pages/users";
import { DashboardPage } from "./pages/dashboard/index";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Title, Header } from "./components/index";
import { TodoList, TodoShow, TodoCreate } from "./pages/todos";

export const OffLayoutArea: React.FC = () => {
  return <RefineKbar />;
};

const CustomErrorPage = <div>Custom Error Page</div>;

const App: React.FC = () => {
  return (
    <RefineKbarProvider>
      <ConfigProvider direction={"ltr"}>
        <Refine
          dataProvider={DjangoDataProvider("http://127.0.0.1:8000/api")}
          notificationProvider={notificationProvider}
          Layout={Layout}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          authProvider={authProvider}
          accessControlProvider={{
            can: async ({ action, params, resource }) => {
              const enforcer = await newEnforcer(model, adapter);
              if (
                action === "delete" ||
                action === "edit" ||
                action === "show"
              ) {
                return Promise.resolve({
                  can: await enforcer.enforce(
                    localStorage.getItem("role"),
                    `${resource}/${params?.id}`,
                    action
                  ),
                });
              }
              if (action === "field") {
                return Promise.resolve({
                  can: await enforcer.enforce(
                    localStorage.getItem("role"),
                    `${resource}/${params?.field}`,
                    action
                  ),
                });
              }
              return Promise.resolve({
                can: await enforcer.enforce(
                  localStorage.getItem("role"),
                  resource,
                  action
                ),
              });
            },
          }}
          routerProvider={{
            ...routerProvider,
            routes: [
              {
                path: "/register",
                element: <Register />,
              },
              {
                path: "/forgot-password",
                element: <AuthPage type="forgotPassword" />,
              },
              {
                path: "/update-password",
                element: <AuthPage type="updatePassword" />,
              },
            ],
          }}
          LoginPage={Login}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
          resources={[
            {
              name: "users",
              list: UserList,
              edit: UserEdit,
              show: UserShow,
              canDelete: true,
              icon: <Icons.UsergroupAddOutlined />,
            },
            {
              name: "todos",
              list: TodoList,
              show: TodoShow,
              create: TodoCreate,
              canDelete: true,
              icon: <Icons.CarryOutOutlined />,
            },
          ]}
          Sider={CustomSider}
          DashboardPage={DashboardPage}
          Title={Title}
          Header={Header}
          OffLayoutArea={OffLayoutArea}
        />
      </ConfigProvider>
    </RefineKbarProvider>
  );
};

export default App;
