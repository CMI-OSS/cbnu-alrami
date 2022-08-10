import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { Close } from "@components/atoms/icon/Close";
import { MapArrow } from "@components/atoms/icon/MapArrow";
import { PlaceArrow } from "@components/atoms/icon/PlaceArrow";
import { PlaceMenu } from "@components/atoms/icon/PlaceMenu";
import { SmallPlaceMenu } from "@components/atoms/icon/SmallPlaceMenu";
import Footer from "@components/molecules/Footer";
import { useSchool } from "src/api/school";
import ConstructionInfo from "src/page/Map/ConstructionInfo";
import { useAppDispatch, useAppSelector } from "src/store";
import {
  hideConstructionTooltipStatus,
  hideFloatingButtonStatus,
  hideTooltipButtonStatus,
} from "src/store/statusSlice";

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
  const [ constructionId, setConstructionId ] = useState(9);
  const [ myLocation, setMyLocation ] = useState({ latitude: 0, longitude: 0 });
  const dispatch = useAppDispatch();

  const comparePosition = (latitude: number, longitude: number) => {
    return (
      latitude >= 36.62 &&
      latitude <= 36.635 &&
      longitude >= 127.44 &&
      longitude <= 127.465
    );
  };

  const { isDisplayFloatingButton, isDisplayTooltip, isConstructionTooltip } =
    useAppSelector((state) => {
      return state.statusReducer.map;
    });

  const success = (position: GeolocationPosition) => {
    setMyLocation((previousState: any) => {
      return {
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
      };
    });
  };

  const error = () => {
    alert("현재 위치를 알 수 없습니다.");
  };

  const {
    data: schoolData,
    isLoading: schoolLoading,
    isError: schoolError,
  } = useSchool();

  useEffect(() => {
    const initMap = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      }
      dispatch(hideConstructionTooltipStatus({ isConstructionTooltip: false }));
      dispatch(hideFloatingButtonStatus({ isDisplayFloatingButton: true }));
    };
    initMap();
  }, []);

  useEffect(() => {
    const currentPosition = [ myLocation.latitude, myLocation.longitude ];
    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    });
    if (!schoolLoading) {
      schoolData!.data.forEach((place) => {
        const marker = makeMarker(
          map,
          new naver.maps.LatLng(place.latitude, place.longtitude),
        );
        naver.maps.Event.addListener(marker, "click", (e) => {
          map.panTo(e.coord, { duration: 300, easing: "easeOutCubic" });
          e.domEvent.stopPropagation();
          setConstructionId(place.id);
          dispatch(
            hideFloatingButtonStatus({ isDisplayFloatingButton: false }),
          );
          dispatch(
            hideConstructionTooltipStatus({ isConstructionTooltip: true }),
          );
        });
      });
    }
  }, [ myLocation ]);

  return (
    <div id="map" className={$.map}>
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
                  onClick={() => {
                    return dispatch(
                      hideTooltipButtonStatus({ isDisplayTooltip: false }),
                    );
                  }}
                >
                  <Close className={$.close_icon} />
                </button>
                <br />
                다양한 장소를 탐색해요
              </span>
              <PlaceArrow className={$.arrow} />
            </div>
          )}
          <NavLink to="/place/all" className={$.link}>
            <PlaceMenu className={$.icon} />
            <span className="blind">장소탐색하기</span>
          </NavLink>
        </div>
      )}
      {isConstructionTooltip && <ConstructionInfo placeId={constructionId} />}
      <Footer />
    </div>
  );
}

export default Map;
