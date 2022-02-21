import { ScraperLog } from "@shared/types";
import { useEffect, useRef } from "react";
import getStyle from "./style";

interface Props {
  logs: Array<ScraperLog>;
}

export default function ExcutionLog({ logs }: Props) {
  const style = getStyle();
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef.current?.scrollIntoView(false);
  }, [ logs ]);

  return (
    <section className={style.excutionLog}>
      <h2 className={style.excutionLogTitle}>실행 로그</h2>
      <div className={style.excutionBox} ref={boxRef}>
        {logs.map((log, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={index} className={style.log}>
            {log.prefix ? `[${log.prefix}]` : ""} {log.message}
          </p>
        ))}
      </div>
    </section>
  );
}
