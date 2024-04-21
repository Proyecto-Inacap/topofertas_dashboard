import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LIMITS } from "@/constants";
import ProductTable from "@/core/products/components/ProductTable";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: {
    limit?: string;
    page?: string;
  };
}

const ProductsPage = async ({ searchParams: { limit, page } }: Props) => {
  const session = await getServerSession(authOptions);
  console.log(session);
  const limitValue = Number(limit) || 10;
  const pageValue = Number(page) || 1;

  if (!LIMITS.includes(limitValue)) {
    const newParams = new URLSearchParams({
      limit: "10",
      page: page ? page : "",
    });
    redirect(`/products?${newParams.toString()}`);
  }

  return <ProductTable limit={limitValue} page={pageValue} />;
};

export default ProductsPage;
