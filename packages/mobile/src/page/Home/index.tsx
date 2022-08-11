import { useEffect, useState } from "react";
import { isAndroid, isIOS } from "react-device-detect";
import { Link } from "react-router-dom";

import Footer from "@components/molecules/Footer";
import dayjs from "dayjs";
import { usePopularArticles } from "src/api/article";
import { useSchedule } from "src/api/schedule";
import { Setting } from "src/components/atoms/icon";
import Weather from "src/page/Home/Weather";

import Notice from "./Notice";
import Restaurant from "./Restaurant";
import Schedule from "./Schedule";
import $ from "./style.module.scss";

function Home() {
  const today = dayjs();
  const [ uuid, setUuid ] = useState("");
  const onMessageHandler = (e: any) => {
    const event = JSON.parse(e.data);
    setUuid(e.data); // Todo: uuid 보내는 api 연결
    localStorage.setItem("item", JSON.stringify(event));
  };
  const {
    data: popularArticleData,
    isLoading: popularArticleLoading,
    isError: popularArticleError,
  } = usePopularArticles();
  const {
    data: scheduleData,
    isLoading: scheduleLoading,
    isError: scheduleError,
  } = useSchedule(today.format("YYYY-MM-DD"));

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

  if (popularArticleLoading || scheduleLoading) return <div>로딩중입니다.</div>;
  if (popularArticleError || scheduleError)
    return <div>에러가 발생했습니다.</div>;
  if (scheduleData === undefined) return <div>일정 불러오기 실패</div>;

  const popularNotifications = popularArticleData!.data;
  // TODO: 백엔드 api 확인 후 수정
  const schedules = scheduleData.data;

  const lastestNotifications = [ "최신1", "최신2", "최신3", "최신4", "최신5" ];

  return (
    <section className={$.home}>
      <header className={$.header}>
        <div className={$["header-content"]}>
          <h1 className={$.title}>충림이</h1>
          <p>오늘은 총 {schedules.length}개의 일정이 있어요</p>
        </div>
        <Link to="/setting">
          <Setting size={24} stroke="#aaa" />
        </Link>
      </header>
      <div className={$.schedule}>
        {schedules.map(({ id, content, startDate, endDate }) => {
          return (
            <Schedule key={id} {...{ content, startDate, endDate, today }} />
          );
        })}
      </div>
      <Weather />
      <Restaurant />
      <Notice />
      <Footer />
    </section>
  );
}

export default Home;
