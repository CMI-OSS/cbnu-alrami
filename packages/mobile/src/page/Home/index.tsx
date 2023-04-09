import Footer from "@components/molecules/Footer";
import useSwipe from "@hooks/useSwipe";
import classNames from "classnames";
import dayjs from "dayjs";
import ErrorFallback from "src/components/atoms/ErrorFallback";
import SuspenseFallback from "src/components/atoms/SuspenseFallback";
import ReloadButton from "src/components/shared/ReloadButton";
import AsyncBoundary from "src/components/templates/AsyncBoundary";
import useModal from "src/hooks/useModal";
import Article from "src/page/Home/Article";

import { HOME_MARGIN_BOTTOM } from "./constants";
import HomeHeader from "./HomeHeader";
import reloadHomeQueries from "./reloadHomeQueries";
import Restaurant from "./Restaurant";
import ScheduleContainer from "./ScheduleContainer";
import $ from "./style.module.scss";
import Weather from "./Weather";

function Home() {
  const today = dayjs();
  const swipeRef = useSwipe();
  const { isOpen, handleModalClose, handleModalOpen } = useModal();

  return (
    <section
      className={classNames($.home, {
        // TODO: Modal 처리 로직 만들기(React.Portal)
        [$["suggestion-mode"]]: isOpen,
      })}
      ref={swipeRef}
    >
      <HomeHeader />

      <AsyncBoundary
        suspenseFallback={
          <SuspenseFallback
            height="104px"
            isRoundBox
            style={{ marginBottom: HOME_MARGIN_BOTTOM }}
          />
        }
        errorFallback={ErrorFallback}
        fallBackHeight="156px"
      >
        <ScheduleContainer today={today} />
      </AsyncBoundary>

      <AsyncBoundary
        suspenseFallback={
          <SuspenseFallback
            height="156px"
            isRoundBox
            style={{ marginBottom: HOME_MARGIN_BOTTOM }}
          />
        }
        errorFallback={ErrorFallback}
        fallBackHeight="156px"
      >
        <Weather
          {...{
            isOpen,
            handleModalClose,
            handleModalOpen,
          }}
        />
      </AsyncBoundary>

      <Restaurant {...{ today }} />

      <AsyncBoundary
        suspenseFallback={
          <SuspenseFallback
            height="319px"
            isRoundBox
            style={{ marginBottom: HOME_MARGIN_BOTTOM }}
          />
        }
        errorFallback={ErrorFallback}
        fallBackHeight="319px"
      >
        <Article />
      </AsyncBoundary>
      <ReloadButton
        buttonType="icon"
        onClick={reloadHomeQueries}
        className={$["reload-button"]}
      />
      <Footer />
    </section>
  );
}

export default Home;
