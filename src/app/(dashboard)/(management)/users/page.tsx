import { LIMITS } from "@/constants";
import ModalCreateUser from "@/core/users/components/ModalCreateUser";
import UserHeaderLayout from "@/core/users/components/UserHeaderLayout";
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

  return (
    <div>
      <UserHeaderLayout />
      <UsersTable limit={limitValue} page={pageValue} />
      <ModalCreateUser />
    </div>
  );
};

export default UsersPage;
