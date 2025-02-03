import DashboardLayout from "@/components/DashboardLayout";
import { ErrorPage } from "@/components/pages/ErrorPage";
import Login from "@/pages/auth/Login";
import { ReportList } from "@/pages/reports/List";
import { TransactionList } from "@/pages/transactions/List";
import { createBrowserRouter } from "react-router-dom";
import { menus } from "./menus";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout menus={menus} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ReportList />,
      },
      {
        path: "transactions",
        element: <TransactionList />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
