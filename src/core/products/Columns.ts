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

];