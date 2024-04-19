import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { checkboxColumn, renderLink, renderPrice, TooltipRender } from '@/utils/tables/renders';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<Product>[] = [
  checkboxColumn,
  // {
  //   header: 'Nombre',
  //   accessorKey: 'id',
  // },
  {
    header: 'Nombre',
    accessorKey: 'name',
    cell: ({ row }) => {
      const name = row.original.name;
      return (
        <TooltipRender value={name} />
      )
    }
  },
  {
    header: 'Stock',
    accessorKey: 'stock',

  },
  {
    header: 'Descripción',
    accessorKey: 'description',
    cell: ({ row }) => {
      const description = row.original.description;
      return (
        <TooltipRender value={description} />

      )
    }
  },
  {
    header: 'Link',
    id: 'link',
    cell: ({ row }) => {
      return (
        renderLink(row.original.link + 'akjsdaskjdkajsdjkasdkajsdkasdkasjdaksjdkasdjabb')
      )
    }
  },
  {
    header: 'Precio',
    accessorKey: 'price',
    cell: ({ row }) => {
      return renderPrice(row.original.price)
    },
  },
  {
    header: 'Precio de oferta',
    accessorKey: 'offerPrice',
    cell: ({ row }) => {
      const offerPrice = row.original.offerPrice;
      return offerPrice ? renderPrice(offerPrice) : 'Sin oferta';
    },
  },
  {
    header: 'Estado',
    accessorKey: 'enabled',
    cell: ({ row }) => {
      const enabled = row.original.enabled;
      return (
        <Badge variant={enabled ? 'default' : 'destructive'} >
          {enabled ? 'Activo' : 'Inactivo'}
        </Badge>
      )
    }
  },
];

