import ActionsDropDown from "@/components/table/ActionsDropDown";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { checkboxColumn, TooltipRender } from "@/utils/tables/renders";
import { ColumnDef } from "@tanstack/react-table";
import { InfoIcon } from "lucide-react";

import { commentApi } from "../comments/api/commentApi";
import { userApi } from "../users/api/userApi";
import { User } from "./types";

interface Props {
  mutate: () => void;
}

export const useColumns = ({ mutate }: Props) => {
  const { toast, toasts } = useToast();
  const isLoading = toasts.some((t) => t.toastType === "loading");

  const handleBanUser = async (id: string) => {
    const toaster = toast({
      toastType: "loading",
      description: "Baneando usuario",
    });
    try {
      const response = await userApi.ban(id);

      if (response.status !== 200) {
        throw new Error("Error al banear al usuario");
      }
      mutate();
      toaster.update({
        toastType: "success",
        description: "Usuario baneado",
      });
    } catch (error) {
      return toaster.update({ toastType: "error" });
    } 
  };

  const columns: ColumnDef<User>[] = [
    checkboxColumn,
    {
      header: "Username",
      cell: ({ row }) => {
        const value = row.original.username;
        return <TooltipRender value={value} />;
      },
    },
    {
      header: "Email",
      cell: ({ row }) => {
        const value = row.original.email;
        return <TooltipRender value={value} />;
      },
    },
    // {
    //   header: "Género",
    //   cell: ({ row }) => {
    //     const value = row.original?.gender || "No especificado";
    //     return <TooltipRender value={value} />;
    //   },
    // },
    {
      header: "Rol",
      cell: ({ row }) => {
        const value = row.original?.userRole.label || "No especificado";
        return <TooltipRender value={value} />;
      },
    },
    {
      header: "Estado",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge variant={!status ? "destructive" : "default"}>
            {!status ? "Inactivo" : "Activo"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;

        return (
          <ActionsDropDown disabled={!user.status || isLoading}>
            {user.status && (
              <DropdownMenuItem onClick={() => handleBanUser(user.id)}>
                Banear usuario
              </DropdownMenuItem>
            )}
            {/* 
            {comment.status && (
              <DropdownMenuItem onClick={() => handleBanComment(commentId)}>
                Eliminar Comentario
              </DropdownMenuItem>
            )}
            {report.status && (
              <DropdownMenuItem onClick={() => handleResolve(report.id)}>
                Resolver
              </DropdownMenuItem>
            )} */}
          </ActionsDropDown>
        );
      },
    },
  ];
  return columns;
};
