import { LIMITS } from "@/constants";
import StoreHeaderLayout from '@/core/stores/components/StoreHeaderLayout';
import StoreTable from '@/core/stores/components/StoreTable';
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: {
    limit?: string;
    page?: string;
  };
}
const StoresPage = ({ searchParams: { limit, page } }: Props) => {
  const limitValue = Number(limit) || 10;
  const pageValue = Number(page) || 1;

  if (!LIMITS.includes(limitValue)) {
    const newParams = new URLSearchParams({
      limit: "10",
      page: page ? page : "",
    });
    redirect(`/stores?${newParams.toString()}`);
  }

  return (
    <>
  <StoreHeaderLayout />
  <StoreTable limit={limitValue} page={pageValue} />
    </>
  );
};

export default StoresPage;
