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
import { toastError, toastSuccess } from "src/utils/toast";

import $ from "./style.module.scss";

type Props = {
  boardId: number;
  isSubscribing: boolean;
  isNoticing: boolean;
} & DefaultProps;

function Status({ boardId, isSubscribing, isNoticing, ...props }: Props) {
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
            try {
              toastSuccess({ message: "구독이 해제되었습니다." });
            } catch (e) {
              toastError({ message: "구독설정에 실패했습니다" });
            }
          }}
        >
          <Subscription size={30} stroke="#D66D6E" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            removeAlarm.mutate({ boardId });
            try {
              toastSuccess({ message: "알림이 해제되었습니다." });
            } catch (e) {
              toastError({ message: "알림설정에 실패했습니다" });
            }
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
            try {
              toastSuccess({ message: "구독이 해제되었습니다." });
            } catch (e) {
              toastError({ message: "구독설정에 실패했습니다" });
            }
          }}
        >
          <Subscription size={30} stroke="#D66D6E" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            addAlarm.mutate({ boardId });
            try {
              toastSuccess({ message: "알림이 설정되었습니다." });
            } catch (e) {
              toastError({ message: "알림설정에 실패했습니다" });
            }
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
        try {
          addSubscribe.mutate({ boardId });
          toastSuccess({ message: "구독이 설정되었습니다." });
        } catch (e) {
          toastError({ message: "구독설정에 실패했습니다" });
        }
      }}
    >
      <UnSubscription size={30} stroke="#aaaaaa" />
    </button>
  );
}

export default Status;
