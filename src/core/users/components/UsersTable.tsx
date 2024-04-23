"use client";
import { DataTable } from "@/components/ui/data-table";
import { useLoadingState } from "@/store/loadingState";
import { PaginationState } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useUsers } from "../hooks/useUsers";
import { useColumns } from "../Columns";
import ModalCreateUser from "./ModalCreateUser";

interface Props {
  limit: number;
  page: number;
}
const UsersTable = ({ limit, page }: Props) => {
  const { setLoadingState } = useLoadingState();
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: limit,
  });
  const [searchValue, setSearchValue] = useState("");

  const { users, count, isLoading, mutate } = useUsers({
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
        data={users || []}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPagination={setPagination}
        count={count || 0}
      />
      <ModalCreateUser handleMutate={mutate}/>

    </div>
  );
};

export default UsersTable;
