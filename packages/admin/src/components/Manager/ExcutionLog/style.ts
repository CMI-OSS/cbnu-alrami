import { css } from "@emotion/css";
import { colors } from "@shared/styles/color";
import { hashClassNames } from "src/lib/hash";

export default () => {
  const { excutionLogTitle, excutionBox, log } = hashClassNames([
    "excutionLogTitle",
    "excutionBox",
    "log",
  ]);

  const excutionLog = css`
    display: flex;
    flex-direction: column;
    width: 43rem;

    padding: 1.5rem;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
      rgba(17, 17, 26, 0.1) 0px 0px 8px;
    border-radius: 1rem;
    background-color: ${colors.$white};

    .${excutionLogTitle} {
      margin-bottom: 1rem;
      font-size: 2rem;
      font-weight: 500;
      color: ${colors.$darkNavy};
    }
    .${excutionBox} {
      margin: auto 0;
      height: 10rem;
      overflow-y: auto;
      .${log} {
        margin: 0.3rem 0;
        font-size: 1rem;
      }
    }
  `;

  return { excutionLog, excutionLogTitle, excutionBox, log };
};
