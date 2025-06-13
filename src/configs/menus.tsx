import { SidebarMenuType } from "@/components/DashboardLayout/types";
import {
  IconDashboard,
  IconLock,
  IconPhoto,
  IconReceipt,
  IconReportAnalytics,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

export const menus: SidebarMenuType[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: <IconDashboard size={16} />,
  },
  {
    label: "CCN Report",
    path: "/ccn-reports",
    icon: <IconReportAnalytics size={16} />,
    permission: "COUPON_PURCHASE_LIST",
  },
  {
    label: "GNG Report",
    path: "/gng-reports",
    icon: <IconReportAnalytics size={16} />,
    permission: "AX_TRANSACTION_LIST",
  },
  {
    label: "PREMIER Monsoon Campaign Report",
    path: "/card-coupon",
    icon: <IconReportAnalytics size={16} />,
    permission: "PREMIER_LUCKY_DRAW",
  },
  {
    label: "Coupon List",
    path: "/coupons",
    icon: <IconReceipt size={16} />,
    permission: "COUPON_LIST",
  },
  {
    label: "Image List",
    path: "/photos",
    icon: <IconPhoto size={16} />,
    permission: "IMAGE_LIST",
  },
  {
    label: "Users",
    path: "/users",
    icon: <IconUsers size={16} />,
    permission: "USER_LIST",
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <IconSettings size={16} />,
    permission: "SETTINGS",
  },
  {
    label: "Roles",
    path: "/roles",
    icon: <IconSettings size={16} />,
    permission: "ROLE_LIST",
  },
  {
    label: "Permissions",
    path: "/permissions",
    icon: <IconLock size={16} />,
    permission: "PERMISSION_LIST",
  },
];
