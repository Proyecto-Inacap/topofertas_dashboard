import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'
import qs from 'query-string'

interface Props {
  limit: number
  page: number
  searchValue: string
}

interface Response {
  products: Product[]
  count: number

}

export const useProducts = ({ limit, page, searchValue }: Props) => {

  const query = qs.stringify({ limit, page, searchValue })

  const { data, isLoading, mutate } = useSWR<Response>(`/products?${query}`, fetcher, {
    keepPreviousData: true
  })

  return {
    products: data?.products,
    count: data?.count,
    isLoading,
    mutate
  }
}