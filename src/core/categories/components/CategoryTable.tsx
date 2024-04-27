"use client";
import { DataTable } from "@/components/ui/data-table";
import { useLoadingState } from "@/store/loadingState";
import { PaginationState } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useColumns } from "../Columns";
import { useCategories } from "../hooks/useCategories";
import ModalCreateCategory from './ModalCreateCategory';
import ModalUpdateCategory from './ModalUpdateCategory';

interface Props {
  limit: number;
  page: number;
}

const CategoryTable = ({ limit, page }: Props) => {
  const { setLoadingState } = useLoadingState();
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: limit,
  });
  const [searchValue, setSearchValue] = useState("");

  const { categories, count, isLoading, mutate } = useCategories({
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
        data={categories || []}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPagination={setPagination}
        count={count || 0}
        />
      <ModalCreateCategory handleMutate={mutate} />
      <ModalUpdateCategory handleMutate={mutate} />
    </div>
  );
};

export default CategoryTable;
