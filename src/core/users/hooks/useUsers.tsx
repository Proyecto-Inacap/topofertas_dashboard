import { fetcher } from "@/utils/fetcher";
import qs from "query-string";
import useSWR from "swr";

import { User } from "../types";

interface Props {
  limit: number;
  page: number;
  searchValue: string;
}

interface Response {
  users: User[];
  count: number;
}

export const useUsers = ({ limit, page, searchValue }: Props) => {
  const query = qs.stringify({ limit, page, searchValue });

  const { data, isLoading, mutate } = useSWR<Response>(
    `/users?${query}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  return {
    users: data?.users,
    count: data?.count,
    isLoading,
    mutate,
  };
};
