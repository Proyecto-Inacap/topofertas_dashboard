import React, { Fragment } from "react";
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationEllipsis } from './ui/pagination';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export interface PaginationProps {
  pageIndex: number;
  pageCount: number;
  onChange: (pageIndex: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageIndex,
  pageCount,
  onChange,
  pageSize,
  setPageSize,
}) => {
  const totalPagesToShow = 5;
  const totalPages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const halfTotalPagesToShow = Math.floor(totalPagesToShow / 2);
  let startPage = Math.max(0, pageIndex - halfTotalPagesToShow);
  let endPage = Math.min(pageCount - 1, startPage + totalPagesToShow - 1);

  if (endPage - startPage + 1 < totalPagesToShow) {
    // Ajustar el rango si no hay suficientes páginas para mostrar
    endPage = Math.min(pageCount - 1, startPage + totalPagesToShow - 1);
    startPage = Math.max(0, endPage - totalPagesToShow + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i + 1,
  );

  // Asegurar que siempre se muestren la primera y última página
  const showFirstPage = startPage > 0;
  const showLastPage = endPage < pageCount - 1;

  const handleOnChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', (page + 1).toString());
    // router.push(pathname + '?' + params.toString());
    onChange(page);
  }

  return (
    <div className='flex justify-between p-4'>
      <Select
        value={pageSize.toString()}
        onValueChange={(e) => {
          const pageSize = parseInt(e, 10);
          setPageSize(pageSize);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {[10, 25, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                Mostrar {pageSize}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className='flex'>
        <Button
          variant="default"
          disabled={pageIndex === 0}
          onClick={() => handleOnChange(Math.max(0, pageIndex - 1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {showFirstPage && (
          <Fragment>

            <Button
              variant="outline"
              onClick={() => handleOnChange(Math.max(0, totalPages[0] - 1))}
            >
              {totalPages[0]}
            </Button>
            <PaginationEllipsis />
          </Fragment>
        )}
        {pages.map((page) => (
          <Button
            key={page}
            variant="outline"
            size="sm"
            onClick={() => handleOnChange(page - 1)}
            // disabled={pageIndex !== page - 1}
            className={pageIndex === page - 1 ? 'bg-gray-200/20' : ''}
          >
            {page}
          </Button>
        ))}
        {showLastPage && (
          <Fragment>
            <PaginationEllipsis />
            <Button
              variant="outline"
              onClick={() =>
                onChange(Math.max(0, totalPages[totalPages.length - 1] - 1))
              }
            >
              {totalPages[totalPages.length - 1]}
            </Button>
          </Fragment>
        )}
        <Button
          variant="default"
          disabled={pageIndex === pageCount - 1}
          onClick={() => handleOnChange(Math.min(pageCount - 1, pageIndex + 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;