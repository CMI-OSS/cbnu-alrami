import { css } from "@emotion/css";
import { colors } from "@shared/styles/color";
import { hashClassNames } from "src/utils/hash";

export enum Colors {
  Green = "Green",
  Yellow = "Yellow",
  Red = "Red",
  Gray = "Gray",
}

interface Props {
  statusColor: Colors;
}

const colorSelector = (color: Colors) => {
  if (color === Colors.Green) return colors.$googleGreen;
  if (color === Colors.Yellow) return colors.$googleYellow;
  if (color === Colors.Red) return colors.$googleRed;
  return colors.$gray.$500;
};

export default ({ statusColor }: Props) => {
  const { title, tag, statusText, statusContainer, color } = hashClassNames([
    "title",
    "tag",
    "statusText",
    "statusContainer",
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
      background-color: ${colorSelector(statusColor)};
    }

    .${statusText} {
      margin-right: 0.3rem;
      font-size: 0.9rem;
      color: ${colors.$gray.$500};
    }

    .${statusContainer} {
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
    statusText,
    statusContainer,
    color,
  };
};
