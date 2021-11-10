import { css } from "@emotion/css";
import { colors } from "@shared/styles";
import { cssHash } from "@admin/utils/hash";

export default () => {
  const title = cssHash();
  const tag = cssHash();
  const statusText = cssHash();
  const statusContainer = cssHash();
  const red = cssHash();
  const yellow = cssHash();
  const green = cssHash();

  const scenarioCard = css`
    position: relative;
    padding: 20px;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    border-radius: 12px;
    width: 300px;
    min-height: 230px;
    background-color: ${colors.$white};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: none;

    :hover {
      outline: 2px solid ${colors.$lightBlue};
      cursor: pointer;
    }
    
    .${title} {
      font-size: 1.4rem;
      color: ${colors.$darkNavy};
      font-weight: bold;
      margin-bottom: 5px;
    }

    .${tag} {
      background-color: ${colors.$lightBlue};
      color: ${colors.$white};
      margin-top: 10px;
      padding: 7px 10px;
      font-size: 0.9rem;
      border-radius: 10px;
    }

    .${red} {
      width: 15px;
      height: 15px;
      border-radius: 15px;
      background-color: ${colors.$googleRed};
    }

    .${yellow} {
      width: 15px;
      height: 15px;
      border-radius: 15px;
      background-color: ${colors.$googleYellow};
    }

    .${green} {
      width: 15px;
      height: 15px;
      border-radius: 15px;
      background-color: ${colors.$googleGreen};
    }

    .${statusText} {
      font-size: 14px;
      color: ${colors.$darkGrey};
      margin-right: 5px;
    }

    .${statusContainer} {
      position: absolute;
      display: flex;
      align-items: center;
      right: 20px;
    }

  `;

  return { scenarioCard, title, tag, statusText, statusContainer, red, yellow, green };
};
