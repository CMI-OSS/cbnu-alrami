import React from "react";
import { useNavigate } from "react-router-dom";

import useSwipe from "@hooks/useSwipe";

import $ from "./style.module.scss";

type Props = {
  left?: JSX.Element;
  title?: string;
  right?: JSX.Element;
  children: React.ReactNode;
  onNavigate?: () => void;
  style?: React.CSSProperties;
};

function FullPageModalTemplate({
  left,
  title,
  right,
  children,
  onNavigate,
  style,
}: Props) {
  const navigate = useNavigate();
  const swipeRef = useSwipe();
  const handleBackClick = () => {
    if (onNavigate) {
      return onNavigate();
    }
    if (window.history.length <= 1) {
      return navigate("/");
    }
    return navigate(-1);
  };

  return (
    <div className={$["full-modal"]} ref={swipeRef}>
      <div className={$.header} style={style}>
        <button type="button" className={$.left} onClick={handleBackClick}>
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
