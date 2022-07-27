import { NavLink, useNavigate } from "react-router-dom";

import { MapArrow } from "@components/atoms/icon/MapArrow";
import { MoreArrow } from "@components/atoms/icon/MoreArrow";
import { Phone } from "@components/atoms/icon/Phone";
import { Position } from "@components/atoms/icon/Position";
import { Time } from "@components/atoms/icon/Time";
import ImageList from "@components/molecules/ImageList";

import detailImageList from "../../../__mocks__/detailImageList";
import $ from "./style.module.scss";

function Detail() {
  const navigate = useNavigate();
  const imageUrl =
    "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180130_263%2F1517301583613dwuaL_JPEG%2FZh5SeEjUT12rWxcLJ2nstPaB.jpg";

  return (
    <div className={$.wrap}>
      <div className={$.header}>
        <button
          type="button"
          className={$["detail-button"]}
          onClick={() => navigate(-1)}
        >
          <MapArrow />
          <span className="blind">뒤로 가기</span>
        </button>
        <NavLink to="/call" className={$["link-call"]}>
          <span className="blind">제보하기</span>
        </NavLink>
      </div>
      <div
        className={$["back-image"]}
        style={{
          backgroundImage: `url(
            ${imageUrl}
          )`,
        }}
      />
      <div className={$.info}>
        <div className={$["info-inner"]}>
          <span className={$.text}>N15 / (구) 057</span>
          <strong className={$.title}>충북대학교 사회과학대학</strong>
          <ul className={$.list}>
            <li className={$.item}>
              <Position />
              <span className={$["item-text"]}>
                충청북도 청주시 흥덕구 사창동 470
              </span>
            </li>
            <li className={$.item}>
              <Phone className={$.phone} />
              <span className={$["item-text"]}>
                000-0000-0000 <br />
                000-0000-000
              </span>
            </li>
            <li className={$.item}>
              <Time />
              <span className={$["item-text"]}>오전 9:00 ~ 오후 6:00</span>
            </li>
          </ul>
          <div className={$.error}>
            <NavLink className={$["error-link"]} to="/error">
              오류 신고
            </NavLink>
          </div>
        </div>
      </div>
      <div className={$.menu}>
        <strong className={$["menu-title"]}>메뉴판</strong>
        <ImageList isMoreContents={false} detailImageList={detailImageList} />
        <div className={$.price}>
          <div className={$["price-item"]}>
            <span className={$["price-title"]}>감바스</span>
            <span className={$["price-value"]}>8,000원</span>
          </div>
          <div className={$["price-item"]}>
            <span className={$["price-title"]}>가츠동</span>
            <span className={$["price-value"]}>8,500원</span>
          </div>
          <div className={$["price-item"]}>
            <span className={$["price-title"]}>피자</span>
            <span className={$["price-value"]}>13,000원</span>
          </div>
          <div className={$["price-item"]}>
            <span className={$["price-title"]}>초코 아이스크림</span>
            <span className={$["price-value"]}>18,000원</span>
          </div>
          <div className={$["price-item"]}>
            <span className={$["price-title"]}>
              소불고기 소불고기 소불고기소불고기 소불고기소불고기
            </span>
            <span className={$["price-value"]}>130,000원</span>
          </div>
          <NavLink className={$["price-link"]} to="/more">
            더보기
            <MoreArrow className={$["more-arrow"]} />
          </NavLink>
        </div>
      </div>
      <div className={$.detail}>
        <strong className={$["detail-title"]}>상세이미지</strong>
        <ImageList isMoreContents detailImageList={detailImageList} />
      </div>
    </div>
  );
}

export default Detail;
