import DashboardLayout from "@/components/DashboardLayout";
import { ErrorPage } from "@/components/pages/ErrorPage";
import Login from "@/pages/auth/Login";
import { CardCouponList } from "@/pages/card-coupon/List";
import { CouponList } from "@/pages/coupon/List";
import { DashboardPage } from "@/pages/dashboard";
import { ReportList } from "@/pages/gng/list";
import { PhotoList } from "@/pages/photo/List";
import { ScannerLayout } from "@/pages/qr-scanner";
import { QrScanner } from "@/pages/qr-scanner/QrScanner";
import { ScanErrorPage } from "@/pages/qr-scanner/ScanErrorPage";
import { SuccessPage } from "@/pages/qr-scanner/SuccessPage";
import { Settings } from "@/pages/settings/Settings";
import { TransactionList } from "@/pages/transactions/List";
import { ChangePasswordPage } from "@/pages/user/ChangePassword";
import { UserList } from "@/pages/user/List";
import { createBrowserRouter } from "react-router-dom";
import { menus } from "./menus";
import { PermissionsList } from "@/pages/permissions/List";
import { RolesList } from "@/pages/roles/List";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout menus={menus} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "ccn-reports",
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
        path: "card-coupon",
        element: <CardCouponList />,
      },
      {
        path: "photos",
        element: <PhotoList />,
      },
      {
        path: "users",
        element: <UserList />,
      },
      {
        path: "change-password",
        element: <ChangePasswordPage />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "permissions",
        element: <PermissionsList/>,
      },
      {
        path: "roles",
        element: <RolesList />,
      },
      {
        path: "*",
        element: <>Page Not Found</>,
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
