import { CardListContainer } from "src/components/Scenario";
import Navigation from "src/components/Navigation";
import Selector from "src/components/Selector";
import { useAppSelector } from "src/store";
import { view } from "src/store/viewSlice";
import getStyle from "./style";

export default function Home() {
  const style = getStyle();
  const { scraper } = useAppSelector(view);

  return (
    <>
      <Navigation />
      <main className={style.main}>
        <h1 className={style.mainTitle}>{scraper} 스크래퍼 관리보드</h1>
        <Selector />
        <CardListContainer />
      </main>
    </>
  );
}
