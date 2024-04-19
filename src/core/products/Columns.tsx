import {
  checkboxColumn,
  renderLink,
  renderPrice,
  TooltipRender,
} from "@/utils/tables/renders";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Product>[] = [
  checkboxColumn,
  {
    header: "Nombre",
    accessorKey: "name",
    cell: ({ row }) => {
      const name = row.original.name;
      return <TooltipRender value={name} />;
    },
  },
  {
    header: "Tienda",
    cell: ({ row }) => {
      const store = row.original.store;
      return <TooltipRender value={store.name} />;
    },
  },
  {
    header: "Categoría",
    accessorKey: "category",
    cell: ({ row }) => {
      const category = row.original.category;
      return <TooltipRender value={category.name} />;
    },
  },

  // {
  //   header: "Descripción",
  //   accessorKey: "description",
  //   cell: ({ row }) => {
  //     const description = row.original.description;
  //     return <TooltipRender value={description} />;
  //   },
  // },

  {
    header: "Precio",
    accessorKey: "price",
    cell: ({ row }) => {
      return renderPrice(row.original.price);
    },
  },
  {
    header: "Precio de oferta",
    accessorKey: "offerPrice",
    cell: ({ row }) => {
      const offerPrice = row.original.offerPrice;
      return offerPrice ? renderPrice(offerPrice) : "Sin oferta";
    },
  },
  {
    header: "Stock",
    accessorKey: "stock",
  },
  {
    header: "Link de tienda",
    id: "link",
    cell: ({ row }) => {
      return renderLink(
        row.original.link + "akjsdaskjdkajsdjkasdkajsdkasdkasjdaksjdkasdjabb"
      );
    },
  },
  {
    header: "Estado",
    accessorKey: "enabled",
    cell: ({ row }) => {
      const enabled = row.original.enabled;
      return (
        <Badge variant={enabled ? "default" : "destructive"}>
          {enabled ? "Activo" : "Inactivo"}
        </Badge>
      );
    },
  },
];
