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
      margin: 5%;
    }

    .${card} {
      margin-left: 2%;
      margin-right: 2%;
      margin-top: 20px;
    }

    .${groupTitle} {
      font-size: 30px;
      margin-left: 5%;
    }
  `;

  return { groupContainer, scenarioCardList, card, groupTitle };
};
