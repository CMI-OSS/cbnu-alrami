import $ from "./style.module.scss";
import Schedule from "./Schedule";
import { Setting } from "../shared/icon";

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
      <Schedule />
    </section>
  );
}

export default Home;
