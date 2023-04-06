import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { Arrow } from "@components/atoms/icon";
import SubscriptionNoticeGroup from "@components/shared/SubscriptionNoticeGroup";
import classnames from "classnames";
import { pushBreadcrumb } from "src/store/boardSlice";

import $ from "./style.module.scss";

type Props = {
  id: number;
  title: string;
  content?: string;
  isLast?: boolean;
  isNotice?: boolean;
  isSubscribe?: boolean;
};

function BoardItem({
  id,
  title,
  content,
  isNotice,
  isSubscribe,
  isLast = false,
}: Props) {
  const { pathname } = useLocation();
  const to = isLast ? `/board/article/${id}` : `${pathname}/${id}`;
  const dispatch = useDispatch();
  const handleBoardClick = () => {
    dispatch(pushBreadcrumb({ breadcrumb: { path: `${id}`, name: title } }));
  };

  if (isLast) {
    return (
      <Link className={classnames($["board-item"], $.last)} to={to}>
        <div className={$.title}>
          {title}
          <Arrow size={6} stroke="#AAAAAA" />
        </div>
        <SubscriptionNoticeGroup
          id={id}
          isNotice={isNotice ?? false}
          isSubscribe={isSubscribe ?? false}
        />
      </Link>
    );
  }

  return (
    <Link className={$["board-item"]} to={to} onClick={handleBoardClick}>
      <div className={$.title}>{title}</div>
      <div className={$.content}>{content}</div>
    </Link>
  );
}

export default BoardItem;
