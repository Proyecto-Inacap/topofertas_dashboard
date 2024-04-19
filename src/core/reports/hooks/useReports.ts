import { fetcher } from '@/utils/fetcher'
import useSWR from 'swr'
import qs from 'query-string'
import { Report } from '../type'

interface Props {
  limit: number
  page: number
  searchValue: string
}

interface Response {
  reports: Report[]
  count: number

}

export const useReports = ({ limit, page, searchValue }: Props) => {

  const query = qs.stringify({ limit, page, searchValue })

  const { data, isLoading, mutate } = useSWR<Response>(`/reports?${query}`, fetcher, {
    keepPreviousData: true
  })

  return {
    reports: data?.reports,
    count: data?.count,
    isLoading,
    mutate
  }
}