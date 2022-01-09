import { css } from "@emotion/css";
import { colors } from "@shared/styles/color";
import { hashClassNames } from "src/lib/hash";

export default (parent: string) => {
  //   const { tooltip } = hashClassNames([ "tooltip" ]);

  const tooltip = css`
    visibility: hidden;
    z-index: 1;
    position: absolute;
    /* bottom: 100%;
            left: 50%; */
    min-width: 6rem;
    width: fit-content;
    padding: 0.5rem;
    border-radius: 6px;
    background-color: ${colors.$darkMode};
    color: ${colors.$white};
    font-size: 0.8rem;
    text-align: center;
  `;

  const parentHover = css`
    .${parent}:hover {
      .${tooltip} {
        visibility: visible;
      }
    }
  `;

  return {
    tooltip,
    parentHover,
  };
};
