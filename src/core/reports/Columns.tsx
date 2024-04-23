import ActionsDropDown from "@/components/table/ActionsDropDown";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { API } from "@/config";
import { checkboxColumn, TooltipRender } from "@/utils/tables/renders";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { InfoIcon } from "lucide-react";

import { Report } from "./type";
import { useToast } from "@/components/ui/use-toast";
import { userApi } from "../users/api/userApi";
import { commentApi } from "../comments/api/commentApi";
import { reportApi } from "./api/reportApi";

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

  const handleBanComment = async (id: string) => {
    const toaster = toast({
      toastType: "loading",
      description: "Eliminando comentario",
    });
    try {
      const response = await commentApi.ban(id);

      if (response.status !== 200) {
        throw new Error("Error al eliminar el comentario");
      }

      mutate();
      toaster.update({
        toastType: "success",
        description: "Comentario eliminado",
      });
    } catch (error) {
      return toaster.update({ toastType: "error" });
    }
  };

  const handleResolve = async (id: string) => {
    const toaster = toast({
      toastType: "loading",
      description: "Resolviendo reporte",
    });
    try {
      const response = await reportApi.update(id, { status: false });
      if (response.status !== 200) {
        throw new Error("Error al resolver el reporte");
      }

      mutate();
      toaster.update({
        toastType: "success",
        description: "Reporte resuelto",
      });
    } catch (error) {
      return toaster.update({ toastType: "error" });
    }
  };

  const columns: ColumnDef<Report>[] = [
    checkboxColumn,
    {
      header: "Usuario",
      cell: ({ row }) => {
        const value = row.original.user.username;
        return <TooltipRender value={value} />;
      },
    },
    {
      header: "Mensaje",
      accessorKey: "message",
      cell: ({ row }) => {
        const value = row.original.message;
        return <TooltipRender value={value} />;
      },
    },
    {
      header: "Tipo de reporte",
      cell: ({ row }) => {
        const value = row.original.reportType.type;
        return <TooltipRender value={value} />;
      },
    },
    {
      header: "Comentario",
      cell: ({ row }) => {
        const comment = row.original.comment;

        return (
          <div className="flex gap-2 items-center">
            <TooltipRender value={comment.comment} />
            {!comment.status && (
              <TooltipRender value="Comentario eliminado">
                <InfoIcon className="w-3 h-3" />
              </TooltipRender>
            )}
          </div>
        );
      },
    },
    // {
    //   header: "Comentario superior",
    //   cell: ({ row }) => {
    //     const value = row.original.comment.higherComment
    //       ? row.original.comment.higherComment.comment
    //       : "N/A";
    //     return <TooltipRender value={value} />;
    //   },
    // },
    {
      header: "Usuario reportado",
      cell: ({ row }) => {
        const user = row.original.comment.user;
        return (
          <div className="flex gap-2 items-center">
            <TooltipRender value={user.username} />
            {!user.status && (
              <TooltipRender value="Usuario baneado">
                <InfoIcon className="w-3 h-3" />
              </TooltipRender>
            )}
          </div>
        );
      },
    },
    {
      header: "Estado",
      accessorKey: "enabled",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge variant={status ? "destructive" : "default"}>
            {status ? "Pendiente" : "Resuelto"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const report = row.original;
        const userId = report.comment.userId;
        const user = report.comment.user;
        const commentId = report.commentId;
        const comment = report.comment;

        return (
          <ActionsDropDown disabled={!report.status || isLoading}>
            {user.status && (
              <DropdownMenuItem onClick={() => handleBanUser(userId)}>
                Banear usuario
              </DropdownMenuItem>
            )}
            {comment.status && (
              <DropdownMenuItem onClick={() => handleBanComment(commentId)}>
                Eliminar Comentario
              </DropdownMenuItem>
            )}
            {report.status && (
              <DropdownMenuItem onClick={() => handleResolve(report.id)}>
                Resolver
              </DropdownMenuItem>
            )}
          </ActionsDropDown>
        );
      },
    },
  ];
  return columns;
};
