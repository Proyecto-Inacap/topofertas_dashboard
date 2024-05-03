import HeaderLayout from "@/components/HeaderLayout";
import { LIMITS } from "@/constants";
import StoreTable from "@/core/stores/components/StoreTable";
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
      <HeaderLayout title="Tiendas" buttonLabel="Crear Tienda" />
      <StoreTable limit={limitValue} page={pageValue} />
    </>
  );
};

export default StoresPage;
