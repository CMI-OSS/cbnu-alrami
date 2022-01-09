import { ExcutionLogType } from "@shared/types";
import getStyle from "./style";

interface Props {
  log: ExcutionLogType;
}

export default function ExcutionLog({ log }: Props) {
  const style = getStyle();

  return (
    <section className={style.excutionLog}>
      <h2 className={style.excutionLogTitle}>실행 로그</h2>
      <div className={style.excutionBox}>
        {Object.entries(log).map((content) => {
          if (content[0] === "commands" && typeof content[1] === "object") {
            return content[1].map((command: string) => (
              <p key={command} className={style.log}>
                {command}
              </p>
            ));
          }

          return (
            <p key={content[0] + content[1]} className={style.log}>
              {content[1]}
            </p>
          );
        })}
      </div>
    </section>
  );
}
