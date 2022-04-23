/* eslint-disable react/jsx-pascal-case */
import { Arrow } from "src/components/atoms/icon/Arrow";
import { Link } from "react-router-dom";
import Menu from "src/components/atoms/Chip";
import $ from "./style.module.scss";
import { Setting, 비, Covid, Info, Write } from "../../components/atoms/icon";
import BorderBox from "../../components/atoms/BorderBox";
import Line from "../../components/atoms/Line";

function Home() {
  const schedules = [
    "중간고사",
    "제목이 아주 긴 일정 제목이 아주 긴일정 제목이 아주 긴",
    "출근싫어",
  ];
  const notifications = [
    "2022학년도 정시 대학원(일반대학원) 석사과정",
    "산업인공지능연구센터 연구원 채용 공고",
    "2022학년도 정시 법무대학원 신입생 추가",
    "2022학년도 정시 대학원(일반대학원) 석사과정",
    "산업인공지능연구센터 연구원 채용 공고",
    "산업인공지능연구센터 연구원 채용 공고",
  ];
  const menus = ["최신공지", "인기공지"];

  return (
    <section className={$.home}>
      <header className={$.header}>
        <div className={$.content}>
          <h1 className={$.title}>충림이</h1>
          <p>오늘은 총 6개의 일정이 있어요</p>
        </div>
        <Setting />
      </header>
      <div className={$.schedule}>
        {schedules.map((schedule) => (
          <BorderBox height={90}>
            <p>{schedule}</p>
            <Arrow />
          </BorderBox>
        ))}
      </div>
      <div className={$.information}>
        <BorderBox className={$.borderbox} height={160} background="#EAF4FE">
          <비 style={{ width: "50px", height: "auto" }} />
          <strong>청주 날씨</strong>
          <span className={$.important}>25도</span>
          <span>구름 조금</span>
          <div className={$.more}>
            <Info style={{ width: "10px", height: "10px" }} />
            기온별 옷차림
          </div>
        </BorderBox>
        <BorderBox className={$.borderbox} height={160} background="#F2F0FE">
          <Covid />
          <strong>확진자 수</strong>
          <span className={$.important}>500,000</span>
          <span>+1,325</span>
          <Link className={$.more} to="/covid">
            더보기
            <Arrow style={{ width: "7px", height: "7px", stroke: "#222" }} />
          </Link>
        </BorderBox>
      </div>
      <div className={$.cafeteria}>
        <BorderBox height={180}>
          <div className={$.location}>
            <span>
              본관 아침 <Write />
            </span>
            <span>7:30~9:00</span>
          </div>
          <Line />
          <div className={$.content}>
            흰밥/우유(두유)/김치 단호박스프 고구마치즈롤까스 &소스 양상추샐러드
            오리엔탈드레싱 시금치나물 에너지:1165Kcal 단백질:16g
          </div>
        </BorderBox>
      </div>
      <div className={$.notification}>
        <BorderBox height={300}>
          <div className={$.content}>
            {notifications.map((notification) => (
              <p>{notification}</p>
            ))}
          </div>
        </BorderBox>
      </div>
    </section>
  );
}

export default Home;
