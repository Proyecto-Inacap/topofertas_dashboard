import { ColumnDef } from '@tanstack/react-table';

export const renderPrice = (props: any) => {
  const value = props.getValue();
  return `$${value}`
}

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: 'link',
  },
  {
    header: 'Price',
    accessorKey: 'price',
    cell: renderPrice,
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

