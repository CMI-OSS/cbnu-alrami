import { css } from "@emotion/css";
import { cssHash } from "@admin/utils/hash";

export default () => {
  const card = cssHash();

  const scenarioCardList = css`
    display: flex;
    flex-wrap: wrap;

    .${card} {
      width: 18%;
      margin-left: 1%;
      margin-right: 1%;
      margin-top: 10px;
    }
  `;

  return { scenarioCardList, card };
};
