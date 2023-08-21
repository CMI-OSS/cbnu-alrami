import { useState } from "react";
import { isIOS, isMacOs, isSafari } from "react-device-detect";

import { Close, LongArrow } from "@components/atoms/icon";
import classNames from "classnames";
import { isWebView } from "src/utils/webview";

import $ from "./style.module.scss";

// TODO(chloe): 링크 추가 필요
function DeepLink() {
  const [ isHidden, setIsHidden ] = useState(false);
  if (isWebView) return <></>;

  return (
    <div className={classNames($.deeplink, { [$.isHidden]: isHidden })}>
      <button
        type="button"
        className={$.left}
        onClick={() => {
          if (isIOS || isSafari || isMacOs) {
            window.open(
              "https://apps.apple.com/kr/app/%EC%B6%A9%EB%A6%BC%EC%9D%B4/id6447121993",
            );

            return;
          }
          window.open(
            "https://play.google.com/store/apps/details?id=com.cbnu_alrami.app&hl=ko",
          );
        }}
      >
        충림이 앱 다운받기 <LongArrow size={6} stroke="#fff" />
      </button>
      <button
        type="button"
        onClick={() => {
          return setIsHidden(true);
        }}
        className={$.right}
      >
        <Close size={12} stroke="#fff" />
      </button>
    </div>
  );
}

export default DeepLink;
