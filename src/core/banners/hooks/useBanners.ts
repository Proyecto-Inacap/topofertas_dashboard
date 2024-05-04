import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'
import qs from 'query-string'
import { Banner } from '../types'

interface Props {
  limit: number
  page: number
  searchValue: string
}

interface Response {
  banners: Banner[]
  count: number

}

export const useBanners = ({ limit, page, searchValue }: Props) => {
  const query = qs.stringify({ limit, page, searchValue })

  const { data, isLoading, mutate } = useSWR<Response>(`/banners?${query}`, fetcher, {
    keepPreviousData: true
  })

  return {
    banners: data?.banners,
    count: data?.count,
    isLoading,
    mutate
  }
}