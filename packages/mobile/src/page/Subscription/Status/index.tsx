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
import { DefaultProps } from "src/type/props";
import { toastSuccess } from "src/utils/toast";

import $ from "./style.module.scss";

type Props = {
  boardId: number;
  isSubscribing: boolean;
  isNoticing: boolean;
} & DefaultProps;

function Status({ boardId, isSubscribing, isNoticing, className }: Props) {
  const addAlarm = useAddAlarm();
  const removeAlarm = useRemoveAlarm();
  const addSubscribe = useAddSubscribe();
  const removeSubscribe = useRemoveSubscribe();

  if (isSubscribing && isNoticing) {
    return (
      <div className={$.status}>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            removeSubscribe.mutate({ boardId });
            toastSuccess({ message: "구독이 해제되었습니다." });
          }}
        >
          <Subscription size={30} stroke="#D66D6E" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            removeAlarm.mutate({ boardId });
            toastSuccess({ message: "알림이 해제되었습니다." });
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
          onClick={(e) => {
            e.preventDefault();
            removeSubscribe.mutate({ boardId });
            toastSuccess({ message: "구독이 해제되었습니다." });
          }}
        >
          <Subscription size={30} stroke="#D66D6E" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            addAlarm.mutate({ boardId });
            toastSuccess({ message: "알림이 설정되었습니다." });
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
      onClick={(e) => {
        e.preventDefault();
        addSubscribe.mutate({ boardId });
        toastSuccess({ message: "구독이 설정되었습니다." });
      }}
    >
      <UnSubscription size={30} stroke="#aaaaaa" />
    </button>
  );
}

export default Status;
