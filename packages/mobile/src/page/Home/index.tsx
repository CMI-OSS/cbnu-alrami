import { useEffect, useState } from "react";
import { isAndroid, isIOS } from "react-device-detect";
import { Link } from "react-router-dom";

import Footer from "@components/molecules/Footer";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSchedule } from "src/api/schedule";
import { Close, Setting } from "src/components/atoms/icon";
import Weather from "src/page/Home/Weather";

import Notice from "./Notice";
import Restaurant from "./Restaurant";
import Schedule from "./Schedule";
import $ from "./style.module.scss";

function Home() {
  const [ uuid, setUuid ] = useState("");
  const onMessageHandler = (e: any) => {
    const event = JSON.parse(e.data);
    setUuid(e.data); // Todo: uuid 보내는 api 연결
    localStorage.setItem("item", JSON.stringify(event));
  };
  const today = dayjs();
  const { data: scheduleData } = useSchedule(today.format("YYYY-MM-DD"));
  const [ isSuggestionClicked, setIsSuggestionClicked ] = useState(true);

  useEffect(() => {
    if (window.ReactNativeWebView) {
      if (isAndroid) {
        document.addEventListener("message", onMessageHandler);
      }
      if (isIOS) {
        window.addEventListener("message", onMessageHandler);
      }
    }
  }, [ uuid ]);

  const handleSuggestionClick = () => {
    setIsSuggestionClicked((pre) => {
      return !pre;
    });
  };

  return (
    <section
      className={classNames($.home, {
        [$["suggestion-mode"]]: isSuggestionClicked,
      })}
    >
      {isSuggestionClicked && (
        <div className={$["suggestion-modal"]}>
          <div className={$["content-box"]}>
            <button
              className={$["close-button"]}
              type="button"
              aria-label="옷차림 추천 닫기"
              onClick={handleSuggestionClick}
            >
              <Close size={14} stroke="#828282" />
            </button>
            <ul className={$["temperature-list"]}>
              <li>28°C~</li>
              <li>23~27°C</li>
              <li>20~22°C</li>
              <li>17~19°C</li>
              <li>9~11°C</li>
              <li>5~8°C</li>
              <li>~4°C</li>
            </ul>
            <div className={$["temperature-bar"]}></div>
            <ul className={$["suggestion-list"]}>
              <li>
                민소매, 반팔, 반바지,
                <br /> 원피스
              </li>
              <li>
                반팔, 얇은 셔츠, 반바지,
                <br />
                면바지
              </li>
              <li>
                얇은 가디건, 긴팔,
                <br />
                면바지, 청바지
              </li>
              <li>
                얇은 니트, 맨투맨,
                <br />
                가디건, 청바지
              </li>
              <li>
                자켓, 트렌치코트, 야상,
                <br />
                니트, 청바지, 스타킹
              </li>
              <li>
                코트, 가죽자켓, 히트텍,
                <br />
                니트, 레깅스
              </li>
              <li>
                패딩, 두꺼운코트,
                <br />
                목도리, 기모제품
              </li>
            </ul>
          </div>
        </div>
      )}
      <header className={$.header}>
        <div className={$["header-content"]}>
          <h1 className={$.title}>충림이</h1>
          <p>오늘은 총 {scheduleData?.data.length}개의 일정이 있어요</p>
        </div>
        <Link to="/setting">
          <Setting size={24} stroke="#aaa" />
        </Link>
      </header>
      <div className={$.schedule}>
        {scheduleData?.data.map(({ id, content, startDate, endDate }) => {
          return (
            <Schedule key={id} {...{ content, startDate, endDate, today }} />
          );
        })}
      </div>
      <Weather onSuggestionClick={handleSuggestionClick} />
      <Restaurant />
      <Notice />
      <Footer />
    </section>
  );
}

export default Home;
