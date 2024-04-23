import { LIMITS } from "@/constants";
import CouponsTable from '@/core/coupons/components/CouponsTable';
import { redirect } from "next/navigation";
import React from "react";
interface Props {
  searchParams: {
    limit?: string;
    page?: string;
  };
}
const CouponsPage = ({ searchParams: { limit, page } }: Props) => {
  const limitValue = Number(limit) || 10;
  const pageValue = Number(page) || 1;

  if (!LIMITS.includes(limitValue)) {
    const newParams = new URLSearchParams({
      limit: "10",
      page: page ? page : "",
    });
    redirect(`/reports?${newParams.toString()}`);
  }

  return <CouponsTable limit={limitValue} page={pageValue} />;
};

export default CouponsPage;
