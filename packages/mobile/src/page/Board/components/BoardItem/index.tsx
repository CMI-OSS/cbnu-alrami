import { Link, useLocation } from "react-router-dom";

import {
  Alarm,
  Arrow,
  Subscription,
  UnAlarm,
  UnSubscription,
} from "@components/atoms/icon";
import {
  useNoticeBoardMutation,
  useSubscribeBoardMutation,
  useUnNoticeBoardMutation,
  useUnSubscribeBoardMutation,
} from "@hooks/api/board1";
import classnames from "classnames";

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
  const postSubscribeBoard = useSubscribeBoardMutation();
  const deleteSubscribeBoard = useUnSubscribeBoardMutation();
  const postNoticeBoard = useNoticeBoardMutation();
  const deleteUnNoticeBoard = useUnNoticeBoardMutation();

  const handleUnNoticeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteUnNoticeBoard.mutate({ id, uuid: "1111" });
  };

  const handleNoticeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    postNoticeBoard.mutate({ id, uuid: "1111" });
  };

  const handleUnSubscriptionClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    deleteSubscribeBoard.mutate({ id, uuid: "1111" });
  };

  const handleSubscriptionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    postSubscribeBoard.mutate({ id, uuid: "1111" });
  };

  if (isLast) {
    return (
      <Link className={classnames($["board-item"], $.last)} to={to}>
        <div className={$.title}>
          {title}
          <Arrow size={4} stroke="#AAAAAA" />
        </div>
        <div className={$.action}>
          {isSubscribe ? (
            <div className={$.icon}>
              <button type="button" onClick={handleUnSubscriptionClick}>
                <Subscription
                  size={30}
                  stroke="#D66D6E
"
                />
              </button>
              {isNotice ? (
                <button type="button" onClick={handleUnNoticeClick}>
                  <Alarm
                    size={22}
                    stroke="#D66D6E
"
                  />
                </button>
              ) : (
                <button type="button" onClick={handleNoticeClick}>
                  <UnAlarm size={22} stroke="#AAAAAA" />
                </button>
              )}
            </div>
          ) : (
            <button type="button" onClick={handleSubscriptionClick}>
              <UnSubscription size={30} stroke="#AAAAAA" />
            </button>
          )}
        </div>
      </Link>
    );
  }
  return (
    <Link className={$["board-item"]} to={to}>
      <div className={$.title}>{title}</div>
      <div className={$.content}>{content}</div>
    </Link>
  );
}

export default BoardItem;
