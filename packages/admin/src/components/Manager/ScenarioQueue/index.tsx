import getStyle from "./style";

interface Props {
  prev: {
    title: string;
  };
  current: {
    title: string;
  };
  next: {
    title: string;
  };
}

export default function ScenarioQueue({ prev, current, next }: Props) {
  const style = getStyle();

  return (
    <article className={style.scenarioQueue}>
      <h2 className={style.scenarioQueueTitle}>시나리오 큐</h2>
      <div className={style.queue}>
        <p className={style.prev}>{prev.title}</p>
        <p className={style.current}>{current.title}</p>
        <p className={style.next}>{next.title}</p>
      </div>
    </article>
  );
}
