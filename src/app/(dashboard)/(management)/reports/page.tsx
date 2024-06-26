import { LIMITS } from "@/constants";
import ReportsTable from "@/core/reports/components/ReportsTable";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: {
    limit?: string;
    page?: string;
  };
}

const ReportPage = ({ searchParams: { limit, page } }: Props) => {
  const limitValue = Number(limit) || 10;
  const pageValue = Number(page) || 1;

  if (!LIMITS.includes(limitValue)) {
    const newParams = new URLSearchParams({
      limit: "10",
      page: page ? page : "",
    });
    redirect(`/reports?${newParams.toString()}`);
  }

  return <ReportsTable limit={limitValue} page={pageValue} />;
};

export default ReportPage;
