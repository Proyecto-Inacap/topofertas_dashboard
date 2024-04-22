import { PERMISSIONS } from "@/permissions";

type NavLink = {
  title: string;
  href: string;
  permission: keyof typeof PERMISSIONS;
};

export const navLinks: NavLink[] = [
  {
    title: "Analítica",
    href: "/analytics",
    permission: "ALL",
  },
  {
    title: "Productos",
    href: "/products",
    permission: "DASHBOARD_MANAGER",
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
