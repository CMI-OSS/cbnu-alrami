import { LeftArrow } from "@components/atoms/icon";
import ChipGroup from "@components/molecules/ChipGroup";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import ErrorFallback from "src/components/atoms/ErrorFallback";
import SuspenseFallback from "src/components/atoms/SuspenseFallback";
import AsyncBoundary from "src/components/templates/AsyncBoundary";
import useSearch from "src/hooks/useSearch";
import PlaceDetailBody from "src/page/Place/Detail/PlaceDetailBody";
import { useAppDispatch } from "src/store";
import { setHashMenu } from "src/store/placeSlice";

import { menuList } from "../../../__mocks__/index";

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

  return (
    <FullPageModalTemplate
      left={<LeftArrow stroke="#5e5e5e" size={16} />}
      title="캠퍼스맵"
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
        errorFallback={ErrorFallback}
        fallBackHeight={bodyHeight}
      >
        <PlaceDetailBody position={position} />
      </AsyncBoundary>
    </FullPageModalTemplate>
  );
}

export default PlaceDetail;
