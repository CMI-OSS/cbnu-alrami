import { Link } from "react-router-dom";

import $ from "./style.module.scss";

type Props = {
  id: number;
  title: string;
  content?: string;
};

function BoardItem({ id, title, content }: Props) {
  return (
    <div className={$["board-item"]}>
      <Link to={`${id}`}>
        <div className={$.title}>{title}</div>
        <div className={$.content}>{content}</div>
      </Link>
    </div>
  );
}

export default BoardItem;
