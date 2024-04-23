import { fetcher } from "@/utils/fetcher";
import qs from "query-string";
import useSWR from "swr";


interface Props {
  limit: number;
  page: number;
  searchValue: string;
}

interface Response {
  stores: Store[];
  count: number;
}

export const useStores = ({ limit, page, searchValue }: Props) => {
  const query = qs.stringify({ limit, page, searchValue });

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
