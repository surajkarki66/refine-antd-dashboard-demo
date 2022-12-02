import React from "react";
import { Refine } from "@pankod/refine-core";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import {
  notificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
  ConfigProvider,
  Icons,
} from "@pankod/refine-antd";
import dataProvider from "./dataProvider";
import "@pankod/refine-antd/dist/styles.min.css";
import routerProvider from "@pankod/refine-react-router-v6";
import { authProvider } from "authProvider";
import { AuthPage } from "pages/auth";

import { UserList, UserEdit, UserShow } from "./pages/users";
import { Login } from "pages/login";
import { Register } from "pages/register";
import { Dashboard, Title, Header } from "components/index";
import { TodoList, TodoShow, TodoCreate } from "pages/todos";

const App: React.FC = () => {
  return (
    <RefineKbarProvider>
      <ConfigProvider>
        <Refine
          dataProvider={dataProvider("http://127.0.0.1:8000/api")}
          notificationProvider={notificationProvider}
          Layout={Layout}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          authProvider={authProvider}
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
          DashboardPage={Dashboard}
          Title={Title}
          Header={Header}
        />
      </ConfigProvider>
    </RefineKbarProvider>
  );
};

export default App;
