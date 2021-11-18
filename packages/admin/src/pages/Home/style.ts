import { css } from "@emotion/css";
import { cssHash } from "@admin/utils/hash";

export default () => {
  const mainTitle = cssHash();

  const main = css`
    margin-left: 13rem;

    .${mainTitle} {
      margin: 8rem 0 5rem 3rem;
      font-size: 3rem;
      font-weight: 400;
    }
  `;

  return { main, mainTitle };
};
