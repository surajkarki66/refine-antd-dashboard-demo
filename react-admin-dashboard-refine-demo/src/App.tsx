import React from "react";
import { newEnforcer } from "casbin";
import { Authenticated, Refine } from "@pankod/refine-core";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import { liveProvider } from "@pankod/refine-ably";
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

import { ablyClient } from "./utility";
import { CustomSider, CustomOffLayoutArea } from "./components/index";
import { authProvider } from "./providers/authProvider";
import { AuthPage } from "./pages/auth/index";
import { model, adapter } from "./providers/accessControl";
import { UserList, UserEdit, UserShow } from "./pages/users";
import { DashboardPage } from "./pages/dashboard/index";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Title, Header } from "./components/index";
import {
  TodoList,
  TodoShow,
  TodoCreate,
  CustomTodoCreate,
} from "./pages/todos";
import { SubtaskCreate, SubtaskList } from "./pages/subtasks";
import {
  CustomReadyPage,
  CustomFooter,
  CustomPage,
} from "./pages/custom/index";

const { RouterComponent } = routerProvider;

const CustomErrorPage = <div>Custom Error Page</div>;
const CustomRouterComponent = () => <RouterComponent basename="/admin" />; //Now we can access the homepage from www.domain.com/admin

const AuthenticatedCustomPage = () => {
  return (
    <Authenticated>
      <CustomPage />
    </Authenticated>
  );
};
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
            RouterComponent: CustomRouterComponent,
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
              {
                element: <AuthenticatedCustomPage />,
                path: "/custom-page",
                layout: true,
              },
            ],
          }}
          liveProvider={liveProvider(ablyClient)}
          LoginPage={Login}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            liveMode: "auto",
          }}
          resources={[
            // { name: "Tables" }, // Multi level menu
            {
              name: "users",
              // parentName: "Tables",
              list: UserList,
              edit: UserEdit,
              show: UserShow,
              canDelete: true,
              icon: <Icons.UsergroupAddOutlined />,
            },
            {
              name: "todos",
              // parentName: "Tables",
              list: TodoList,
              show: TodoShow,
              create: TodoCreate,
              canDelete: true,
              icon: <Icons.CarryOutOutlined />,
            },
            {
              name: "subtasks",
              // parentName: "Tables",
              list: SubtaskList,
              create: SubtaskCreate,
              canDelete: true,
              icon: <Icons.DownSquareOutlined />,
            },
          ]}
          Sider={CustomSider}
          DashboardPage={DashboardPage}
          Title={Title}
          Header={Header}
          Footer={CustomFooter}
          OffLayoutArea={() => <CustomOffLayoutArea />}
        />
      </ConfigProvider>
    </RefineKbarProvider>
  );
};

export default App;
