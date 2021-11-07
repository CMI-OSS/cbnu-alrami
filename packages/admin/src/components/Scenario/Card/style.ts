import { css } from "@emotion/css";
import { palette } from "@shared/styles";
import { cssHash } from "@admin/utils/hash";

export default () => {
  const title = cssHash();
  const tag = cssHash();

  const scenarioCard = css`
    padding: 10px;
    border: 1px solid ${palette.$black};

    .${title} {
      font-size: 1.4rem;
    }

    .${tag} {
      background-color: violet;
      color: white;
      padding: 2px 5px;
      font-size: 0.8rem;
      border-radius: 10px;
    }
  `;

  return { scenarioCard, title, tag };
};
