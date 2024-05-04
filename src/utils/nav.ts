import { PERMISSIONS } from "@/permissions";
import {BarChart, FlagTriangleRight, Grid2X2, Image, LucideIcon, ReceiptText, ScanBarcode, Store, User} from 'lucide-react'

type NavLink = {
  title: string;
  href: string;
  permission: keyof typeof PERMISSIONS;
  icon?: LucideIcon;
};

export const navLinks: NavLink[] = [
  {
    title: "Analítica",
    href: "/analytics",
    permission: "ALL",
    icon: BarChart
  },
  {
    title: "Productos",
    href: "/products",
    permission: "DASHBOARD_MANAGER",
    icon: ScanBarcode
  },
  {
    title: "Reportes",
    href: "/reports",
    permission: "DASHBOARD_MANAGER",
    icon: FlagTriangleRight
  },
  {
    title: "Categorias",
    href: "/categories",
    permission: "DASHBOARD_MANAGER",
    icon: Grid2X2
  },
  {
    title: "Usuarios",
    href: "/users",
    permission: "DASHBOARD_MANAGER",
    icon: User
  },
  {
    title: "Tiendas",
    href: "/stores",
    permission: "DASHBOARD_MANAGER",
    icon: Store

  },
  {
    title: "Cupones",
    href: "/coupons",
    permission: "DASHBOARD_MANAGER",
    icon: ReceiptText
  },
  {
    title: "Banners",
    href: "/banners",
    permission: "DASHBOARD_MANAGER",
    icon: Image
  },
];
