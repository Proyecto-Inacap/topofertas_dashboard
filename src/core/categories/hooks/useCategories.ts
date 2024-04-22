import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'
import qs from 'query-string'
import { Category } from '../types'

interface Props {
  limit: number
  page: number
  searchValue: string
}

interface Response {
  categories: Category[]
  count: number

}

export const useCategories = ({ limit, page, searchValue }: Props) => {

  const query = qs.stringify({ limit, page, searchValue })

  const { data, isLoading, mutate } = useSWR<Response>(`/categories?${query}`, fetcher, {
    keepPreviousData: true
  })
  console.log(data)

  return {
    categories: data?.categories,
    count: data?.count,
    isLoading,
    mutate
  }
}