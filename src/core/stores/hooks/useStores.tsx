import { fetcher } from "@/utils/fetcher";
import qs from "query-string";
import useSWR from "swr";
import { Store } from "../types";


interface Props {
  limit?: number;
  page?: number;
  searchValue?: string;
  filters?: object;
}

interface Response {
  stores: Store[];
  count: number;
}


export const useStores = ({ limit, page, searchValue, filters }: Props) => {
  const query = qs.stringify({ limit, page, searchValue, filters: JSON.stringify(filters || {}) });
  const { data, isLoading, mutate } = useSWR<Response>(
    `/stores?${query}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  return {
    stores: data?.stores,
    count: data?.count,
    isLoading,
    mutate,
  };
};
