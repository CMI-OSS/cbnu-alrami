import { useEffect, useState } from "react";
import { isAndroid, isIOS } from "react-device-detect";
import { Link } from "react-router-dom";

import Footer from "@components/molecules/Footer";
import dayjs from "dayjs";
import { useSchedule } from "src/api/schedule";
import { Setting } from "src/components/atoms/icon";
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
  const {
    data: scheduleData,
    isLoading: isScheduleLoading,
    error,
  } = useSchedule(today.format("YYYY-MM-DD"));

  const detectHoliday = (schedules: res.Schedule[]) => {
    const today = dayjs();
    const isWeekend = today.day() >= 5;
    if (isWeekend) return true;
    let isHoliday = false;
    schedules.forEach((schedule) => {
      if (schedule.isHoliday) isHoliday = true;
    });
    return isHoliday;
  };

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

  if (isScheduleLoading) return <div>학사일정 로딩중...</div>;
  if (scheduleData === undefined) return <div>학사일정 불러오기 실패</div>;

  return (
    <section className={$.home}>
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
      <Weather />
      <Restaurant today={today} isHoliday={detectHoliday(scheduleData.data)} />
      <Notice />
      <Footer />
    </section>
  );
}

export default Home;
