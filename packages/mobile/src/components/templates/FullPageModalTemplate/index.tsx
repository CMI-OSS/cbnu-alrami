import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import $ from "./style.module.scss";

type Props = {
  left?: JSX.Element;
  title?: string;
  right?: JSX.Element;
  children: React.ReactNode;
};

// MEMO: /board에서 +후 x클릭 시 히스토리에 쌓이기 때문에 설정부분 뒤로가기 분기처리
function FullPageModalTemplate({ left, title, right, children }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className={$["full-modal"]}>
      <div className={$.header}>
        <button
          type="button"
          className={$.left}
          onClick={() => {
            if (pathname === "/setting/board") {
              return navigate("/setting");
            }
            if (pathname === "/setting") {
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
