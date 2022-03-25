import $ from "./style.module.scss";
import MenuButtonList from "../../components/molecules/MenuButtonList";
import { PlaceMenu } from "../../components/atoms/icon/PlaceMenu";
import { SmallPlaceMenu } from "../../components/atoms/icon/SmallPlaceMenu";

function Map() {
  return (
    <>
      <MenuButtonList />
      <div className={$.wrap}>
        <div className={$.place_wrap}>
          <span className={$.text}>
            <SmallPlaceMenu className={$.small_icon} />를 눌러
            <br />
            다양한 장소를 탐색해요
          </span>
        </div>
        <a href="." className={$.link}>
          <PlaceMenu className={$.icon} />
        </a>
      </div>
    </>
  );
}

export default Map;
