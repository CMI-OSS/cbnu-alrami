import { Link } from "react-router-dom";

import { cafeteriaMenu } from "src/__mocks__";
import { Arrow } from "src/components/atoms/icon/Arrow";
import CafeteriaMenuCard from "src/components/molecules/CafeteriaMenuCard";
import Flicking from "src/components/molecules/Flicking";
import Footer from "src/components/molecules/Footer";
import { cafeteriaTime } from "src/utils/cafeteriaTime";

import $ from "./style.module.scss";

const menuList = [
  { id: 1, name: "본관" },
  { id: 2, name: "양성재" },
  { id: 3, name: "양진재" },
  { id: 4, name: "한빛식당" },
  { id: 5, name: "별빛식당" },
  { id: 6, name: "은하수식당" },
];

function Cafeteria() {
  return (
    <>
      <Flicking menuList={menuList} />
      <main className={$.cafeteria}>
        {cafeteriaMenu.map(({ id, content, calory, time }) => {
          const [ mealTime, timeInfo ] = cafeteriaTime(id, time);
          return (
            <CafeteriaMenuCard
              key={content}
              {...{ mealTime, timeInfo }}
              mealMenu={content}
              calory={calory}
            />
          );
        })}
        <div className={$["go-out"]}>
          <span>다른 메뉴가 먹고싶다면?</span>
          <Link to="/place/food" className={$["go-out-link"]}>
            나가서 먹기
            <Arrow className={$.icon} />
          </Link>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default Cafeteria;
