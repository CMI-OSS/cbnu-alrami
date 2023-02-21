import { useSubscribeBoardsQuery } from "@hooks/api/board";
import SettingTemplate from "src/page/Setting/SettingTemplate";

import $ from "./style.module.scss";

function Subscription() {
  const { data: subscribeBoardsData } = useSubscribeBoardsQuery({
    uuid: "1111",
  });

  return (
    <SettingTemplate title="구독/알림">
      <div className={$.subscription}>
        {subscribeBoardsData?.map((subscribeBoardData) => {
          const { combinedName, isNotice, isSubscribe } = subscribeBoardData;
          return <div className={$.item}>{combinedName}</div>;
        })}
      </div>
    </SettingTemplate>
  );
}

export default Subscription;
