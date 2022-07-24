import React from "react";
import { useNavigate } from "react-router-dom";

import { Close, LeftArrow } from "@components/atoms/icon";

import $ from "./style.module.scss";

type Props = {
  children: React.ReactNode;
};

function FullModalTemplate({ children }: Props) {
  const navigate = useNavigate();

  return (
    <div className={$.subscription}>
      <div className={$.header}>
        <button type="button" onClick={() => navigate(-1)}>
          <LeftArrow />
        </button>
        <button
          type="button"
          onClick={() => navigate("/subscription/setting", { replace: true })}
        >
          <Close />
        </button>
      </div>
      {children}
    </div>
  );
}

export default FullModalTemplate;
