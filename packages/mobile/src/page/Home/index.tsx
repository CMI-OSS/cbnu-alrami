/* eslint-disable react/jsx-pascal-case */
import Footer from "@components/molecules/Footer";
import classNames from "classnames";
import BorderBox from "src/components/atoms/BorderBox";
import Button from "src/components/atoms/Button";
import {
  Setting,
  구름조금_낮,
  Info,
  Write,
  Food,
} from "src/components/atoms/icon";
import { Arrow } from "src/components/atoms/icon/Arrow";
import Line from "src/components/atoms/Line";
import { isShowRepresentativeRestaurantGuide } from "src/utils/storage";

import $ from "./style.module.scss";

function FinalGuideRestaurant() {
  return (
    <div className={classNames($.cafeteria, $["show-final-guide"])}>
      <BorderBox height={188}>
        <p>
          홈화면에서 다시 식단을 보고싶다면 <br />
          <span>
            <Setting width="14" height="15" /> 설정 &gt; 대표식당에서 <br />
          </span>
          다시 선택해주세요.
          <br />
        </p>
        <Button text="확인" />
      </BorderBox>
    </div>
  );
}

function GuideRestaurant() {
  return (
    <div className={classNames($.cafeteria, $["show-guide"])}>
      <BorderBox height={188}>
        <Food width="18" height="22" />
        <span>화면을 눌러 대표식당을 선택해주세요.</span>
        <p>
          대표식당을 선택하면
          <br />
          홈화면에서 대표식당의 식단을 볼 수 있어요.
          <br />
          홈화면에서 식단을 보고싶지 않다면 <br />
          “표시 안함”을 선택해주세요.
          <br />
        </p>
      </BorderBox>
    </div>
  );
}

function Home() {
  const schedules = [
    "중간고사",
    "제목이 아주 긴 일정 제목이 아주 긴일정 제목이 아주 긴",
    "출근싫어",
  ];
  const notifications = [
    "2022학년도 정시 대학원(일반대학원) 석사과정1",
    "산업인공지능연구센터 연구원 채용 공고2",
    "2022학년도 정시 법무대학원 신입생 추가3",
    "2022학년도 정시 대학원(일반대학원) 석사과정4",
    "산업인공지능연구센터 연구원 채용 공고5",
  ];
  const isShowGuide = isShowRepresentativeRestaurantGuide();

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
      <div className={$.information}>
        <BorderBox height={155} background="#EAF4FE">
          <div className={$.first}>
            <span className={$.amount}>25°C</span>
            <span className={$.description}>청주, 구름 조금</span>
            <span className={$.celsius}>-11.0 °C / 2.0°C</span>
          </div>
          <div className={$.second}>
            <div style={{ width: "66px", height: "55px" }}>
              <구름조금_낮 />
            </div>
            <div className={$.more}>
              <Info width="14" height="14" />
              기온별 옷차림
            </div>
          </div>
        </BorderBox>
      </div>
      <FinalGuideRestaurant />
      {/* {isShowGuide ? (
        <GuideRestaurant />
      ) : (
        <div className={$.cafeteria}>
          <BorderBox height={188}>
            <div className={$.title}>
              <div className={$.location}>
                본관 아침
                <Write />
              </div>
              <span className={$.time}>7:30~9:00</span>
            </div>
            <Line />
            <div className={$["cafeteria-content"]}>
              흰밥/우유(두유)/김치 단호박스프 고구마치즈롤까스 &소스
              양상추샐러드 오리엔탈드레싱 시금치나물 에너지:1165Kcal 단백질:16g
            </div>
          </BorderBox>
        </div>
      )} */}
      <div className={$.notification}>
        <BorderBox height={300}>
          <div className={$.title}>
            공지사항
            <div className={$.category}>
              <span>인기</span>
              <span>최신</span>
            </div>
          </div>
          <Line />
          <div className={$["notification-content"]}>
            {notifications.map((notification) => (
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
