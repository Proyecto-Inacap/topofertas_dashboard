import { LIMITS } from "@/constants";
import UsersTable from "@/core/users/components/UsersTable";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: {
    limit?: string;
    page?: string;
  };
}
const UsersPage = ({ searchParams: { limit, page } }: Props) => {
  const limitValue = Number(limit) || 10;
  const pageValue = Number(page) || 1;

  if (!LIMITS.includes(limitValue)) {
    const newParams = new URLSearchParams({
      limit: "10",
      page: page ? page : "",
    });
    redirect(`/users?${newParams.toString()}`);
  }

  return <UsersTable limit={limitValue} page={pageValue} />;
};

export default UsersPage;
