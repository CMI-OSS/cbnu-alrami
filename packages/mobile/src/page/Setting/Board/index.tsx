import { Link } from "react-router-dom";

import { Plus } from "@components/atoms/icon";
import SubscriptionNoticeGroup from "@components/shared/SubscriptionNoticeGroup";
import { useSubscribeBoardsQuery } from "@hooks/api/board";
import { useSetRecoilState } from "recoil";
import SettingTemplate from "src/page/Setting/SettingTemplate";
import { boardOriginStatus } from "src/states";

import $ from "./style.module.scss";

function Board() {
  const { data: subscribeBoardsData } = useSubscribeBoardsQuery({
    uuid: "1111",
  });
  const setBoardOriginState = useSetRecoilState(boardOriginStatus);

  const handlePlusClick = () => {
    setBoardOriginState("setting");
  };

  return (
    <SettingTemplate
      title="구독/알림"
      right={
        <Link to="/board" onClick={handlePlusClick}>
          <Plus size={16} stroke="#AAAAAA" />
        </Link>
      }
    >
      <div className={$.subscription}>
        {subscribeBoardsData?.map((subscribeBoardData) => {
          const { id, combinedName, isNotice, isSubscribe } =
            subscribeBoardData;
          return (
            <div className={$.item}>
              <span>{combinedName}</span>
              <SubscriptionNoticeGroup
                className={$.buttons}
                id={id}
                isNotice={isNotice ?? false}
                isSubscribe={isSubscribe ?? false}
              />
            </div>
          );
        })}
      </div>
    </SettingTemplate>
  );
}

export default Board;
