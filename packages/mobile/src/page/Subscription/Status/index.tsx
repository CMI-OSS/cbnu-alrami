import {
  Alarm,
  Subscription,
  UnAlarm,
  UnSubscription,
} from "@components/atoms/icon";

type Props = {
  isSubscribing: boolean;
  isNoticing: boolean;
};

function Status({ isSubscribing, isNoticing }: Props) {
  if (isSubscribing && isNoticing) {
    return (
      <>
        <Subscription size={30} stroke="#aaaaaa" />
        <Alarm size={20} stroke="#aaaaaa" />
      </>
    );
  }
  if (isSubscribing && !isNoticing) {
    return (
      <>
        <Subscription size={30} stroke="#aaaaaa" />
        <UnAlarm size={20} stroke="#aaaaaa" />
      </>
    );
  }

  return <UnSubscription size={30} stroke="#aaaaaa" />;
}

export default Status;
