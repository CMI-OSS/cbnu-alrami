import { Link, useLocation } from "react-router-dom";

import $ from "./style.module.scss";

type Props = {
  id: number;
  title: string;
  content?: string;
  isLast?: boolean;
};

function BoardItem({ id, title, content, isLast = false }: Props) {
  const { pathname } = useLocation();
  const to = isLast ? `/board/article/${id}` : `${pathname}/${id}`;
  return (
    <Link className={$["board-item"]} to={to}>
      <div className={$.title}>{title}</div>
      <div className={$.content}>{content}</div>
    </Link>
  );
}

export default BoardItem;
