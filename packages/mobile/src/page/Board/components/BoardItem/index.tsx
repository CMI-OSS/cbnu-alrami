import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import Drawer from "@components/molecules/Drawer";
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
  const [ isOpen, setIsOpen ] = useState(false);
  const { pathname } = useLocation();
  const to = isLast ? `/board/article/${id}` : `${pathname}/${id}`;
  const dispatch = useDispatch();
  const handleBoardClick = () => {
    dispatch(pushBreadcrumb({ breadcrumb: { path: `${id}`, name: title } }));
  };

  if (isLast) {
    return (
      <>
        <button
          type="button"
          className={classnames($["board-item"], $.last)}
          onClick={() => {
            return setIsOpen(true);
          }}
        >
          <div className={$.title}>{title}</div>
          <SubscriptionNoticeGroup
            isSubscribe={isSubscribe!}
            isNotice={isNotice!}
          />
        </button>
        <Drawer
          {...{ id, isOpen, setIsOpen, to }}
          isSubscribe={isSubscribe!}
          isNotice={isNotice!}
        />
      </>
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
