import { css } from "@emotion/css";
import { colors } from "@shared/styles";
import { cssHash } from "@admin/utils/hash";

export default () => {
  const title = cssHash();
  const form = cssHash();
  const id = cssHash();
  const idBox = cssHash();
  const password = cssHash();
  const pwBox = cssHash();
  const isFocus = cssHash();
  const icon = cssHash();
  const unLock = cssHash();
  const submit = cssHash();
  const message = cssHash();
  const img = cssHash();
  const lockBox = cssHash();

  const loginForm = css`
    display: flex;
    flex-direction: column;
    height: 100vh;

    .${title} {
      color: ${colors.$cbnu};
      font-size: 3rem;
      font-weight: bold;
      margin: auto auto 30px auto;
    }
    .${form} {
      width: 500px;
      margin: 0 auto 30px auto;
      border: 1px solid ${colors.$grayLine};
      border-radius: 7px;
      box-shadow: 0 2px 6px 0 rgb(68 68 68 / 8%);
      display: flex;
      flex-direction: column;

      .${icon} {
        margin: auto 10px;
        font-size: 1.2rem;
        color: ${colors.$grayLine};
      }

      .${idBox} {
        display: flex;
        height: 50px;
        border: 1px solid ${colors.$grayLine};
        border-radius: 7px 7px 0 0;
        padding: 2px 5px;
        margin: 30px 30px 0px 30px;
        box-shadow: 0 2px 6px 0 rgb(68 68 68 / 8%);

        .${id} {
          outline: none;
          border: none;
          width: 300px;
          font-size: 1.2rem;
        }
      }

      .${pwBox} {
        display: flex;
        height: 50px;
        border: 1px solid ${colors.$grayLine};
        border-radius: 0 0 7px 7px;
        padding: 2px 5px;
        margin: -1px 30px 30px 30px;
        box-shadow: 0 2px 6px 0 rgb(68 68 68 / 8%);

        .${lockBox} {
          margin: 0;
          padding: 0;
          background-color: transparent;
          border: 0;
          outline: 0;

          .${unLock} {
            margin: auto 10px;
            font-size: 1.2rem;
            color: ${colors.$cbnu};
          }
          & :hover {
            color: ${colors.$cbnu};
          }
        }

        .${password} {
          outline: none;
          border: none;
          width: 300px;
          font-size: 1.2rem;
        }
      }

      .${isFocus} {
        border: 2px solid ${colors.$cbnu};
        z-index: 5;
      }

      .${submit} {
        border: none;
        height: 70px;
        background-color: ${colors.$cbnu};
        color: white;
        padding: 2px 5px;
        margin: 30px;
        font-size: 1.5rem;
        border-radius: 7px;
        box-shadow: 0 2px 6px 0 rgb(68 68 68 / 8%);
      }

      .${message} {
        height: 19px;
        font-size: 1.2rem;
        margin: 0 30px;
        color: ${colors.$cbnu};
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
    id,
    pwBox,
    isFocus,
    icon,
    unLock,
    lockBox,
    password,
    submit,
    message,
    img,
  };
};
