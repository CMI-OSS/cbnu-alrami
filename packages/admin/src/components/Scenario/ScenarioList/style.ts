import { css } from "@emotion/css";
import { hashClassNames } from "src/utils/hash";

export default () => {
  const hashedStyle = hashClassNames([ "card" ]);
  const { card } = hashedStyle;

  const scenarioList = css`
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: 3rem;

    .${card} {
      margin-left: 2rem;
      margin-top: 2rem;
    }
  `;

  return { scenarioList, card };
};
