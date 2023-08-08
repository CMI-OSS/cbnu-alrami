import { useState } from "react";
import { useLocation } from "react-router-dom";

import { LeftArrow } from "@components/atoms/icon";
import Drawer from "@components/molecules/Drawer";
import SubscriptionNoticeGroup from "@components/shared/SubscriptionNoticeGroup";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import { useBoardQuery } from "@hooks/api/board";
import ArticleList from "src/page/Article/components/ArticleList";

import $ from "./style.module.scss";

function BoardArticle() {
  const id = Number(useLocation().pathname.split("/").at(-1));
  const { data: boardData } = useBoardQuery({ id });
  const [ isOpen, setIsOpen ] = useState(false);

  if (!boardData) return <></>;

  const { name, isNotice, isSubscribe } = boardData;

  return (
    <div className={$["board-article"]}>
      <FullPageModalTemplate
        left={
          <div className={$.left}>
            <LeftArrow size={16} />
            <span>{name}</span>
          </div>
        }
        right={
          <button
            type="button"
            className={$.right}
            onClick={() => {
              return setIsOpen(true);
            }}
          >
            <SubscriptionNoticeGroup
              isPreview
              isNotice={isNotice ?? false}
              isSubscribe={isSubscribe ?? false}
            />
          </button>
        }
      >
        <ArticleList className={$["article-list-wrap"]} />
      </FullPageModalTemplate>
      <Drawer
        {...{ id, isOpen, setIsOpen }}
        isSubscribe={isSubscribe!}
        isNotice={isNotice!}
      />
    </div>
  );
}

export default BoardArticle;
