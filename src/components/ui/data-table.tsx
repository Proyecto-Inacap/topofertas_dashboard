"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  OnChangeFn,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useMemo } from 'react'
import Pagination from '../Pagination'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './select'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageIndex: number
  pageSize: number
  count: number
  setPagination: OnChangeFn<PaginationState>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageIndex,
  pageSize,
  count,
  setPagination,
}: DataTableProps<TData, TValue>) {

  const pagination = useMemo<PaginationState>(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const pageCount = count && pageSize ? Math.ceil(count / pageSize) : 0;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    pageCount
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination
        pageIndex={table.getState().pagination.pageIndex}
        pageCount={table.getPageCount()}
        onChange={(newPageIndex) => {
          table.setPageIndex(newPageIndex);
        }}
        pageSize={table.getState().pagination.pageSize}
        setPageSize={(newPageSize) => {
          table.setPageSize(newPageSize);
        }}
      />
    </div >
  )
}