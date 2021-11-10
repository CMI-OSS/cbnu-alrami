import { css } from "@emotion/css";
import { cssHash } from "@admin/utils/hash";

export default () => {
  const mainTitle = cssHash();

  const main = css`
    margin-left: 200px;

    .${mainTitle} {
      font-weight: 400;
      font-size: 3rem;
      margin-left: 5%;
      margin-top: 15vh;
      margin-bottom: 10vh;
    }
  `;

  return { main, mainTitle };
};
