import { PERMISSIONS } from "@/permissions";
import { ReactNode } from "react";

export interface HasPermissionsProps {
  permission: keyof typeof PERMISSIONS;
  role?: number;
  children?: ReactNode;
}

export const HasPermissions = ({ role, permission,children }: HasPermissionsProps) => {
    return Boolean(PERMISSIONS[permission].includes(Number(role)));
};
