import React from "react";
import { useLocation } from "react-router-dom";

import {
  Alarm,
  LeftArrow,
  Subscription,
  UnAlarm,
  UnSubscription,
} from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import {
  useBoardQuery,
  useNoticeBoardMutation,
  useSubscribeBoardMutation,
  useUnNoticeBoardMutation,
  useUnSubscribeBoardMutation,
} from "@hooks/api/board";
import ArticleList from "src/page/Article/components/ArticleList";

import $ from "./style.module.scss";

function BoardArticle() {
  const id = Number(useLocation().pathname.split("/").at(-1));
  const { data: boardData } = useBoardQuery({ id, uuid: "1111" });
  const postSubscribeBoard = useSubscribeBoardMutation();
  const deleteSubscribeBoard = useUnSubscribeBoardMutation();
  const postNoticeBoard = useNoticeBoardMutation();
  const deleteUnNoticeBoard = useUnNoticeBoardMutation();

  if (!boardData) return <></>;

  const handleUnNoticeClick = () => {
    deleteUnNoticeBoard.mutate({ id, uuid: "1111" });
  };

  const handleNoticeClick = () => {
    postNoticeBoard.mutate({ id, uuid: "1111" });
  };

  const handleUnSubscriptionClick = () => {
    deleteSubscribeBoard.mutate({ id, uuid: "1111" });
  };

  const handleSubscriptionClick = () => {
    postSubscribeBoard.mutate({ id, uuid: "1111" });
  };

  const { name, isNotice, isSubscribe } = boardData;
  return (
    <div className={$["board-article"]}>
      <FullPageModalTemplate
        left={
          <div className={$.left}>
            <LeftArrow stroke="#AAAAAA" size={16} />
            <span>{name}</span>
          </div>
        }
        right={
          <div className={$.right}>
            {isSubscribe ? (
              <div className={$.icon}>
                <button type="button" onClick={handleUnSubscriptionClick}>
                  <Subscription size={30} stroke="#D66D6E" />
                </button>
                {isNotice ? (
                  <button type="button" onClick={handleUnNoticeClick}>
                    <Alarm size={22} stroke="#D66D6E" />
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
        }
      >
        <ArticleList className={$["article-list-wrap"]} />
      </FullPageModalTemplate>
    </div>
  );
}

export default BoardArticle;
