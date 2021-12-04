import { css } from "@emotion/css";
import { hashClassNames } from "@admin/utils/hash";

export default () => {
  const hashedStyle = hashClassNames([
    "scenarioCardList",
    "card",
    "groupTitle",
  ]);
  const { scenarioCardList, card, groupTitle } = hashedStyle;

  const groupContainer = css`
    .${scenarioCardList} {
      display: flex;
      justify-content: left;
      flex-wrap: wrap;
      align-items: flex-start;
      margin: 3rem;
    }

    .${card} {
      margin-left: 2rem;
      margin-top: 2rem;
    }

    .${groupTitle} {
      font-size: 2rem;
      margin-left: 3rem;
      margin-top: 2rem;
    }
  `;

  return { groupContainer, scenarioCardList, card, groupTitle };
};
