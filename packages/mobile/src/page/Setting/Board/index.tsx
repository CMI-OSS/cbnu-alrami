import { useState } from "react";
import { Link } from "react-router-dom";

import { Plus } from "@components/atoms/icon";
import Drawer from "@components/molecules/Drawer";
import SubscriptionNoticeGroup from "@components/shared/SubscriptionNoticeGroup";
import { useSubscribeBoardsQuery } from "@hooks/api/board";
import guideEmptySubscriptionSetting from "src/assets/guide_empty_subscription_setting.svg";
import SettingTemplate from "src/page/Setting/SettingTemplate";

import $ from "./style.module.scss";

function Board() {
  const { data: subscribeBoardsData } = useSubscribeBoardsQuery();
  const [ isOpen, setIsOpen ] = useState(false);
  const [ clickedId, setClickedId ] = useState<number>();
  const clickedBoard = subscribeBoardsData?.find((subscribeBoardData) => {
    return subscribeBoardData.id === clickedId;
  });

  if (!subscribeBoardsData?.length) {
    return (
      <SettingTemplate
        title="구독/알림"
        right={
          <Link className={$.link} to="/board">
            <Plus size={16} stroke="#AAAAAA" />
          </Link>
        }
      >
        <div className={$["empty-subscription"]}>
          <img
            src={guideEmptySubscriptionSetting}
            width={283}
            alt="구독중인 공지사항 없음"
          />
        </div>
      </SettingTemplate>
    );
  }

  return (
    <SettingTemplate
      title="구독/알림"
      right={
        <Link className={$.link} to="/board">
          <Plus size={16} stroke="#AAAAAA" />
        </Link>
      }
    >
      <div className={$.subscription}>
        {subscribeBoardsData?.map((subscribeBoardData) => {
          const { id, combinedName, isNotice, isSubscribe } =
            subscribeBoardData;
          return (
            <>
              <button
                type="button"
                className={$.item}
                onClick={() => {
                  setClickedId(id);
                  return setIsOpen(true);
                }}
              >
                <span>{combinedName}</span>
                <SubscriptionNoticeGroup
                  className={$.buttons}
                  isNotice={isNotice ?? false}
                  isSubscribe={isSubscribe ?? false}
                />
              </button>
            </>
          );
        })}
      </div>
      {clickedId && (
        <Drawer
          {...{ isOpen, setIsOpen }}
          to={`/board/article/${clickedId}`}
          id={clickedId}
          isSubscribe={clickedBoard?.isSubscribe ?? false}
          isNotice={clickedBoard?.isNotice ?? false}
        />
      )}
    </SettingTemplate>
  );
}

export default Board;
