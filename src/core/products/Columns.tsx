import { checkboxColumn, renderLink, renderPrice } from '@/utils/tables/renders';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Product>[] = [
  checkboxColumn,
  {
    header: 'ID',
    accessorKey: 'id',
  },
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Stock',
    accessorKey: 'stock',
  },
  {
    header: 'Description',
    accessorKey: 'description',
  },
  {
    header: 'Link',
    id: 'link',
    cell: ({ row }) => {
      return renderLink(row.original.link)
    }
  },
  {
    header: 'Price',
    accessorKey: 'price',
    cell: ({ row }) => {
      return renderPrice(row.original.price)
    },
  },
  {
    header: 'Offer Price',
    accessorKey: 'offerPrice',
    cell: ({ row }) => {
      return renderPrice(row.original.offerPrice)
    },
  },
  {
    header: 'Enabled',
    accessorKey: 'enabled',
  },
];

