import { css } from "@emotion/css";
import { hashClassNames } from "@admin/utils/hash";

export default () => {
  const hashedStyle = hashClassNames([ "selector" ]);
  const { selector } = hashedStyle;

  const selectorContainer = css`
    display: flex;
    margin-left: 3rem;

    .${selector} {
      height: 2rem;
      padding: 0.5rem;
      margin: 0 1rem;
      border: none;
    }
  `;

  return { selectorContainer, selector };
};
