/* eslint-disable react/jsx-pascal-case */
import { Arrow } from "src/components/atoms/icon/Arrow";
import $ from "./style.module.scss";
import {
  Setting,
  구름조금_낮,
  Covid,
  Info,
  Write,
} from "../../components/atoms/icon";
import BorderBox from "../../components/atoms/BorderBox";
import Line from "../../components/atoms/Line";

function Home() {
  const schedules = [
    "중간고사",
    "제목이 아주 긴 일정 제목이 아주 긴일정 제목이 아주 긴",
    "출근싫어",
  ];
  return (
    <section className={$.home}>
      <header>
        <div className={$.content}>
          <h1>충림이</h1>
          <span>오늘은 총 6개의 일정이 있어요</span>
        </div>
        <Setting />
      </header>
      <div className={$.schedule}>
        {schedules.map((schedule) => (
          <BorderBox height={101}>
            <p>{schedule}</p>
            <Arrow />
          </BorderBox>
        ))}
      </div>
      <div className={$["external-information"]}>
        <BorderBox height={180} background="#EAF4FE">
          <구름조금_낮 />
          <span>청주 날씨</span>
          <span className={$.important}>25도</span>
          <span>구름 조금</span>
          <div className={$.more}>
            <Info style={{ width: "10px", height: "10px" }} />
            기온별 옷차림
          </div>
        </BorderBox>
        <BorderBox height={180} background="#F2F0FE">
          <Covid />
          <span>확진자 수</span>
          <span className={$.important}>500,000</span>
          <span>+1,325</span>
          <div className={$.more}>
            더보기
            <Arrow style={{ width: "7px", height: "7px", stroke: "#222" }} />
          </div>
        </BorderBox>
      </div>
      <div className={$.cafeteria}>
        <BorderBox height={180}>
          <div className={$.title}>
            <p>본관 아침</p>
            <Write />
          </div>
          <Line />
          <div className={$.content}>
            흰밥/우유(두유)/김치 단호박스프 고구마치즈롤까스 &소스 양상추샐러드
            오리엔탈드레싱 시금치나물 에너지:1165Kcal 단백질:16g
          </div>
        </BorderBox>
      </div>
      <div className={$.notification}>
        <BorderBox height={315}></BorderBox>
      </div>
    </section>
  );
}

export default Home;
