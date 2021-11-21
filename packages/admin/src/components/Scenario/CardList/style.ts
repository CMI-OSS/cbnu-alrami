import { css } from "@emotion/css";
import { cssHash } from "@admin/utils/hash";

export default () => {
  const scenarioCardList = cssHash();
  const card = cssHash();
  const groupTitle = cssHash();

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
    }
  `;

  return { groupContainer, scenarioCardList, card, groupTitle };
};
