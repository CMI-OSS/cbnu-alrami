import { LeftArrow } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import ErrorFallback from "src/components/atoms/ErrorFallback";
import SuspenseFallback from "src/components/atoms/SuspenseFallback";
import AsyncBoundary from "src/components/templates/AsyncBoundary";
import MapDetailBody from "src/page/Map/Detail/MapDetailBody";

import $ from "./style.module.scss";

function MapDetail() {
  const bodyHeight =
    "calc(var(--vh, 1vh) * 100 - (env(safe-area-inset-top) + env(safe-area-inset-bottom)))";

  return (
    <FullPageModalTemplate
      left={<LeftArrow stroke="#fff" size={16} />}
      style={{
        background:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 22.92%, rgba(0, 0, 0, 0) 100%)",
        zIndex: 100,
      }}
      className={$["map-header"]}
    >
      {/* [D] 식당 스펙 추가 후 작업 진행 예정 */}
      {/* <NavLink to="/call" className={$["link-call"]}>
          <span className="blind">제보하기</span>
        </NavLink> */}
      <AsyncBoundary
        suspenseFallback={<SuspenseFallback height={bodyHeight} />}
        errorFallback={ErrorFallback}
        fallBackHeight={bodyHeight}
      >
        <MapDetailBody />
      </AsyncBoundary>
    </FullPageModalTemplate>
  );
}

export default MapDetail;
