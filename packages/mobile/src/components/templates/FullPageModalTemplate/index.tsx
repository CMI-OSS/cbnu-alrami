import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import $ from "./style.module.scss";

type Props = {
  left?: JSX.Element;
  title?: string;
  right?: JSX.Element;
  children: React.ReactNode;
};

function FullPageModalTemplate({ left, title, right, children }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // TODO: 분기처리 지우기.. 모달에서 X누르면 그 전 history state를 삭제가 안되서 이렇게 작업
  return (
    <div className={$["full-modal"]}>
      <div className={$.header}>
        <button
          type="button"
          className={$.left}
          onClick={() => {
            if (pathname === "/setting/subscription") {
              return navigate("/home");
            }
            return navigate(-1);
          }}
        >
          {left}
        </button>
        <div className={$.title}>{title}</div>
        <div className={$.right}>{right}</div>
      </div>
      <div className={$.children}>{children}</div>
    </div>
  );
}

export default FullPageModalTemplate;
