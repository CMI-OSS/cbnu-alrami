import Footer from "@components/molecules/Footer";
import BorderBox from "src/components/atoms/BorderBox";
import { Setting } from "src/components/atoms/icon";
import { Arrow } from "src/components/atoms/icon/Arrow";
import Line from "src/components/atoms/Line";

import Restaurant from "./Restaurant";
import $ from "./style.module.scss";
import Weather from "./Weather";

function Home() {
  const [ searchParams ] = useSearchParams();
  const noti = searchParams.get("noti") || "popular";

  const schedules = [
    "중간고사",
    "제목이 아주 긴 일정 제목이 아주 긴일정 제목이 아주 긴",
    "출근싫어",
  ];
  const popular_notifications = [
    "2022학년도 정시 대학원(일반대학원) 석사과정1",
    "산업인공지능연구센터 연구원 채용 공고2",
    "2022학년도 정시 법무대학원 신입생 추가3",
    "2022학년도 정시 대학원(일반대학원) 석사과정4",
    "산업인공지능연구센터 연구원 채용 공고5",
  ];
  const lastest_notifications = [ "최신1", "최신2", "최신3", "최신4", "최신5" ];

  return (
    <section className={$.home}>
      <header className={$.header}>
        <div className={$["header-content"]}>
          <h1 className={$.title}>충림이</h1>
          <p>오늘은 총 6개의 일정이 있어요</p>
        </div>
        <button type="button">
          <Setting />
        </button>
      </header>
      <div className={$.schedule}>
        {schedules.map((schedule) => (
          <BorderBox key={schedule} width={271} height={101}>
            <p>{schedule}</p>
            <Arrow />
          </BorderBox>
        ))}
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
              ? popular_notifications.map((notification) => (
                  <p key={notification}>{notification}</p>
                ))
              : lastest_notifications.map((notification) => (
                  <p key={notification}>{notification}</p>
                ))}
          </div>
        </BorderBox>
      </div>
      <Footer />
    </section>
  );
}

export default Home;
