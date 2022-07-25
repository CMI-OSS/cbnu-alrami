import React from "react";
import { useNavigate } from "react-router-dom";

import $ from "./style.module.scss";

type Props = {
  left: JSX.Element;
  title?: string;
  right?: JSX.Element;
  children: React.ReactNode;
};

function FullPageModalTemplate({ left, title, right, children }: Props) {
  const navigate = useNavigate();

  return (
    <div className={$["full-modal"]}>
      <div className={$.header}>
        <button type="button" className={$.left} onClick={() => navigate(-1)}>
          {left}
        </button>
        <div className={$.title}>{title}</div>
        <div className={$.right}>{right}</div>
      </div>
      {children}
    </div>
  );
}

export default FullPageModalTemplate;
