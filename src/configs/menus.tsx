import { SidebarMenuType } from "@/components/DashboardLayout/types";
import { IconReceipt } from "@tabler/icons-react";

export const menus: SidebarMenuType[] = [
  {
    label: "CCN Coupon Report",
    path: "/",
    icon: <IconReceipt size={16} />,
  },
  {
    label: "Coupon List",
    path: "/coupons",
    icon: <IconReceipt size={16} />,
  },
  // {
  //   label: "Image List",
  //   path: "/photos",
  //   icon: <IconPhoto size={16} />,
  // },
];
