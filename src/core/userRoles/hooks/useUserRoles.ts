import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import qs from "query-string";
import { UserRole } from "../types";


export const useUserRoles = () => {
  const { data, isLoading, mutate } = useSWR<UserRole[]>(
    `/user-roles`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  return {
    userRoles: data,
    isLoading,
    mutate,
  };
};
