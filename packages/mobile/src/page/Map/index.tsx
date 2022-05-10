import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { Close } from "@components/atoms/icon/Close";
import { PlaceArrow } from "@components/atoms/icon/PlaceArrow";
import { PlaceMenu } from "@components/atoms/icon/PlaceMenu";
import { SmallPlaceMenu } from "@components/atoms/icon/SmallPlaceMenu";
import Footer from "@components/molecules/Footer";
import MenuButtonList from "@components/molecules/MenuButtonList";
import { useAppDispatch, useAppSelector } from "src/store";
import {
  hideFloatingButtonStatus,
  hideTooltipButtonStatus,
} from "src/store/statusSlice";

import { placeInfoList } from "../../__mocks__/placeInfoList";
import $ from "./style.module.scss";

const makeMarker = (map: naver.maps.Map, position: naver.maps.LatLng) => {
  return new naver.maps.Marker({
    map,
    position,
  });
};

function Map() {
  const CBNU_LATITUDE = 36.62903849870408;
  const CBNU_LONGITUDE = 127.45635082700974;

  const { isDisplayFloatingButton, isDisplayTooltip } = useAppSelector(
    (state) => state.statusReducer.map,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initMap = () => {
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(CBNU_LATITUDE, CBNU_LONGITUDE),
        zoom: 18,
      });
      placeInfoList.forEach((place) => {
        const marker = makeMarker(
          map,
          new naver.maps.LatLng(place.lat, place.lng),
        );
        naver.maps.Event.addListener(marker, "click", (e) => {
          map.panTo(e.coord, { duration: 300, easing: "easeOutCubic" });
          e.domEvent.stopPropagation();
          dispatch(
            hideFloatingButtonStatus({ isDisplayFloatingButton: false }),
          );
        });
      });
      return map;
    };
    initMap();
  }, []);

  return (
    <div id="map" className={$.map}>
      {isDisplayFloatingButton ? <MenuButtonList /> : <div>ddd</div>}
      {isDisplayFloatingButton && (
        <div className={$.wrap}>
          {isDisplayTooltip && (
            <div className={$.place_wrap}>
              <span className={$.content}>
                <SmallPlaceMenu className={$.small_icon} />를 눌러
                <button
                  type="button"
                  className={$.close_button}
                  aria-label="닫기 버튼"
                  onClick={() =>
                    dispatch(
                      hideTooltipButtonStatus({ isDisplayTooltip: false }),
                    )
                  }
                >
                  <Close className={$.close_icon} />
                </button>
                <br />
                다양한 장소를 탐색해요
              </span>
              <PlaceArrow className={$.arrow} />
            </div>
          )}
          <NavLink to="/category" className={$.link}>
            <PlaceMenu className={$.icon} />
            <span className="blind">장소탐색하기</span>
          </NavLink>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Map;
