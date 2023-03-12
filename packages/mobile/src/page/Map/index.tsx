import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { Hamburger, LeftArrow } from "@components/atoms/icon";
import { Close } from "@components/atoms/icon/Close";
import Footer from "@components/molecules/Footer";
import { useSchoolOneQuery, useSchoolQuery } from "src/hooks/api/school";
import Spot from "src/page/Map/Spot";
import { useAppDispatch, useAppSelector } from "src/store";
import {
  hideConstructionTooltipStatus,
  hideFloatingButtonStatus,
  hideTooltipButtonStatus
} from "src/store/statusSlice";

import $ from "./style.module.scss";

const makeMarker = (map: naver.maps.Map, position: naver.maps.LatLng) => {
  return new naver.maps.Marker({
    map,
    position,
  });
};

const INITIAL_CBNU_LATITUDE = 36.62850496903595;
const INITIAL_CBNU_LONGITUDE = 127.45731862757414;

function Map() {
  const [ constructionId, setConstructionId ] = useState(12);
  const dispatch = useAppDispatch();
  
  const { isDisplayFloatingButton, isDisplayTooltip, isConstructionTooltip } =
    useAppSelector((state) => {
      return state.statusReducer.map;
    });

  const {
    data: schoolData,
  } = useSchoolQuery();

  const {
    data: schoolSeveralData,
  } = useSchoolOneQuery({id: constructionId});

  const getMap = () => {
    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(INITIAL_CBNU_LATITUDE, INITIAL_CBNU_LONGITUDE),
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    });
      schoolData?.forEach((place) => {
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

  useEffect(() => {
    const initMap = () => {
      dispatch(hideConstructionTooltipStatus({ isConstructionTooltip: false }));
      dispatch(hideFloatingButtonStatus({ isDisplayFloatingButton: true }));
      getMap();
    };
    initMap();
  }, [ schoolData ]);

  return (
    <div id="map" className={$.map}>
      {isConstructionTooltip && (
        <NavLink to="/" className={$["place-link"]}>
          <LeftArrow stroke="#aaa" size={16} />
        </NavLink>
      )}
      {isDisplayFloatingButton && (
        <div className={$.wrap}>
          {isDisplayTooltip && (
            <div className={$.balloon}>
              <span className={$.content}>
                <Hamburger stroke="#363636" size={14} />를 눌러
              </span>
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
                <Close stroke="#aaa" size={11} />
              </button>
              <p className={$.text}>다양한 장소를 탐색해요</p>
            </div>
          )}
          <NavLink to="/place?position=all" className={$.link}>
            <Hamburger stroke="#fff" size={30} />
            <span className="blind">장소탐색하기</span>
          </NavLink>
        </div>
      )}
      {isConstructionTooltip && schoolSeveralData && (
        <Spot
          schoolData={schoolSeveralData}
          url={schoolSeveralData.images![0]?.url}
          type="map"
          placeId={constructionId}
        />
      )}
      <Footer />
    </div>
  );
}

export default Map;
