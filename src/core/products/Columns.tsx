import ActionsDropDown from "@/components/table/ActionsDropDown";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { checkboxColumn, renderLink, renderPrice, TooltipRender } from "@/utils/tables/renders";
import { ColumnDef } from "@tanstack/react-table";

import { productApi } from "./api/productApi";
import { Product } from './types';

interface Props {
  mutate: () => void;
}

export const useColumns = ({ mutate }: Props) => {
  const { toast, toasts } = useToast();
  const isLoading = toasts.some((t) => t.toastType === "loading");
  
  const handleChange = async (id: string, enabled: boolean) => {
    const toaster = toast({
      toastType: "loading",
      description: "Cambiando estado del producto",
    });
    try {
      const {status} = await productApi.update(id, { enabled: !enabled });

      if (status !== 200) {
        throw new Error("Error al activar/desactivar el producto");
      }
      mutate();
      toaster.update({
        toastType: "success",
        description: "Estado del Producto actualizado",
      });
    } catch (error) {
      return toaster.update({ toastType: "error" });
    }
  };

  const columns: ColumnDef<Product>[] = [
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
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;

        return (
          <ActionsDropDown disabled={isLoading}>
            <DropdownMenuItem
              onClick={() => handleChange(product.id, product.enabled)}
            >
              {product.enabled ? "Desactivar" : "Activar"}
            </DropdownMenuItem>
          </ActionsDropDown>
        );
      },
    },
  ];
  return columns;
};
