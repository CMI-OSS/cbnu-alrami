import { css } from "@emotion/css";
import { colors } from "@shared/styles/color";
import { hashClassNames } from "src/utils/hash";

export default () => {
  const {
    title,
    form,
    idBox,
    pwBox,
    box,
    input,
    focus,
    icon,
    lock,
    unLock,
    submit,
    message,
    img,
    lockBox,
  } = hashClassNames([
    "title",
    "form",
    "idBox",
    "pwBox",
    "box",
    "input",
    "focus",
    "icon",
    "lock",
    "unLock",
    "submit",
    "message",
    "img",
    "lockBox",
  ]);

  const loginForm = css`
    background-color: white;
    display: flex;
    flex-direction: column;
    height: 100vh;

    .${title} {
      margin: auto auto 30px auto;
      color: ${colors.$primary};
      font-size: 3rem;
      font-weight: bold;
    }

    .${form} {
      display: flex;
      flex-direction: column;
      width: 500px;
      margin: 0 auto 30px auto;
      border: 1px solid ${colors.$gray.$400};
      border-radius: 7px;
      box-shadow: 0 2px 6px 0 rgb(68 68 68 / 8%);

      .${lock}, .${icon} {
        margin: auto 10px;
        color: ${colors.$gray.$400};
        font-size: 1.2rem;
      }

      .${idBox} {
        margin: 30px 30px 0px 30px;
        border-radius: 7px 7px 0 0;
      }

      .${pwBox} {
        margin: -1px 30px 30px 30px;
        border-radius: 0 0 7px 7px;
      }

      .${box} {
        display: flex;
        height: 50px;
        padding: 2px 5px;
        border: 1px solid ${colors.$gray.$400};
        box-shadow: 0 2px 6px 0 rgb(68 68 68 / 8%);

        .${lockBox} {
          margin: 0;
          padding: 0;
          border: 0;
          outline: 0;
          background-color: transparent;

          .${unLock} {
            margin: auto 10px;
            color: ${colors.$primary};
            font-size: 1.2rem;
          }

          & :hover {
            color: ${colors.$primary};
          }
        }

        .${input} {
          width: 300px;
          border: none;
          outline: none;
          font-size: 1.2rem;
        }
      }

      .${focus} {
        z-index: 5;
        padding: 2px 4px;
        border: 2px solid ${colors.$primary};
      }

      .${submit} {
        height: 70px;
        padding: 2px 5px;
        margin: 30px;
        border: none;
        border-radius: 7px;
        box-shadow: 0 2px 6px 0 rgb(68 68 68 / 8%);
        background-color: ${colors.$primary};
        color: white;
        font-size: 1.5rem;
      }

      .${message} {
        height: 19px;
        margin: 0 30px;
        color: ${colors.$primary};
        font-size: 1.2rem;
        font-weight: bold;
      }
    }

    .${img} {
      width: 400px;
      margin: 0 auto auto auto;
    }
  `;

  return {
    title,
    loginForm,
    form,
    idBox,
    pwBox,
    box,
    input,
    focus,
    icon,
    lock,
    unLock,
    lockBox,
    submit,
    message,
    img,
  };
};
