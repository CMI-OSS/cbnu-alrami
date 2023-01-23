import $ from "./ScenarioQueue.module.scss";

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

export default function ScenarioQueueView({ prev, current, next }: Props) {
  return (
    <article className={$.container}>
      <h2>시나리오 큐</h2>
      <div>
        <p>{prev.title}</p>
        <p>{current.title}</p>
        <p>{next.title}</p>
      </div>
    </article>
  );
}
