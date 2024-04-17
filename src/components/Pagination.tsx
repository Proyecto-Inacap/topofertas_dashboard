import React, { Fragment } from "react";
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
  pageIndex: number;
  pageCount: number;
  onChange: (pageIndex: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pageIndex,
  pageCount,
  onChange,
}) => {
  const totalPagesToShow = 5;
  const totalPages = Array.from({ length: pageCount }, (_, i) => i + 1);

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

  return (
    <div className='flex justify-end p-4'>
      {showFirstPage && (
        <Fragment>
          <Button
            variant="outline"
            onClick={() => onChange(Math.max(0, totalPages[0] - 1))}
          >
            {totalPages[0]}
          </Button>
          <Button
            variant="default"
            onClick={() => onChange(Math.max(0, pageIndex - 1))}
          >
            <ChevronLeft className="h-4 w-4" />

          </Button>
        </Fragment>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          variant="outline"
          size="sm"
          onClick={() => onChange(page - 1)}
        // disabled={pageIndex !== page - 1}
        className={pageIndex === page - 1 ? 'bg-gray-200/20' : ''}
        >
          {page}
        </Button>
      ))}
      {showLastPage && (
        <Fragment>
          <Button
            variant="default"
            onClick={() => onChange(Math.min(pageCount - 1, pageIndex + 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
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
    </div>
  );
};

export default Pagination;