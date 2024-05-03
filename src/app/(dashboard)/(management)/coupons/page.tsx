import HeaderLayout from "@/components/HeaderLayout";
import { LIMITS } from "@/constants";
import CouponTable from "@/core/coupons/components/CouponTable";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: {
    limit?: string;
    page?: string;
  };
}
const CouponPage = ({ searchParams: { limit, page } }: Props) => {
  const limitValue = Number(limit) || 10;
  const pageValue = Number(page) || 1;

  if (!LIMITS.includes(limitValue)) {
    const newParams = new URLSearchParams({
      limit: "10",
      page: page ? page : "",
    });
    redirect(`/coupons?${newParams.toString()}`);
  }

  return (
    <>
      <HeaderLayout title="Cupones" buttonLabel="Crear Cupón" />
      <CouponTable limit={limitValue} page={pageValue} />
    </>
  );
};

export default CouponPage;
