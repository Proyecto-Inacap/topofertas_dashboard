import {
  checkboxColumn,
  TooltipRender,
} from "@/utils/tables/renders";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Report } from "./type";

export const columns: ColumnDef<Report>[] = [
  checkboxColumn,
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
      const value = row.original.comment.comment;
      return <TooltipRender value={value} />;
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
    header: "Usuario",
    cell: ({ row }) => {
      const value = row.original.user.email;
      return <TooltipRender value={value} />;
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
];
