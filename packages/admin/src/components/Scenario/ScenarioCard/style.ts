import { css } from "@emotion/css";
import { colors } from "@shared/styles/color";
import { hashClassNames } from "src/lib/hash";

export type ColorType = "green" | "yellow" | "red" | "gray";

interface Props {
  stateColor: ColorType;
}

const colorSelector = (color: ColorType) => {
  if (color === "green") return colors.$googleGreen;
  if (color === "yellow") return colors.$googleYellow;
  if (color === "red") return colors.$googleRed;
  if (color === "gray") return colors.$gray.$500;

  return "";
};

export default ({ stateColor }: Props) => {
  const { title, tag, stateText, stateContainer, color } = hashClassNames([
    "title",
    "tag",
    "stateText",
    "stateContainer",
    "color",
  ]);

  const scenarioCard = css`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: flex-start;
    flex: none;
    width: 19rem;
    min-height: 9rem;
    padding: 1.5rem;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
      rgba(17, 17, 26, 0.1) 0px 0px 8px;
    border-radius: 1rem;
    background-color: ${colors.$white};

    :hover {
      box-shadow: 0 0 0 0.2rem ${colors.$lightBlue};
      cursor: pointer;
    }

    .${title} {
      margin-bottom: 0.7rem;
      font-size: 1.4rem;
      font-weight: bold;
      color: ${colors.$darkNavy};
    }

    .${tag} {
      margin-top: 0.5rem;
      padding: 0.4rem 0.6rem;
      font-size: 0.9rem;
      border-radius: 0.5rem;
      background-color: ${colors.$lightBlue};
      color: ${colors.$white};
    }

    .${color} {
      width: 1rem;
      height: 1rem;
      border-radius: 1rem;
      background-color: ${colorSelector(stateColor)};
    }

    .${stateText} {
      margin-right: 0.3rem;
      font-size: 0.9rem;
      color: ${colors.$gray.$500};
    }

    .${stateContainer} {
      display: flex;
      position: absolute;
      right: 1rem;
      align-items: center;
    }
  `;

  return {
    scenarioCard,
    title,
    tag,
    stateText,
    stateContainer,
    color,
  };
};
