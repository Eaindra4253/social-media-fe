import DashboardLayout from "@/components/DashboardLayout";
import { ErrorPage } from "@/components/pages/ErrorPage";
import Login from "@/pages/auth/Login";
import { QrScanner } from "@/pages/qr-scanner/QrScanner";
import { SuccessPage } from "@/pages/qr-scanner/SuccessPage";
import { ReportList } from "@/pages/reports/List";
import { TransactionList } from "@/pages/transactions/List";
import { createBrowserRouter } from "react-router-dom";
import { menus } from "./menus";
import { ScannerLayout } from "@/pages/qr-scanner";
import { CouponList } from "@/pages/coupon/List";

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
        path: "coupons",
        element: <CouponList />,
      },
    ],
  },
  {
    path: "qr-scanner",
    element: <ScannerLayout />,
    children: [
      {
        index: true,
        element: <QrScanner />,
      },
      {
        path: "success",
        element: <SuccessPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
