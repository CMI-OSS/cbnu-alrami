import AtomCard from "src/components/atoms/NewCard";

import { 구독안함, 구독하고알람안함, 구독하고알람함 } from "../../End";
import $ from "./style.module.scss";

type Props = {
  data: {
    name: string;
    isSubscribing: boolean;
    isNoticing: boolean;
  };
};

function Card({ data }: Props) {
  return (
    <div className={$.card}>
      <AtomCard height={102}>
        <div className={$["atom-card"]}>
          <div className={$.name}>{data.name}</div>
          <div className={$.status}>
            {data.isSubscribing && data.isNoticing && <구독하고알람함 />}
            {data.isSubscribing && !data.isNoticing && <구독하고알람안함 />}
            {!data.isSubscribing && <구독안함 />}
          </div>
        </div>
      </AtomCard>
    </div>
  );
}

export default Card;
