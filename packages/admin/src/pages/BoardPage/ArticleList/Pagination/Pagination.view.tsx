import $ from "./Pagination.module.scss";

interface Props {
  currentPage: number;
  onClick: (page: number) => void;
}

export default function PaginationView({ currentPage, onClick }: Props) {
  return (
    <div className={$.pagination}>
      {[ 1, 2, 3, 4, 5, 6 ].map((page) => (
        <div className={$.page} onClick={() => onClick(page)}>
          {page}
        </div>
      ))}
    </div>
  );
}
