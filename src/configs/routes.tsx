import DashboardLayout from "@/components/DashboardLayout";
import { ErrorPage } from "@/components/pages/ErrorPage";
import Login from "@/pages/auth/Login";
import { CouponList } from "@/pages/coupon/List";
import { ReportList } from "@/pages/gng/list";
import { PhotoList } from "@/pages/photo/List";
import { ScannerLayout } from "@/pages/qr-scanner";
import { QrScanner } from "@/pages/qr-scanner/QrScanner";
import { ScanErrorPage } from "@/pages/qr-scanner/ScanErrorPage";
import { SuccessPage } from "@/pages/qr-scanner/SuccessPage";
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
        element: <TransactionList />,
      },
      {
        path: "gng-reports",
        element: <ReportList />,
      },
      {
        path: "coupons",
        element: <CouponList />,
      },
      {
        path: "photos",
        element: <PhotoList />,
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
      {
        path: "error",
        element: <ScanErrorPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
