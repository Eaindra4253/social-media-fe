import DashboardLayout from "@/components/DashboardLayout";
import { ErrorPage } from "@/components/pages/ErrorPage";
import Login from "@/pages/auth/Login";
import { ReportList } from "@/pages/reports/List";
import { TransactionList } from "@/pages/transactions/List";
import { createBrowserRouter } from "react-router-dom";
import { menus } from "./menus";
import { QrScanner } from "@/pages/qr-scanner/QrScanner";
import { SuccessPage } from "@/pages/SuccessPage";

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
      {
        path: "qr-scanner",
        element: <QrScanner />,
      },
      {
        path: "/success",
        element: <SuccessPage />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
