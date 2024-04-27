import ActionsDropDown from "@/components/table/ActionsDropDown";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { checkboxColumn, TooltipRender } from "@/utils/tables/renders";
import { ColumnDef } from "@tanstack/react-table";

import { categoryApi } from "./api/categoryApi";
import { Category } from "./types";
import { useCategoryModal } from '@/store/categories/useCategoryModal';

interface Props {
  mutate: () => void;
}

export const useColumns = ({ mutate }: Props) => {
  const { toast, toasts } = useToast();
  const { setUpdateIsOpen } = useCategoryModal();
  const isLoading = toasts.some((t) => t.toastType === "loading");

  const handleChange = async (id: string, enabled: boolean) => {
    const toaster = toast({
      toastType: "loading",
      description: "Cambiando estado de la categoría",
    });
    try {
      const { status } = await categoryApi.update(id, { enabled: !enabled });

      if (status !== 200) {
        throw new Error("Error al activar/desactivar la categoría");
      }
      mutate();
      toaster.update({
        toastType: "success",
        description: "Estado de la categoría cambiado",
      })
    } catch (error) {
      return toaster.update({ toastType: "error" });
    }
  };

  const columns: ColumnDef<Category>[] = [
    checkboxColumn,
    {
      header: "Nombre",
      cell: ({ row }) => {
        const value = row.original.name;
        return <TooltipRender value={value} />;
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
        const category = row.original;
        return (
          <ActionsDropDown disabled={isLoading}>
            <DropdownMenuItem
              onClick={() => handleChange(category.id, category.enabled)}
            >
              {category.enabled ? "Desactivar" : "Activar"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setUpdateIsOpen(category)}
            >
              Actualizar
            </DropdownMenuItem>
          </ActionsDropDown>
        );
      },
    },
  ];
  return columns;
};
