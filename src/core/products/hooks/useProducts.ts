import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'
import qs from 'query-string'

interface Props {
  limit: number
  page: number
}

interface Response {
  products: Product[]
  count: number

}

export const useProducts = ({ limit, page }: Props) => {

  const query = qs.stringify({ limit, page })

  const { data, isLoading, mutate } = useSWR<Response>(`/products?${query}`, fetcher)
  console.log(data)
  return {
    products: data?.products,
    count: data?.count,
    isLoading,
    mutate
  }
}