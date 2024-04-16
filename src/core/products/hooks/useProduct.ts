import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'


export const useProduct = (id: string) => {

  const { data, isLoading, mutate } = useSWR(`/api/products/${id}`, fetcher)

  return {
    product: data,
    isLoading,
    mutate
  }
}