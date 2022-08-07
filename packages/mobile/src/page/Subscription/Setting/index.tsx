import React from "react";
import { useNavigate } from "react-router-dom";

import { LeftArrow, Plus } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import guideEmptySubscriptionSetting from "src/assets/guide_empty_subscription_setting.png";

import Card from "./Card";
import $ from "./style.module.scss";

function Setting() {
  const navigate = useNavigate();
  const mockSettings = [
    {
      isSubscribing: false,
      isNoticing: false,
      name: "경영대학 > 경영정보학과 > 학과공지",
    },
    {
      isSubscribing: true,
      isNoticing: false,
      name: "경영대학 > 경영정보학과 > 대학원공지",
    },
    {
      isSubscribing: true,
      isNoticing: true,
      name: "경영대학 > 경영정보학과 > 학생회공지",
    },
    {
      isSubscribing: false,
      isNoticing: false,
      name: "경영대학 > 경영정보학과 > 학과공지",
    },
    {
      isSubscribing: true,
      isNoticing: false,
      name: "경영대학 > 경영정보학과 > 대학원공지",
    },
    {
      isSubscribing: true,
      isNoticing: true,
      name: "경영대학 > 경영정보학과 > 학생회공지",
    },
    {
      isSubscribing: false,
      isNoticing: false,
      name: "경영대학 > 경영정보학과 > 학과공지",
    },
    {
      isSubscribing: true,
      isNoticing: false,
      name: "경영대학 > 경영정보학과 > 대학원공지",
    },
    {
      isSubscribing: true,
      isNoticing: true,
      name: "경영대학 > 경영정보학과 > 학생회공지",
    },
  ];

  const guideImageViewCondition = mockSettings.length === 0;

  return (
    <div className={$.setting}>
      <FullPageModalTemplate
        left={
          <button
            type="button"
            onClick={() => {
              return navigate(-1);
            }}
          >
            <LeftArrow stroke="#AAAAAA" size={16} />
          </button>
        }
        title="구독/알림"
        right={
          <button
            type="button"
            onClick={() => {
              return navigate("/subscription");
            }}
          >
            <Plus stroke="#AAAAAA" size={20} />
          </button>
        }
      >
        <div className={$.content}>
          {guideImageViewCondition ? (
            <img
              src={guideEmptySubscriptionSetting}
              alt="구독 환경설정 목록 미존재"
            />
          ) : (
            mockSettings.map((data) => {
              return <Card key={data.name} data={data} />;
            })
          )}
        </div>
      </FullPageModalTemplate>
    </div>
  );
}

export default Setting;
