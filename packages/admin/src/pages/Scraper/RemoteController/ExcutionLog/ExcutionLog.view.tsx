import { useEffect, useRef } from "react";

import { ScraperLog } from "@shared/types";
import classnames from "classnames";

import $ from "./ExcutionLog.module.scss";

interface Props {
  logs: Array<ScraperLog>;
}

export default function ExcutionLogView({ logs }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef.current?.scrollTo(0, boxRef.current.scrollHeight);
  }, [ logs ]);

  return (
    <section className={$.container}>
      <h2>실행 로그</h2>
      <div>
        {logs.map((log, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={index}>
            <span className={classnames($[log.prefix ?? ""], $.prefix)}>
              {log.prefix ? `[${log.prefix}]` : ""}
            </span>
            {log.message}
          </p>
        ))}
      </div>
    </section>
  );
}
