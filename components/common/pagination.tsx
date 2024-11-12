import { usePagination } from '@/hooks/usePagination';
import Image from 'next/image';

interface Props {
  currentPage: number;
  changeCurrentPage: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  pageSize: number;
  className?: string;
}

const Pagination = ({
  currentPage,
  changeCurrentPage,
  totalCount,
  siblingCount = 1,
  pageSize,
  className,
}: Props) => {
  const paginationRange: Array<number | string> | undefined = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (
    currentPage === 0 ||
    (paginationRange && paginationRange.length < 2) ||
    !paginationRange
  ) {
    return null;
  }

  const onFirst = () => {
    changeCurrentPage(1);
  };

  const onLast = () => {
    changeCurrentPage(paginationRange[paginationRange?.length - 1] as number);
  };

  const onNext = () => {
    changeCurrentPage(currentPage + 1);
  };

  const onPrevious = () => {
    changeCurrentPage(currentPage - 1);
  };

  const onDotsClick = (dotsIndex: number) => {
    let offset;
    const currentIndex = paginationRange.findIndex(
      (page) => page === currentPage,
    );
    if (dotsIndex > currentIndex) offset = 5;
    else offset = -5;
    const finalPage =
      currentPage + offset > 0
        ? currentPage + offset >
          (paginationRange[paginationRange?.length - 1] as number)
          ? paginationRange[paginationRange?.length - 1]
          : currentPage + offset
        : 1;
    changeCurrentPage(finalPage as number);
  };

  const itemClass =
    'mx-1 flex min-w-[32px] text-sm h-[32px] px-2 py-1 cursor-pointer select-none items-center justify-center rounded-[32px] border border-[#f1f1f1] font-medium';

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={`flex list-none justify-center ${className}`}>
      <li
        className={`${itemClass} bg-white text-[#333] hover:bg-black/[0.04] ${
          currentPage === 1 ? 'pointer-events-none opacity-50' : ''
        }`}
        onClick={onFirst}
      >
        <Image
          alt="arrow"
          src="/icons/last.svg"
          width={16}
          height={16}
          className="scale-x-[-1]"
        />
      </li>
      <li
        className={`${itemClass} bg-white text-[#333] hover:bg-black/[0.04] ${
          currentPage === 1 ? 'pointer-events-none opacity-50' : ''
        }`}
        onClick={onPrevious}
      >
        <Image
          alt="arrow"
          src="/icons/next.svg"
          width={16}
          height={16}
          className="scale-x-[-1]"
        />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (typeof pageNumber === 'string') {
          return (
            <li
              key={index}
              className={`${itemClass} rounded-lg border-none text-[#333] hover:bg-transparent`}
              onClick={() => onDotsClick(index)}
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={index}
            className={`${itemClass} ${
              pageNumber === currentPage
                ? 'bg-[#2f80ed] text-white'
                : 'bg-white text-[#333] hover:bg-black/[0.04]'
            }`}
            onClick={() => changeCurrentPage(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`${itemClass} bg-white text-[#333] hover:bg-black/[0.04] ${
          currentPage === lastPage
            ? 'pointer-events-none opacity-50'
            : 'opacity-100'
        }`}
        onClick={onNext}
      >
        <Image alt="arrow" src="/icons/next.svg" width={16} height={16} />
      </li>
      <li
        className={`${itemClass} bg-white text-[#333] hover:bg-black/[0.04] ${
          currentPage === lastPage ? 'pointer-events-none opacity-50' : ''
        }`}
        onClick={onLast}
      >
        <Image alt="arrow" src="/icons/last.svg" width={16} height={16} />
      </li>
    </ul>
  );
};

export default Pagination;
