import React, { useEffect } from "react";
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
import dayjs from "dayjs";
import de_DE from "antd/lib/locale/de_DE";
import dataProvider from "./dataProvider";
import "@pankod/refine-antd/dist/styles.min.css";
import routerProvider from "@pankod/refine-react-router-v6";
import "styles/antd.less";
import "dayjs/locale/de";
import { useTranslation } from "react-i18next";
import { authProvider } from "authProvider";
import { AuthPage } from "pages/auth";

import { UserList, UserEdit, UserShow } from "./pages/users";
import { Login } from "pages/login";
import { Register } from "pages/register";
import { Dashboard, Title, Header } from "components/index";
import { TodoList } from "pages/todos";

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  const locale = i18nProvider.getLocale();
  useEffect(() => {
    if (locale === "de") {
      dayjs.locale("de");
    } else {
      dayjs.locale("en");
    }
  }, [locale]);
  return (
    <RefineKbarProvider>
      <ConfigProvider locale={locale === "de" ? de_DE : undefined}>
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
          // i18nProvider={i18nProvider} // need to set
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
