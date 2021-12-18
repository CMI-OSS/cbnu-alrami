import { css } from "@emotion/css";
import { colors } from "@shared/styles/color";
import { hashClassNames } from "src/utils/hash";

export default () => {
  const hashedStyle = hashClassNames([ "select", "label", "arrowIcon" ]);
  const { label, select, arrowIcon } = hashedStyle;

  const selectContainer = css`
    display: flex;
    margin-left: 3rem;

    .${select} {
      height: 2rem;
      padding: 0.5rem;
      margin: 0 1rem;
      border: none;
      border-radius: 0.7rem;
      :hover {
        box-shadow: 0 0 0 0.1rem ${colors.$lightBlue};
        cursor: pointer;
      }
    }
  `;

  return { selectContainer, select, label, arrowIcon };
};
