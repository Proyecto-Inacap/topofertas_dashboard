import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'


export const useProducts = () => {

  const { data, isLoading, mutate } = useSWR<Product[]>(`/products`, fetcher)

  return {
    products: data,
    isLoading,
    mutate
  }
}