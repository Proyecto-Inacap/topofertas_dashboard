"use client";
import { DataTable } from "@/components/ui/data-table";
import { useLoadingState } from "@/store/loadingState";
import { PaginationState } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useStores } from '../hooks/useStores';
import { useColumns } from '../Columns';
import ModalCreateStore from './ModalCreateStore';

interface Props {
  limit: number;
  page: number;
}

const StoreTable = ({ limit, page }: Props) => {
  const { setLoadingState } = useLoadingState();
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: limit,
  });
  const [searchValue, setSearchValue] = useState("");

  const { stores, count, isLoading, mutate } = useStores({
    limit,
    page: pageIndex,
    searchValue,
  });

  const columns = useColumns({ mutate });

  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading, setLoadingState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    mutate();
  };

  return (
    <div className="flex flex-col gap-5">
      <Input
        placeholder="Buscar"
        className="max-w-sm"
        value={searchValue}
        onChange={handleChange}
      />
      <DataTable
        columns={columns}
        data={stores || []}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPagination={setPagination}
        count={count || 0}
      />
      <ModalCreateStore handleMutate={mutate} />
    </div>
  );
};

export default StoreTable;
