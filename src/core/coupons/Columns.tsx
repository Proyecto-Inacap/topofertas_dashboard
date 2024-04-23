import ActionsDropDown from "@/components/table/ActionsDropDown";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { API } from "@/config";
import { checkboxColumn, TooltipRender } from "@/utils/tables/renders";
import { ColumnDef } from "@tanstack/react-table";
import { Coupon } from "./types";
import { couponApi } from "./api/couponApi";

interface Props {
  mutate: () => void;
}

export const useColumns = ({ mutate }: Props) => {
  const { toast, toasts } = useToast();
  const isLoading = toasts.some((t) => t.toastType === "loading");

  const handleChange = async (id: string, enabled: boolean) => {
    const toaster = toast({
      toastType: "loading",
      description: "Cambiando estado del cupón",
    });
    try {
      const { status } = await couponApi.update(id, { enabled: !enabled });

      if (status !== 200) {
        throw new Error("Error al cambiar el estado del cupón");
      }
      mutate();
      toaster.update({
        toastType: "success",
        description: "Estado del cupón cambiado",
      });
    } catch (error) {
      return toaster.update({ toastType: "error" });
    }
  };

  const columns: ColumnDef<Coupon>[] = [
    checkboxColumn,
    {
      header: "Nombre",
      cell: ({ row }) => {
        const value = row.original.code;
        return <TooltipRender value={value} />;
      },
    },
    {
      header: "Descripción",
      cell: ({ row }) => {
        const value = row.original.description;
        return <TooltipRender value={value} />;
      },
    },
    {
      header: "Tienda",
      cell: ({ row }) => {
        const value = row.original.store.name;
        return <TooltipRender value={value} />;
      },
    },
    {
      header: "Estado",
      accessorKey: "enabled",
      cell: ({ row }) => {
        const enabled = row.original.enabled;
        console.log(row.original);
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
        const category = row.original;
        return (
          <ActionsDropDown disabled={isLoading}>
            <DropdownMenuItem
              onClick={() => handleChange(category.id, category.enabled)}
            >
              {category.enabled ? "Desactivar" : "Activar"}
            </DropdownMenuItem>
          </ActionsDropDown>
        );
      },
    },
  ];
  return columns;
};
