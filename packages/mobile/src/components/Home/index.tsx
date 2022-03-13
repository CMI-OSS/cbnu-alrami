/* eslint-disable react/jsx-pascal-case */
import { Arrow } from "src/components/shared/icon/Arrow";
import $ from "./style.module.scss";
import { Setting, 구름조금_낮, Covid, Info } from "../shared/icon";
import BorderBox from "../shared/BorderBox";

function Home() {
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
        <BorderBox height={101}>
          <p>중간고사</p>
          <Arrow />
        </BorderBox>
        <BorderBox height={101}>
          <p>제목이 아주 긴 일정 제목이 아주 긴일정 제목이 아주 긴</p>
          <Arrow />
        </BorderBox>
        <BorderBox height={101}>
          <p>중간고사</p>
          <Arrow />
        </BorderBox>
      </div>
      <div className={$["external-information"]}>
        <BorderBox height={180} style={{ background: "#EAF4FE" }}>
          <구름조금_낮 />
          <span>청주 날씨</span>
          <span style={{ fontSize: "18px", fontWeight: 500 }}>25도</span>
          <span>구름 조금</span>
          <div className={$.more}>
            <Info style={{ width: "10px", height: "10px" }} />
            기온별 옷차림
          </div>
        </BorderBox>
        <BorderBox height={180} style={{ background: "#F2F0FE" }}>
          <Covid />
          <span>확진자 수</span>
          <span style={{ fontSize: "18px", fontWeight: 500 }}>500,000</span>
          <span>+1,325</span>
          <div className={$.more}>
            더보기
            <Arrow style={{ width: "7px", height: "7px", stroke: "#222" }} />
          </div>
        </BorderBox>
      </div>
    </section>
  );
}

export default Home;
