import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Product>[]  = [
  {
    header: 'ID',
    accessorKey: 'id',
  },
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    stock: 'Stock',
    accessorKey: 'stock',
  },
  {
    header: 'Description',
    accessorKey: 'description',
  },
  {
    header: 'Link',
    accessorKey: 'link',
  },
  {
    header: 'Price',
    accessorKey: 'price',
  },
  {
    header: 'Offer Price',
    accessorKey: 'offerPrice',
  },
  {
    header: 'Enabled',
    accessorKey: 'enabled',
  },

];