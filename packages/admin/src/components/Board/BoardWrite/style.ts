import { css } from "@emotion/css";
import { colors } from "@shared/styles/color";
import { hashClassNames } from "src/lib/hash";

export default () => {
  const { warn, titleBox, title, errorMessage, horizonLine, submit } =
    hashClassNames([
      "warn",
      "titleBox",
      "title",
      "errorMessage",
      "horizonLine",
      "submit",
    ]);

  const main = css`
    display: flex;
    flex-direction: column;
    margin-left: 13rem;
    padding: 3rem;

    .${warn} {
      ::placeholder {
        color: ${colors.$googleRed};
      }
    }

    .${titleBox} {
      .${title} {
        width: 75%;
        resize: none;
        outline: none;
        border: none;
        background-color: transparent;
        color: ${colors.$black};
        font-size: 2.75rem;
        font-weight: 500;
        word-break: break-all;
        cursor: pointer;
      }
      .${horizonLine} {
        width: 5rem;
        height: 0.5rem;
        margin: 1.5rem 0;
        background-color: ${colors.$darkMode};
      }
    }

    .${submit} {
      width: 6.5rem;
      height: 2.3rem;
      outline: none;
      border: none;
      border-radius: 0.3rem;
      background-color: #005299;
      color: ${colors.$white};
      font-size: 1.2rem;
      font-weight: 500;
      cursor: pointer;
      &:hover {
        background-color: ${colors.$lightBlue};
      }
    }
  `;

  return { main, warn, titleBox, title, errorMessage, horizonLine, submit };
};
