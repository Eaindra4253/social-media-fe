import { SidebarMenuType } from "@/components/DashboardLayout/types";
import { IconCamera, IconReceipt, IconReport } from "@tabler/icons-react";

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
    label: "QR Scanner",
    path: "/qr-scanner",
    icon: <IconCamera size={16} />
  }
];
