import { CardListContainer } from "@admin/components/Scenario";
import Navigation from "@admin/components/Navigation";
import Selector from "@admin/components/Selector";
import { useAppSelector } from "@admin/store";
import { view } from "@admin/store/viewSlice";
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
