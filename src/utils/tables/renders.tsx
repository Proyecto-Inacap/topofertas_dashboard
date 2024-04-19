import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const renderPrice = (value: number) => {
  return `$${Number(value)}`
}

export const renderLink = (value: string) => {
  return (
    <div className='max-w-[10rem] overflow-hidden text-ellipsis hover:bg-primary/10 p-1 px-2 rounded-lg'>
      <Link href={value}>
        {value}
      </Link>
    </div>
  )
}
export interface CheckboxColumn<T> {
  id: string;
  header: ColumnDef<T, any>['header'];
  cell: ColumnDef<T, any>['cell'];
  enableSorting: boolean;
  enableHiding: boolean;
}

export const checkboxColumn: CheckboxColumn<any> = {
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
  enableSorting: false,
  enableHiding: false,
};

export const TooltipRender = ({ value }: { value: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className='max-w-[10rem] line-clamp-1'>
            {value}</p>
        </TooltipTrigger>
        <TooltipContent className='max-w-sm'>
          <p>{value}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}