import Icon from "@components/atoms/icon/Icon";
import classnames from "classnames";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  isPreview?: boolean;
  isNotice: boolean;
  isSubscribe: boolean;
} & DefaultProps;

function SubscriptionNoticeGroup({
  isPreview = false,
  isNotice,
  isSubscribe,
  className,
}: Props) {
  if (isPreview) {
    return (
      <button
        type="button"
        className={classnames($["subscription-notice-group"], className)}
      >
        <div className={$.group}>
          <Icon
            name={isSubscribe ? "subscribe" : "unSubscribe"}
            size={24}
            color={isSubscribe ? "#D66D6E" : "#828282"}
          />

          <Icon
            name={isNotice ? "alarm" : "unalarm"}
            size={24}
            color={isNotice ? "#D66D6E" : "#828282"}
          />
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={classnames($["subscription-notice-group"], className)}
    >
      {isSubscribe && (
        <div className={$.group}>
          <Icon name="subscribe" size={24} color="#D66D6E" />
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
