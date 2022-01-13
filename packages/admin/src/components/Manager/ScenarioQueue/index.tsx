import { ScenarioQueueType } from "src/types";
import getStyle from "./style";

interface Props {
  queue: ScenarioQueueType[];
}

export default function ScenarioQueue({ queue }: Props) {
  const style = getStyle();

  return (
    <article className={style.scenarioQueue}>
      <h2 className={style.scenarioQueueTitle}>시나리오 큐</h2>
      <div className={style.queue}>
        {queue.map(({ turn, title }) => (
          <p key={turn + title} className={style[`${turn}`]}>
            {title}
          </p>
        ))}
      </div>
    </article>
  );
}
