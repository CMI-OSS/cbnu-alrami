import React from "react";
import { useLocation } from "react-router-dom";

import { LeftArrow } from "@components/atoms/icon";
import SubscriptionNoticeGroup from "@components/shared/SubscriptionNoticeGroup";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import { useBoardQuery } from "@hooks/api/board";
import ArticleList from "src/page/Article/components/ArticleList";

import $ from "./style.module.scss";

function BoardArticle() {
  const id = Number(useLocation().pathname.split("/").at(-1));
  const uuid = "1111";
  const { data: boardData } = useBoardQuery({ id, uuid });

  if (!boardData) return <></>;

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
            <SubscriptionNoticeGroup
              id={id}
              isNotice={isNotice ?? false}
              isSubscribe={isSubscribe ?? false}
            />
          </div>
        }
      >
        <ArticleList className={$["article-list-wrap"]} />
      </FullPageModalTemplate>
    </div>
  );
}

export default BoardArticle;
