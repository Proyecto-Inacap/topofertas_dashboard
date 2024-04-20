import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { API } from "@/config";
import { checkboxColumn, TooltipRender } from "@/utils/tables/renders";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { EllipsisIcon, InfoIcon } from "lucide-react";

import { Report } from "./type";

interface Props {
  mutate: () => void;
}

export const useColumns = ({ mutate }: Props) => {
  const handleResolve = async (id: string) => {
    try {
      const response = await axios.patch(
        `/reports/${id}`,
        {
          status: true,
        },
        {
          baseURL: API.TOPOFERTAS,
        }
      );
      if (response.status !== 200)
        throw new Error("Error al resolver el reporte");
      mutate();
    } catch (error) {
      console.log(error);
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
          <Badge variant={status ? "default" : "destructive"}>
            {status ? "Resuelto" : "Pendiente"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const report = row.original;
        const user = report.comment.user;
        const comment = report.comment;
        return (
          <DropdownMenu >
            <DropdownMenuTrigger asChild disabled={report.status}>
              <Button variant="outline" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <EllipsisIcon className="h-4 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user.status && (
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(report.id)}
                >
                  Banear usuario
                </DropdownMenuItem>
              )}
              {comment.status && (
                <DropdownMenuItem>Eliminar Comentario</DropdownMenuItem>
              )}
              {!report.status && (
                <DropdownMenuItem onClick={() => handleResolve(report.id)}>
                  Resolver
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return columns;
};
