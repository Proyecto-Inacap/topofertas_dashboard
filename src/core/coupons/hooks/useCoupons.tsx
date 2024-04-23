import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import qs from "query-string";
import { Coupon } from '../types';

interface Props {
  limit: number;
  page: number;
  searchValue: string;
}

interface Response {
  coupons: Coupon[];
  count: number;
}

export const useCoupons = ({ limit, page, searchValue }: Props) => {
  const query = qs.stringify({ limit, page, searchValue });

  const { data, isLoading, mutate } = useSWR<Response>(
    `/coupons?${query}`,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  return {
    coupons: data?.coupons,
    count: data?.count,
    isLoading,
    mutate,
  };
};
