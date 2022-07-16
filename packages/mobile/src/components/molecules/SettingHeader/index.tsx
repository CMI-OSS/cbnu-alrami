import React from "react";
import { useNavigate } from "react-router-dom";

import { MapArrow } from "src/components/atoms/icon";

import $ from "./style.module.scss";

interface Props {
  title: string;
}

export default function SettingHeader({ title }: Props) {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  return (
    <div className={$.header}>
      <button type="button" className={$["back-btn"]} onClick={handleGoBack}>
        <MapArrow />
        <span className="blind">뒤로가기</span>
      </button>
      <h1 className={$.title}>{title}</h1>
    </div>
  );
}
