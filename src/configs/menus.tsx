import { SidebarMenuType } from "@/components/DashboardLayout/types";
import { IconReceipt, IconReport } from "@tabler/icons-react";

export const menus: SidebarMenuType[] = [
  {
    label: "GNG Coupon Report",
    path: "/",
    icon: <IconReport size={16} />,
  },
  {
    label: "CCN Coupon Report",
    path: "/transactions",
    icon: <IconReceipt size={16} />,
  },
  {
    label: "Coupon List",
    path: "/coupons",
    icon: <IconReceipt size={16} />,
  }
];
