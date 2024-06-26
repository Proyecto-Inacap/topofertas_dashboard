import React, { Fragment } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { LIMITS } from "@/constants";

export interface PaginationProps {
  pageIndex: number;
  pageCount: number;
  onChange: (pageIndex: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
}

const PaginationWrapper: React.FC<PaginationProps> = ({
  pageIndex,
  pageCount,
  onChange,
  pageSize,
  setPageSize,
}) => {
  const totalPagesToShow = 5;
  const totalPages = Array.from(
    { length: pageCount },
    (_, i) => i + 1
  );
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const halfTotalPagesToShow = Math.floor(totalPagesToShow / 2);
  let startPage = Math.max(0, pageIndex - halfTotalPagesToShow);
  let endPage = Math.min(
    pageCount - 1,
    startPage + totalPagesToShow - 1
  );

  if (endPage - startPage + 1 < totalPagesToShow) {
    // Ajustar el rango si no hay suficientes páginas para mostrar
    endPage = Math.min(
      pageCount - 1,
      startPage + totalPagesToShow - 1
    );
    startPage = Math.max(0, endPage - totalPagesToShow + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i + 1
  );

  // Asegurar que siempre se muestren la primera y última página
  const showFirstPage = startPage > 0;
  const showLastPage = endPage < pageCount - 1;

  const handleOnChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (page + 1).toString());
    router.push(pathname + "?" + params.toString());
    onChange(page);
  };

  const handleValueChange = (pageSize: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", pageSize);
    params.set("page", "1");
    router.push(pathname + "?" + params.toString());
    setPageSize(Number(pageSize));
    onChange(0);
  };

  return (
    <Pagination className="justify-between p-4 flex-wrap gap-4 ">
      <PaginationContent>
        <Select
          value={pageSize.toString()}
          onValueChange={handleValueChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {LIMITS.map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={pageSize.toString()}
                >
                  Mostrar {pageSize}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </PaginationContent>
      <PaginationContent >
        <PaginationPrevious
          variant={"default"}
          disabled={pageIndex === 0}
          onClick={() => handleOnChange(Math.max(0, pageIndex - 1))}
        />
        {showFirstPage && (
          <Fragment>
            <PaginationItem>
              <PaginationLink
                // variant="outline"
                onClick={() =>
                  handleOnChange(Math.max(0, totalPages[0] - 1))
                }
              >
                {totalPages[0]}
              </PaginationLink>
            </PaginationItem>
            <PaginationEllipsis />
          </Fragment>
        )}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              // variant="outline"
              size="sm"
              onClick={() => handleOnChange(page - 1)}
              isActive={pageIndex === page - 1}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {showLastPage && (
          <Fragment>
            <PaginationEllipsis />
            <PaginationItem>
              <PaginationLink
                // variant="outline"
                onClick={() =>
                  handleOnChange(
                    Math.max(0, totalPages[totalPages.length - 1] - 1)
                  )
                }
              >
                {totalPages[totalPages.length - 1]}
              </PaginationLink>
            </PaginationItem>
          </Fragment>
        )}
        <PaginationNext
          variant="default"
          disabled={pageIndex === pageCount - 1}
          onClick={() =>
            handleOnChange(Math.min(pageCount - 1, pageIndex + 1))
          }
        />
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationWrapper;
