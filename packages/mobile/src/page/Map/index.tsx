import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { Close } from "@components/atoms/icon/Close";
import { MapArrow } from "@components/atoms/icon/MapArrow";
import { PlaceArrow } from "@components/atoms/icon/PlaceArrow";
import { PlaceMenu } from "@components/atoms/icon/PlaceMenu";
import { SmallPlaceMenu } from "@components/atoms/icon/SmallPlaceMenu";
import ConstructionInfo from "@components/molecules/ConstructionInfo";
import Footer from "@components/molecules/Footer";
import MenuButtonList from "@components/molecules/MenuButtonList";
import { useAppDispatch, useAppSelector } from "src/store";
import {
  hideConstructionTooltipStatus,
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
  const CBNU_LATITUDE = 36.62850496903595;
  const CBNU_LONGITUDE = 127.45731862757414;

  const [ myLocation, setMyLocation ] = useState<
    { latitude: number; longitude: number } | string
  >("");
  const { isDisplayFloatingButton, isDisplayTooltip, isConstructionTooltip } =
    useAppSelector((state) => state.statusReducer.map);
  const dispatch = useAppDispatch();

  const comparePosition = (latitude: number, longitude: number) => {
    return (
      latitude >= 36.62 &&
      latitude <= 36.63 &&
      longitude >= 127.44 &&
      longitude <= 127.46
    );
  };

  const success = (position: GeolocationPosition) => {
    setMyLocation({
      latitude: comparePosition(
        position.coords.latitude,
        position.coords.longitude,
      )
        ? position.coords.latitude
        : CBNU_LATITUDE,
      longitude: comparePosition(
        position.coords.latitude,
        position.coords.longitude,
      )
        ? position.coords.longitude
        : CBNU_LONGITUDE,
    });
  };

  const error = () => {
    alert("현재 위치를 알 수 없습니다.");
  };

  useEffect(() => {
    const initMap = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      }
    };
    initMap();
  }, []);

  useEffect(() => {
    if (typeof myLocation !== "string") {
      const currentPosition = [ myLocation.latitude, myLocation.longitude ];
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
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
          dispatch(
            hideConstructionTooltipStatus({
              isConstructionTooltip: true,
            }),
          );
        });
      });
    }
  }, [ myLocation ]);

  return (
    <div id="map" className={$.map}>
      {isDisplayFloatingButton && <MenuButtonList />}
      {isConstructionTooltip && (
        <NavLink to="/" className={$["place-link"]}>
          <MapArrow className={$["place-arrow"]} />
        </NavLink>
      )}
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
          <NavLink to="/place/school" className={$.link}>
            <PlaceMenu className={$.icon} />
            <span className="blind">장소탐색하기</span>
          </NavLink>
        </div>
      )}
      {isConstructionTooltip && <ConstructionInfo />}
      <Footer />
    </div>
  );
}

export default Map;
