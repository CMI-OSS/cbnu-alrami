import React from "react";
import { useNavigate } from "react-router-dom";

import { LeftArrow, Plus } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";

import $ from "./style.module.scss";

function Setting() {
  const navigate = useNavigate();

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
        하이용
      </FullPageModalTemplate>
    </div>
  );
}

export default Setting;
