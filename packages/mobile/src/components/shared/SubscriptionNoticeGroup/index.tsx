import React from "react";

import Icon from "@components/atoms/icon/Icon";
import classnames from "classnames";
import { useAppDispatch } from "src/store";
import { setHasFooter } from "src/store/toastSlice";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  isNotice: boolean;
  isSubscribe: boolean;
} & DefaultProps;

// TODO: dispatch 왜 있나 확인하기
// TODO: 이거 쓰는 부분 제거
function SubscriptionNoticeGroup({ isNotice, isSubscribe, className }: Props) {
  const dispatch = useAppDispatch();

  const handleGroupClick = () => {
    dispatch(setHasFooter({ hasFooter: false }));
  };

  return (
    <button
      type="button"
      className={classnames($["subscription-notice-group"], className)}
      onClick={handleGroupClick}
    >
      {isSubscribe && (
        <div className={$.group}>
          <Icon name="subscribe" size={28} color="#D66D6E" />
          {isNotice ? (
            <Icon name="alarm" size={24} color="#D66D6E" />
          ) : (
            <Icon name="unalarm" size={24} />
          )}
        </div>
      )}
    </button>
  );
}

export default SubscriptionNoticeGroup;
