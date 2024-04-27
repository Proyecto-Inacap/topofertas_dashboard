import ActionsDropDown from "@/components/table/ActionsDropDown";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  checkboxColumn,
  TooltipRender,
} from "@/utils/tables/renders";
import { ColumnDef } from "@tanstack/react-table";
import { ImageOffIcon } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { storeApi } from "./api/storeApi";
import { CldImage } from 'next-cloudinary'

interface Props {
  mutate: () => void;
}

export const useColumns = ({ mutate }: Props) => {
  const { toast, toasts } = useToast();
  const isLoading = toasts.some((t) => t.toastType === "loading");

  const handleChangeStatus = async (id: string, enabled: boolean) => {
    const toaster = toast({
      toastType: "loading",
      description: "Cambiando estado de la tienda",
    });

    try {
      const response = await storeApi.update(id, {
        enabled: !enabled,
      });

      if (response.status !== 200) {
        throw new Error("Error al cambiar el estado de la tienda");
      }

      mutate();
      toaster.update({
        toastType: "success",
        description: "Estado cambiado",
      });
    } catch (error) {
      return toaster.update({ toastType: "error" });
    }
  };

  const columns: ColumnDef<Store>[] = [
    checkboxColumn,
    {
      header: "Nombre",
      cell: ({ row }) => {
        const value = row.original.name;
        return <TooltipRender value={value} />;
      },
    },
    {
      header: "Logo",
      cell: ({ row }) => {
        const value = row.original.logoImage;
        return value ? (
          <CldImage
            src={value}
            alt="Logo"
            width={200}
            height={50}
            className="object-contain w-20 h-auto"

          />
        ) : (
          <ImageOffIcon size={50} />
        );
      },
    },
    {
      header: "Estado",
      accessorKey: "enabled",
      cell: ({ row }) => {
        const status = row.original.enabled;
        return (
          <Badge variant={status ? "default" : "destructive"}>
            {status ? "Activo" : "Inactivo"}
          </Badge>
        );
      },
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const store = row.original;

        return (
          <ActionsDropDown disabled={isLoading}>
            <DropdownMenuItem
              onClick={() =>
                handleChangeStatus(store.id, store.enabled)
              }
            >
              {store.enabled ? "Desactivar" : "Activar"}
            </DropdownMenuItem>
          </ActionsDropDown>
        );
      },
    },
  ];
  return columns;
};
