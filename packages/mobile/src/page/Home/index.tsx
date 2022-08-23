import { useEffect, useState } from "react";
import { isAndroid, isIOS } from "react-device-detect";
import { Link } from "react-router-dom";

import Footer from "@components/molecules/Footer";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSchedule } from "src/api/schedule";
import { useWeathers } from "src/api/weather";
import { Setting } from "src/components/atoms/icon";
import Weather from "src/page/Home/Weather";

import Notice from "./Notice";
import Restaurant from "./Restaurant";
import Schedule from "./Schedule";
import $ from "./style.module.scss";
import SuggestionModal from "./SuggestionModal";

function Home() {
  const [ uuid, setUuid ] = useState("");
  const today = dayjs();
  const { data: scheduleData } = useSchedule(today.format("YYYY-MM-DD"));
  const { data: weatherData } = useWeathers();
  const [ isSuggestionClicked, setIsSuggestionClicked ] = useState(false);

  useEffect(() => {
    if (isAndroid) {
      setUuid(JSON.stringify(localStorage.getItem("token")));
      alert(uuid);
    }
    if (isIOS) {
      setUuid(JSON.stringify(localStorage.getItem("token")));
      alert(uuid);
    }
  }, [ uuid ]);

  if (!weatherData) return <div>날씨 로딩 실패</div>;
  const weather = weatherData.data;

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
        <SuggestionModal
          currentTemperature={parseInt(weather.currentTemp, 10)}
          onClick={handleSuggestionClick}
        />
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
      <Weather weather={weather} onSuggestionClick={handleSuggestionClick} />
      <Restaurant />
      <Notice />
      <Footer />
    </section>
  );
}

export default Home;
