import React from "react";

import Icon from "@components/atoms/icon/Icon";
import classnames from "classnames";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  isNotice: boolean;
  isSubscribe: boolean;
} & DefaultProps;

function SubscriptionNoticeGroup({ isNotice, isSubscribe, className }: Props) {
  return (
    <button
      type="button"
      className={classnames($["subscription-notice-group"], className)}
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
