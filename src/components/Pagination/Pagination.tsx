import React from 'react';
import { usePagination, DOTS } from 'hooks';
import { Button, Icon } from 'components';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type CustomProps = {
  onPageChange?: (target: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
};

type PropsType = CustomProps & Omit<React.ComponentPropsWithoutRef<'ul'>, keyof CustomProps>

export const Pagination = React.forwardRef((props: PropsType, forwardedRef: React.Ref<HTMLUListElement>) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
    ...rest
  } = props;


  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (!paginationRange) return null;

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  const isPrevBtnActive = currentPage !== 1;
  const isNextBtnActive = currentPage !== lastPage;

  const onNext = () => {
    if (isNextBtnActive)
      onPageChange?.(currentPage + 1);
  };

  const onPrevious = () => {
    if (isPrevBtnActive)
      onPageChange?.(currentPage - 1);
  };

  return (
    <ul
      ref={forwardedRef}
      className={clsx('flex justify-center items-center sm:w-auto sm:mr-auto gap-1', className)}
      {...rest}
    >


      <li className="flex-1 sm:flex-initial">
        <Button
          onClick={onPrevious}
          as="div"
          className={twMerge([
            "min-w-0 sm:min-w-[40px] shadow-none font-normal flex items-center justify-center border-transparent text-slate-800 sm:mr-2 dark:text-slate-300 px-1 sm:px-3",
            isPrevBtnActive && " font-medium dark:bg-darkmode-400",
            className,
          ])}
        >
          <Icon icon="ChevronLeft" className="w-4 h-4" />
        </Button>
      </li>

      {React.Children.toArray(paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }
        const isBtnActive = pageNumber === currentPage;

        return (
          <li className="flex-1 sm:flex-initial">
            <Button
              //@ts-expect-error because
              onClick={() => onPageChange?.(pageNumber)}
              as="div"
              className={twMerge([
                "min-w-0 sm:min-w-[40px] shadow-none font-normal flex items-center justify-center border-transparent text-slate-800 sm:mr-2 dark:text-slate-300 px-1 sm:px-3",
                isBtnActive && " font-medium dark:bg-darkmode-400",
                className,
              ])}
            >
              {pageNumber}
            </Button>
          </li>
        );
      }))}

      <li className="flex-1 sm:flex-initial">
        <Button
          onClick={onNext}
          as="div"
          className={twMerge([
            "min-w-0 sm:min-w-[40px] shadow-none font-normal flex items-center justify-center border-transparent text-slate-800 sm:mr-2 dark:text-slate-300 px-1 sm:px-3",
            isNextBtnActive && " font-medium dark:bg-darkmode-400",
            className,
          ])}
        >
          <Icon icon="ChevronRight" className="w-4 h-4" />
        </Button>
      </li>
    </ul>
  );
});