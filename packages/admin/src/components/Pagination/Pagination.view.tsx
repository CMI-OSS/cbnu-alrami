import cx from "classnames";

import { getPaginationList } from "./Pagination.helper";
import $ from "./Pagination.module.scss";

interface Props {
  currentPage: number;
  displayPageCount: number;
  totalPage: number;
  onClick: (page: number) => void;
  onClickPrev: () => void;
  onClickNext: () => void;
}

export default function PaginationView({
  currentPage,
  displayPageCount,
  totalPage,
  onClick,
  onClickPrev,
  onClickNext,
}: Props) {
  return (
    <div className={$.pagination}>
      {currentPage !== 1 && (
        <div className={$.page} onClick={onClickPrev}>
          {"<"}
        </div>
      )}
      {getPaginationList(currentPage, displayPageCount, totalPage).map(
        (page) => (
          <div
            className={cx($.page, { [$.current]: currentPage === page })}
            onClick={() => onClick(page)}
            key={page}
          >
            {page}
          </div>
        ),
      )}
      {currentPage !== totalPage && (
        <div className={$.page} onClick={onClickNext}>
          {">"}
        </div>
      )}
    </div>
  );
}
