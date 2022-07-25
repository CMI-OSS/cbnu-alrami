import React from "react";
import { useNavigate } from "react-router-dom";

import { LeftArrow, Plus } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";

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
  ];

  return (
    <div className={$.setting}>
      <FullPageModalTemplate
        left={
          <button type="button" onClick={() => navigate(-1)}>
            <LeftArrow color="#AAAAAA" />
          </button>
        }
        title="구독/알림"
        right={
          <button type="button" onClick={() => navigate("/subscription")}>
            <Plus color="#AAAAAA" width="20" height="20" />
          </button>
        }
      >
        <div className={$.content}>
          {mockSettings.map((data) => (
            <Card key={data.name} data={data} />
          ))}
        </div>
      </FullPageModalTemplate>
    </div>
  );
}

export default Setting;
