import {
  Alarm,
  Subscription,
  UnAlarm,
  UnSubscription,
} from "@components/atoms/icon";
import {
  useAddAlarmMutation,
  useAddSubscribeMutation,
  useRemoveAlarmMutation,
  useRemoveSubscribeMutation,
  useSubscribeBoardsQuery,
} from "@hooks/api/subscribe";
import { DefaultProps } from "src/type/props";
import { toastError, toastSuccess } from "src/utils/toast";

import $ from "./style.module.scss";

type Props = {
  boardId: number;
} & DefaultProps;

const 구독설정 = ({ boardId }: Props) => {
  const addSubscribeMutation = useAddSubscribeMutation();

  return (
    <button
      type="button"
      className={$.status}
      onClick={(e) => {
        e.preventDefault();
        try {
          addSubscribeMutation.mutate(boardId);
          toastSuccess({ message: "구독이 설정되었습니다." });
        } catch (e) {
          toastError({ message: "구독설정에 실패했습니다" });
        }
      }}
    >
      <UnSubscription size={30} stroke="#aaaaaa" />
    </button>
  );
};

const 구독해제 = ({ boardId }: Props) => {
  const removeSubscribeMutation = useRemoveSubscribeMutation();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        removeSubscribeMutation.mutate(boardId);
        try {
          toastSuccess({ message: "구독이 해제되었습니다." });
        } catch (e) {
          toastError({ message: "구독설정에 실패했습니다" });
        }
      }}
    >
      <Subscription size={30} stroke="#D66D6E" />
    </button>
  );
};

const 알림설정 = ({ boardId }: Props) => {
  const removeAlarmMutation = useRemoveAlarmMutation();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        removeAlarmMutation.mutate(boardId);
        try {
          toastSuccess({ message: "알림이 해제되었습니다." });
        } catch (e) {
          toastError({ message: "알림설정에 실패했습니다" });
        }
      }}
    >
      <Alarm size={20} stroke="#D66D6E" />
    </button>
  );
};

const 알림해제 = ({ boardId }: Props) => {
  const addAlarmMutation = useAddAlarmMutation();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        addAlarmMutation.mutate(boardId);
        try {
          toastSuccess({ message: "알림이 설정되었습니다." });
        } catch (e) {
          toastError({ message: "알림설정에 실패했습니다" });
        }
      }}
    >
      <UnAlarm size={20} stroke="#aaaaaa" />
    </button>
  );
};

function Status({ boardId, ...props }: Props) {
  const { data: subscribeBoards } = useSubscribeBoardsQuery();
  const subscribeBoard = subscribeBoards?.find((board) => {
    return board.boardId === boardId;
  });

  if (!subscribeBoard) {
    return <구독설정 boardId={boardId} />;
  }

  return (
    <div className={$.status}>
      <구독해제 boardId={boardId} />
      {subscribeBoard.isNoticing ? (
        <알림설정 boardId={boardId} />
      ) : (
        <알림해제 boardId={boardId} />
      )}
    </div>
  );
}

export default Status;
