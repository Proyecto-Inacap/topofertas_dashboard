'use client'
import { DataTable } from '@/components/ui/data-table'
import { useLoadingState } from '@/store/loadingState'
import { PaginationState } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import { columns } from '../Columns'
import { Input } from '@/components/ui/input'
import { useReports } from '../hooks/useReports'

interface Props {
  limit: number
  page: number
}

const ReportTable = ({ limit, page }: Props) => {
  const { setLoadingState } = useLoadingState()
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: limit,
  });
  const [searchValue, setSearchValue] = useState('')

  const { reports, count, isLoading, mutate } = useReports({ limit, page: pageIndex, searchValue })

  console.log(reports)

  useEffect(() => {
    setLoadingState(isLoading)
  }, [isLoading, setLoadingState])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    mutate()
  }

  return (
    <div className='flex flex-col gap-5'>
      {/* <Label>Buscar</Label> */}
      <h1 className='text-2xl font-bold'>Reportes</h1>
      <Input placeholder="Buscar" className='max-w-sm' value={searchValue} onChange={handleChange} />
      <DataTable columns={columns} data={reports || []} pageIndex={pageIndex} pageSize={pageSize} setPagination={setPagination} count={count || 0} />
    </div>
  )
}

export default ReportTable