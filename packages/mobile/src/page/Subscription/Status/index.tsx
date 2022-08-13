import {
  Alarm,
  Subscription,
  UnAlarm,
  UnSubscription,
} from "@components/atoms/icon";

type Props = {
  isSubscribing?: boolean;
  isNoticing?: boolean;
};

function Status({ isSubscribing, isNoticing }: Props) {
  if (isSubscribing && isNoticing) {
    return (
      <>
        <Subscription size={30} stroke="#D66D6E" />
        <Alarm size={20} stroke="#D66D6E" />
      </>
    );
  }
  if (isSubscribing && !isNoticing) {
    return (
      <>
        <Subscription size={30} stroke="#D66D6E" />
        <UnAlarm size={20} stroke="#aaaaaa" />
      </>
    );
  }

  return <UnSubscription size={30} stroke="#aaaaaa" />;
}

export default Status;
