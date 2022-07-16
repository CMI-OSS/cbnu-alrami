import React from "react";
import { useNavigate } from "react-router-dom";

import {
  MapArrow,
  Subscribe,
  Food,
  Speaker,
  Experiment,
  Help,
  AppVersion,
  Email,
  Person,
} from "src/components/atoms/icon";
import SettingMenu from "src/components/molecules/SettingMenu";

import $ from "./style.module.scss";

const settingMenuList = [
  {
    id: 1,
    icon: Subscribe,
    label: "구독/알림",
    to: "./subscribe",
  },
  {
    id: 2,
    icon: Food,
    label: "대표식당",
    to: "./cafeteria",
  },
  {
    id: 3,
    icon: Experiment,
    label: "실험실",
    to: "./experiment",
  },
  {
    id: 4,
    icon: Speaker,
    label: "공지사항",
    to: "./notice",
  },
  {
    id: 5,
    icon: Help,
    label: "공지사항",
    to: "./help",
  },
  {
    id: 6,
    icon: AppVersion,
    label: "앱 버전",
    to: "./appversion",
  },
  {
    id: 7,
    icon: Email,
    label: "문의하기",
    to: "./contact",
  },
  {
    id: 8,
    icon: Person,
    label: "만든이",
    to: "./creator",
  },
];

export default function Setting() {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  return (
    <>
      <div className={$.header}>
        <button type="button" className={$["back-btn"]} onClick={handleGoBack}>
          <MapArrow />
          <span className="blind">뒤로가기</span>
        </button>
        <h1 className={$.title}>설정</h1>
      </div>
      <main className={$["setting-main"]}>
        {settingMenuList.map((route) => (
          <SettingMenu route={route} />
        ))}
      </main>
    </>
  );
}
