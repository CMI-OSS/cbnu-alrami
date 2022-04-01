import { useEffect } from "react";
import $ from "./style.module.scss";
import MenuButtonList from "../../components/molecules/MenuButtonList";
import { PlaceMenu } from "../../components/atoms/icon/PlaceMenu";
import { SmallPlaceMenu } from "../../components/atoms/icon/SmallPlaceMenu";
import { PlaceArrow } from "../../components/atoms/icon/PlaceArrow";

function Map() {
  useEffect(() => {
    const initMap = () => {
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(36.6287079, 127.4583923),
        zoom: 18,
      });
    };
    initMap();
  }, []);

  const mapStyle = {
    width: "100vw",
    height: "100vh",
  };
  return (
    <div id="map" style={mapStyle}>
      <MenuButtonList />
      <div className={$.wrap}>
        <div className={$.place_wrap}>
          <span className={$.text}>
            <SmallPlaceMenu className={$.small_icon} />를 눌러
            <br />
            다양한 장소를 탐색해요
          </span>
          <PlaceArrow className={$.arrow} />
        </div>
        <a href="." className={$.link}>
          <PlaceMenu className={$.icon} />
          <span className="blind">장소탐색하기</span>
        </a>
      </div>
    </div>
  );
}

export default Map;
