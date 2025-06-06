import { SidebarMenuType } from "@/components/DashboardLayout/types";
import {
  IconDashboard,
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
  },
  {
    label: "GNG Report",
    path: "/gng-reports",
    icon: <IconReportAnalytics size={16} />,
  },
  {
    label: "Card Coupon Report",
    path: "/card-coupon",
    icon: <IconReportAnalytics size={16} />,
  },
  {
    label: "Coupon List",
    path: "/coupons",
    icon: <IconReceipt size={16} />,
  },
  {
    label: "Image List",
    path: "/photos",
    icon: <IconPhoto size={16} />,
  },
  {
    label: "Users",
    path: "/users",
    icon: <IconUsers size={16} />,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <IconSettings size={16} />,
  },
];
