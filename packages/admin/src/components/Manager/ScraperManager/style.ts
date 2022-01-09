import { css } from "@emotion/css";
import { colors } from "@shared/styles/color";
import { hashClassNames } from "src/lib/hash";

export default () => {
  const {
    managerHeader,
    managerTitle,
    buttonBox,
    button,
    tooltip,
    play,
    pause,
    stop,
    replay,
    disabled,
    managerBox,
  } = hashClassNames([
    "managerHeader",
    "managerTitle",
    "buttonBox",
    "button",
    "tooltip",
    "play",
    "pause",
    "stop",
    "disabled",
    "replay",
    "managerBox",
  ]);

  const manager = css`
    max-width: 84rem;
    margin: 0 3rem 4.5rem 3rem;

    .${managerHeader} {
      display: flex;
      height: 2.3rem;
      margin: 0 0 5rem 0;
      .${managerTitle} {
        height: fit-content;
        font-size: 2.3rem;
        font-weight: 400;
      }
      .${buttonBox} {
        margin-left: auto;
        .${button} {
          height: 2.3rem;
          margin-left: 0.5rem;
          padding: 0;
          border: none;
          outline: none;
          background-color: transparent;
          font-size: 2.3rem;
          cursor: pointer;
          &:first-child {
            margin-left: 0;
          }
          .${tooltip} {
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
          }
          &:hover .${tooltip} {
            visibility: visible;
          }

          .${play} {
            color: ${colors.$googleGreen};
          }
          .${pause} {
            color: ${colors.$googleYellow};
          }
          .${stop} {
            color: ${colors.$googleRed};
          }
          .${replay} {
            color: ${colors.$lightBlue};
            transition: transform ease 0.5s;
            &:hover {
              transform: rotate(-180deg);
            }
          }
          .${disabled} {
            color: ${colors.$gray.$400};
            cursor: not-allowed;
          }
        }
      }
    }
    .${managerBox} {
      display: flex;
      flex-direction: row;
      justify-content: left;
      flex-wrap: wrap;
      align-items: flex-start;
    }
  `;

  return {
    manager,
    managerHeader,
    managerTitle,
    buttonBox,
    button,
    tooltip,
    play,
    pause,
    stop,
    replay,
    disabled,
    managerBox,
  };
};
