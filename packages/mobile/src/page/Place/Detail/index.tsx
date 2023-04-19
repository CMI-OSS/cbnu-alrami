import { LeftArrow } from "@components/atoms/icon";
import ChipGroup from "@components/molecules/ChipGroup";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import ErrorFallbackWithStyle from "src/components/atoms/ErrorFallbackWithStyle";
import SuspenseFallback from "src/components/atoms/SuspenseFallback";
import ReloadButton from "src/components/shared/ReloadButton";
import AsyncBoundary from "src/components/templates/AsyncBoundary";
import useSearch from "src/hooks/useSearch";
import PlaceDetailBody from "src/page/Place/Detail/PlaceDetailBody";
import { useAppDispatch } from "src/store";
import { setHashMenu } from "src/store/placeSlice";

import { menuList } from "../../../__mocks__/index";
import reloadPlaceQueries from "./reloadPlaceQueries";

function PlaceDetail() {
  const dispatch = useAppDispatch();

  const bodyHeight =
    "calc(var(--vh, 1vh) * 100 - (env(safe-area-inset-top) + env(safe-area-inset-bottom)))";
  const position = useSearch({ target: "position" })!;

  const checkMenu = (position: string) => {
    switch (position) {
      case "north":
        return 1;
      case "east":
        return 2;
      case "south":
        return 3;
      default:
        return 0;
    }
  };

  const handleMenu = () => {
    dispatch(setHashMenu({ hashString: position }));
  };

  const handleReloadClick = () => {
    return reloadPlaceQueries(position);
  };

  return (
    <FullPageModalTemplate
      left={<LeftArrow stroke="#5e5e5e" size={16} />}
      title="캠퍼스맵"
      right={
        <ReloadButton
          buttonType="icon"
          onClick={handleReloadClick}
          stroke="#5E5E5E"
        />
      }
    >
      <ChipGroup
        list={menuList}
        handleSelectMenu={handleMenu}
        selectedMenu={checkMenu(position)}
      />
      {/* [D] 식당 작업 후 진행 예정 */}
      {/* <NavLink to="/call" className={$.place_link}>
          제보하기
        </NavLink> */}
      <AsyncBoundary
        suspenseFallback={<SuspenseFallback height={bodyHeight} />}
        errorFallback={ErrorFallbackWithStyle({ height: bodyHeight })}
      >
        <PlaceDetailBody position={position} />
      </AsyncBoundary>
    </FullPageModalTemplate>
  );
}

export default PlaceDetail;
