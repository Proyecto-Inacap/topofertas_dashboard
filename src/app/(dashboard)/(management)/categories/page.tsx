import HeaderLayout from "@/components/HeaderLayout";
import { LIMITS } from "@/constants";
import CategoryTable from "@/core/categories/components/CategoryTable";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: {
    limit?: string;
    page?: string;
  };
}

const CategoryPage = ({ searchParams: { limit, page } }: Props) => {
  const limitValue = Number(limit) || 10;
  const pageValue = Number(page) || 1;

  if (!LIMITS.includes(limitValue)) {
    const newParams = new URLSearchParams({
      limit: "10",
      page: page ? page : "",
    });
    redirect(`/categories?${newParams.toString()}`);
  }

  return (
    <>
      <HeaderLayout
        title="Categorias"
        buttonLabel="Crear Categoria"
      />
      <CategoryTable limit={limitValue} page={pageValue} />
    </>
  );
};

export default CategoryPage;
