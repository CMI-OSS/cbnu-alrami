import { css } from "@emotion/css";
import { colors } from "@shared/styles/color";
import { hashClassNames } from "src/lib/hash";

export default () => {
  const { mainTitle, scenarioTitle } = hashClassNames([
    "mainTitle",
    "scenarioTitle",
  ]);

  const main = css`
    margin-left: 13rem;

    .${mainTitle} {
      margin: 8rem 0 4rem 3rem;
      font-size: 3rem;
      font-weight: 400;
    }
    .${scenarioTitle} {
      margin: 0 0 1rem 3rem;
      font-size: 2.3rem;
      font-weight: 400;
    }
  `;

  return { main, mainTitle, scenarioTitle };
};
