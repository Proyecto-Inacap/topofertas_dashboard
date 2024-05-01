import { PERMISSIONS } from "@/permissions";
import {BarChart, LucideIcon} from 'lucide-react'

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
    icon: BarChart
  },
  {
    title: "Reportes",
    href: "/reports",
    permission: "DASHBOARD_MANAGER",
  },
  {
    title: "Categorias",
    href: "/categories",
    permission: "DASHBOARD_MANAGER",
  },
  {
    title: "Usuarios",
    href: "/users",
    permission: "DASHBOARD_MANAGER",
  },
  {
    title: "Tiendas",
    href: "/stores",
    permission: "DASHBOARD_MANAGER",
  },
  {
    title: "Cupones",
    href: "/coupons",
    permission: "DASHBOARD_MANAGER",
  },
];
