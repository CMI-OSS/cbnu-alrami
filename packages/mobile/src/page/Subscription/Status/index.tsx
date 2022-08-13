import {
  Alarm,
  Subscription,
  UnAlarm,
  UnSubscription,
} from "@components/atoms/icon";
import {
  useAddNotice,
  useAddSubscribe,
  useRemoveNotice,
  useRemoveSubscribe,
} from "src/api/subscribe";

import $ from "./style.module.scss";

type Props = {
  boardId?: number;
  isSubscribing?: boolean;
  isNoticing?: boolean;
};

function Status({ boardId, isSubscribing, isNoticing }: Props) {
  if (!boardId) return <></>;

  if (isSubscribing && isNoticing) {
    return (
      <div className={$.status}>
        <button
          type="button"
          onClick={() => {
            return useRemoveSubscribe(boardId);
          }}
        >
          <Subscription size={30} stroke="#D66D6E" />
        </button>
        <button
          type="button"
          onClick={() => {
            return useRemoveNotice(boardId);
          }}
        >
          <Alarm size={20} stroke="#D66D6E" />
        </button>
      </div>
    );
  }
  if (isSubscribing && !isNoticing) {
    return (
      <div className={$.status}>
        <button
          type="button"
          onClick={() => {
            return useRemoveSubscribe(boardId);
          }}
        >
          <Subscription size={30} stroke="#D66D6E" />
        </button>
        <button
          type="button"
          onClick={() => {
            return useAddNotice(boardId);
          }}
        >
          <UnAlarm size={20} stroke="#aaaaaa" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={$.status}
      onClick={() => {
        return useAddSubscribe(boardId);
      }}
    >
      <UnSubscription size={30} stroke="#aaaaaa" />;{" "}
    </button>
  );
}

export default Status;
