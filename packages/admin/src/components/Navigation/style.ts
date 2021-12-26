import { css } from "@emotion/css";
import { colors } from "@shared/styles/color";
import { hashClassNames } from "src/lib/hash";

export default () => {
  const { activated, sideNavUl, sideNavLi, logo } = hashClassNames([
    "activated",
    "sideNavUl",
    "sideNavLi",
    "logo",
  ]);

  const Navigation = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 13rem;
    height: 100vh;
    z-index: 1;
    background-color: ${colors.$white};

    .${sideNavUl} {
      display: flex;
      flex-direction: column;
      margin: 2rem 0 0 2rem;
      align-items: left;
    }

    .${sideNavLi} {
      margin-left: 0.2rem;
      margin-top: 1.5rem;
      font-size: 1.2rem;
      font-weight: 200;
      cursor: pointer;
      background-color: transparent;

      &:hover {
        font-weight: 600;
        color: ${colors.$darkNavy};
      }
    }

    .${logo} {
      font-size: 1.3rem;
      font-weight: bold;
    }

    .${activated} {
      font-weight: 600;
      color: ${colors.$darkNavy};
    }
  `;

  return { Navigation, activated, sideNavUl, sideNavLi, logo };
};
