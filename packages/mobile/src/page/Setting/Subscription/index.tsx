import { Link } from "react-router-dom";

import { useSubscribeBoards } from "src/api/subscribe";
import { Plus } from "src/components/atoms/icon";
import SettingTemplate from "src/page/Setting/SettingTemplate";
import Status from "src/page/Subscription/Status";

import $ from "./style.module.scss";

function Subscription() {
  const { data: subscribeBoards } = useSubscribeBoards();

  return (
    <SettingTemplate
      title="구독/알림"
      right={
        <Link to="/subscription">
          <Plus size={16} stroke="#aaaaaa" />
        </Link>
      }
      className={$.subscription}
    >
      {subscribeBoards?.map((board) => {
        return (
          <div key={board.boardId} className={$.item}>
            <span>{board.name}</span>
            <Status
              boardId={board.boardId}
              isNoticing={board.isNoticing}
              isSubscribing
            />
          </div>
        );
      })}
    </SettingTemplate>
  );
}

export default Subscription;
