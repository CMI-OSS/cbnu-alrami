import { css } from "@emotion/css";
import { colors } from "@shared/styles";
import { cssHash } from "@admin/utils/hash";

export default () => {
  const activated = cssHash();
  const sideNavUl = cssHash();
  const sideNavLi = cssHash();
  const insideBtn = cssHash();
  const logo = cssHash();

  const Navigation = css`
    background-color: ${colors.$white};
    position: fixed;
    top: 0;
    left: 0;
    width: 200px;
    height: 100vh;

    .${sideNavUl} {
        margin: 20px 0 0 20px;
        display: flex;
        flex-direction: column;
        align-items: left;
        width: 100%
        height: 100%
    }

    .${sideNavLi} {
        margin: 20px 0 0 0;
        font-size: 1.3rem;
    }

    .${logo} {
        font-weight: bold;
        font-size: 1.3rem;
    }

    .${insideBtn} {
        cursor: pointer;
        border: none;
        background-color: transparent;
        font-size: 1.2rem;
        font-weight: 200;
    }

    .${insideBtn}:hover {
        font-weight: 600;
        color: ${colors.$darkNavy};
    }

    .${activated} {
        font-weight: 600;
        color: ${colors.$darkNavy};
    }

  `;

  return { Navigation, activated, sideNavUl, sideNavLi, logo, insideBtn };
};
