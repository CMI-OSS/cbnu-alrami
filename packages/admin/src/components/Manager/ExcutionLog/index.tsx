import { useEffect, useRef } from "react";

import { ScraperLog } from "@shared/types";

import $ from "./style.module.scss";

interface Props {
  logs: Array<ScraperLog>;
}

export default function ExcutionLog({ logs }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef.current?.scrollTo(0, boxRef.current.scrollHeight);
  }, [ logs ]);

  return (
    <section className={$.container}>
      <h2>실행 로그</h2>
      <div>
        {logs.map((log, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <p key={index}>
              {log.prefix ? `[${log.prefix}]` : ""} {log.message}
            </p>
          );
        })}
      </div>
    </section>
  );
}
