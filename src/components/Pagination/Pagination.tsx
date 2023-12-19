import React from 'react';
import { usePagination, DOTS } from 'hooks';
import { Button, Icon } from 'components';
import { twMerge } from "tailwind-merge";


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

  const classes = {
    root: twMerge('flex justify-center items-center sm:w-auto sm:mr-auto gap-1', className),
    li: "flex-1 sm:flex-initial",
    button: "min-w-0 sm:min-w-[40px] shadow-none font-normal flex items-center justify-center border-transparent text-slate-800 sm:mr-2 dark:text-slate-300 px-1 sm:px-3",
    activeButton: "font-medium dark:bg-darkmode-400",
    icon: "w-4 h-4"
  }

  return (
    <ul
      ref={forwardedRef}
      className={classes.root}
      {...rest}
    >


      <li className={classes.li}>
        <Button
          data-test="pagination-left"
          onClick={onPrevious}
          as="div"
          className={twMerge([
            classes.button,
            isPrevBtnActive && classes.activeButton
          ])}
        >
          <Icon icon="ChevronLeft" className={classes.icon} />
        </Button>
      </li>

      {React.Children.toArray(paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }
        const isBtnActive = pageNumber === currentPage;

        return (
          <li className={classes.li}>
            <Button
              data-test={`pagination-${pageNumber}`}
              //@ts-expect-error it will return another item (above) that is not clickable if pageNumber was DOTS
              onClick={() => onPageChange?.(pageNumber)}
              as="div"
              className={twMerge([
                classes.button,
                isBtnActive && classes.activeButton
              ])}
            >
              {pageNumber}
            </Button>
          </li>
        );
      }))}

      <li className={classes.li}>
        <Button
          data-test="pagination-right"
          onClick={onNext}
          as="div"
          className={twMerge([
            classes.button,
            isNextBtnActive && classes.activeButton
          ])}
        >
          <Icon icon="ChevronRight" className={classes.icon} />
        </Button>
      </li>
    </ul>
  );
});