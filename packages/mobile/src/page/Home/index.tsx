import Footer from "@components/molecules/Footer";
import classNames from "classnames";
import dayjs from "dayjs";
import ErrorFallback from "src/components/atoms/ErrorFallback";
import SuspenseFallback from "src/components/atoms/SuspenseFallback";
import AsyncBoundary from "src/components/templates/AsyncBoundary";
import Article from "src/page/Home/Article";

import HomeHeader from "./HomeHeader";
import { useHome } from "./hooks";
import Restaurant from "./Restaurant";
import ScheduleContainer from "./ScheduleContainer";
import $ from "./style.module.scss";
import Weather from "./Weather";

function Home() {
  const today = dayjs();
  const { isOpen, handleSuggestionClick } = useHome(); // TODO: Weather 컴포넌트로 옮기기

  return (
    <section
      className={classNames($.home, {
        // TODO: Modal 처리 로직 만들기(React.Portal)
        [$["suggestion-mode"]]: isOpen,
      })}
    >
      <HomeHeader />

      <AsyncBoundary
        suspenseFallback={<SuspenseFallback height="156px" isRoundBox />}
        errorFallback={ErrorFallback}
        fallBackHeight="156px"
      >
        <ScheduleContainer today={today} />
      </AsyncBoundary>

      <AsyncBoundary
        suspenseFallback={<SuspenseFallback height="156px" isRoundBox />}
        errorFallback={ErrorFallback}
        fallBackHeight="156px"
      >
        <Weather {...{ isOpen, handleSuggestionClick }} />
      </AsyncBoundary>

      <Restaurant {...{ today }} />

      <AsyncBoundary
        suspenseFallback={<SuspenseFallback height="319px" isRoundBox />}
        errorFallback={ErrorFallback}
        fallBackHeight="319px"
      >
        <Article />
      </AsyncBoundary>
      <Footer />
    </section>
  );
}

export default Home;
