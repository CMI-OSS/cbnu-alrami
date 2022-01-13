import { css } from "@emotion/css";
import { colors } from "@shared/styles/color";
import { hashClassNames } from "src/lib/hash";

export default () => {
  const { scenarioQueueTitle, queue, prev, next, current } = hashClassNames([
    "scenarioQueueTitle",
    "queue",
    "prev",
    "next",
    "current",
  ]);

  const scenarioQueue = css`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 32rem;
    min-height: 16rem;
    margin: 0 7rem 2rem 0;
    padding: 1.5rem;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
      rgba(17, 17, 26, 0.1) 0px 0px 8px;
    border-radius: 1rem;
    background-color: ${colors.$white};

    .${scenarioQueueTitle} {
      font-size: 2rem;
      font-weight: 500;
      color: ${colors.$darkNavy};
    }
    .${queue} {
      margin: auto 0;
      text-align: center;
      .${prev}, .${next} {
        font-size: 1.3rem;
        color: ${colors.$gray.$400};
        &:not(:first-child) {
          margin-top: 1.3rem;
        }
      }
      .${current} {
        margin-top: 1.3rem;
        font-size: 2rem;
      }
    }
  `;

  return {
    scenarioQueue,
    scenarioQueueTitle,
    queue,
    prev,
    next,
    current,
  };
};
