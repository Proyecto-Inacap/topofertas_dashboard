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
];
