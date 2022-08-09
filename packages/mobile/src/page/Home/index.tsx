import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Footer from "@components/molecules/Footer";
import dayjs from "dayjs";
import { COLLEGE_SCHEDULES } from "src/__mocks__/schedules";
import { usePopularArticles } from "src/api/article";
import { useSchedule } from "src/api/schedule";
import BorderBox from "src/components/atoms/BorderBox";
import { Setting } from "src/components/atoms/icon";
import Line from "src/components/atoms/Line";
import Weather from "src/page/Home/Weather";

import Restaurant from "./Restaurant";
import Schedule from "./Schedule";
import $ from "./style.module.scss";

function Home() {
  const [ searchParams ] = useSearchParams();
  const noti = searchParams.get("noti") || "popular";
  const {
    data: popularArticleData,
    isLoading: popularArticleLoading,
    isError: popularArticleError,
  } = usePopularArticles();
  const {
    data: scheduleData,
    isLoading: scheduleLoading,
    isError: scheduleError,
  } = useSchedule();
  const today = useMemo(() => {
    return dayjs();
  }, []);

  if (popularArticleLoading || scheduleLoading) return <div>로딩중입니다.</div>;
  if (popularArticleError || scheduleError)
    return <div>에러가 발생했습니다.</div>;

  const popularNotifications = popularArticleData!.data;
  // TODO: 백엔드 api 확인 후 수정
  const schedules = scheduleData!.data;

  const lastestNotifications = [ "최신1", "최신2", "최신3", "최신4", "최신5" ];

  return (
    <section className={$.home}>
      <header className={$.header}>
        <div className={$["header-content"]}>
          <h1 className={$.title}>충림이</h1>
          <p>오늘은 총 {COLLEGE_SCHEDULES.length}개의 일정이 있어요</p>
        </div>
        <Link to="/setting">
          <Setting size={24} stroke="#aaa" />
        </Link>
      </header>
      <div className={$.schedule}>
        {COLLEGE_SCHEDULES.map(({ id, content, startDate, endDate }) => {
          return (
            <Schedule key={id} {...{ content, startDate, endDate, today }} />
          );
        })}
      </div>
      <Weather />
      <Restaurant />
      <div className={$.notification}>
        <BorderBox height={300}>
          <div className={$.title}>
            공지사항
            <div className={$.category}>
              <Link
                to="?noti=popular"
                className={noti === "popular" ? $.active : $.inactive}
              >
                인기
              </Link>
              <Link
                to="?noti=latest"
                className={noti === "latest" ? $.active : $.inactive}
              >
                최신
              </Link>
            </div>
          </div>
          <Line />
          <div className={$["notification-content"]}>
            {noti === "popular"
              ? popularNotifications?.map((notification) => {
                  return <p key={notification.id}>{notification.title}</p>;
                })
              : lastestNotifications.map((notification) => {
                  return <p key={notification}>{notification}</p>;
                })}
          </div>
        </BorderBox>
      </div>
      <Footer />
    </section>
  );
}

export default Home;
