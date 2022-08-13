import {
  Alarm,
  Subscription,
  UnAlarm,
  UnSubscription,
} from "@components/atoms/icon";
import {
  useAddAlarm,
  useAddSubscribe,
  useRemoveAlarm,
  useRemoveSubscribe,
} from "src/api/subscribe";

import $ from "./style.module.scss";

type Props = {
  boardId?: number;
  isSubscribing?: boolean;
  isNoticing?: boolean;
};

function Status({ boardId, isSubscribing, isNoticing }: Props) {
  const addAlarm = useAddAlarm();
  const removeAlarm = useRemoveAlarm();
  const addSubscribe = useAddSubscribe();
  const removeSubscribe = useRemoveSubscribe();
  if (!boardId) return <></>;

  if (isSubscribing && isNoticing) {
    return (
      <div className={$.status}>
        <button
          type="button"
          onClick={() => {
            removeSubscribe.mutate({ boardId });
          }}
        >
          <Subscription size={30} stroke="#D66D6E" />
        </button>
        <button
          type="button"
          onClick={() => {
            removeAlarm.mutate({ boardId });
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
            removeSubscribe.mutate({ boardId });
          }}
        >
          <Subscription size={30} stroke="#D66D6E" />
        </button>
        <button
          type="button"
          onClick={() => {
            addAlarm.mutate({ boardId });
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
        addSubscribe.mutate({ boardId });
      }}
    >
      <UnSubscription size={30} stroke="#aaaaaa" />
    </button>
  );
}

export default Status;
