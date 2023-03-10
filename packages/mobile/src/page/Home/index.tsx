import { useState } from "react";
import { Link } from "react-router-dom";

import { CMIAppLogo, Setting } from "@components/atoms/icon";
import Footer from "@components/molecules/Footer";
import { useTodaySchedulesQuery } from "@hooks/api/schedule";
import { useWeathersQuery } from "@hooks/api/weather";
import classNames from "classnames";
import dayjs from "dayjs";
import Article from "src/page/Home/Article";
import Weather from "src/page/Home/Weather";

import Restaurant from "./Restaurant";
import Schedule from "./Schedule";
import $ from "./style.module.scss";
import SuggestionModal from "./SuggestionModal";

function Home() {
  const today = dayjs();
  const { data: scheduleData, isLoading: isScheduleLoading } =
    useTodaySchedulesQuery(today.format("YYYY-MM-DD"));

  const { data: weatherData } = useWeathersQuery();
  const [ isSuggestionClicked, setIsSuggestionClicked ] = useState(false);

  if (isScheduleLoading) return <div>학사일정 로딩중...</div>;
  if (scheduleData === undefined) return <div>학사일정 불러오기 실패</div>;
  if (!weatherData) return <div>날씨 로딩 실패</div>;

  const { isHoliday } = scheduleData;

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
          currentTemperature={weatherData.currentTemp}
          onClick={handleSuggestionClick}
        />
      )}
      <header className={$.header}>
        <CMIAppLogo size={29} />
        <Link to="/setting">
          <Setting size={24} stroke="#aaa" />
        </Link>
      </header>
      <div className={$.schedule}>
        {scheduleData.schedules.map(
          ({ id, content, startDateTime, endDateTime }) => {
            return (
              <Schedule
                key={id}
                {...{ content, startDateTime, endDateTime, today }}
              />
            );
          },
        )}
      </div>
      <Weather
        weather={weatherData}
        onSuggestionClick={handleSuggestionClick}
      />
      <Restaurant {...{ today, isHoliday }} />
      <Article />
      <Footer />
    </section>
  );
}

export default Home;
