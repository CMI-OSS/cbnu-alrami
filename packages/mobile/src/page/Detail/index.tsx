import { NavLink, useNavigate } from "react-router-dom";

import { url } from "inspector";

import { MapArrow } from "@components/atoms/icon/MapArrow";
import { MoreArrow } from "@components/atoms/icon/MoreArrow";
import { Phone } from "@components/atoms/icon/Phone";
import { Position } from "@components/atoms/icon/Position";
import { Time } from "@components/atoms/icon/Time";
import ImageList from "@components/molecules/ImageList";
import { Call } from "src/components/atoms/icon/Call";

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
          className={$.detail_button}
          onClick={() => navigate(-1)}
        >
          <MapArrow />
          <span className="blind">뒤로 가기</span>
        </button>
        <NavLink to="/call" className={$.link_call}>
          <Call />
          <span className="blind">제보하기</span>
        </NavLink>
      </div>
      <div
        className={$.backImage}
        style={{
          backgroundImage: `url(
            ${imageUrl}
          )`,
        }}
      />
      <div className={$.info}>
        <div className={$.infoInner}>
          <span className={$.text}>N15 / (구) 057</span>
          <strong className={$.title}>충북대학교 사회과학대학</strong>
          <ul className={$.list}>
            <li className={$.item}>
              <Position />
              <span className={$.itemText}>
                충청북도 청주시 흥덕구 사창동 470
              </span>
            </li>
            <li className={$.item}>
              <Phone className={$.phone} />
              <span className={$.itemText}>
                000-0000-0000 <br />
                000-0000-000
              </span>
            </li>
            <li className={$.item}>
              <Time />
              <span className={$.itemText}>오전 9:00 ~ 오후 6:00</span>
            </li>
          </ul>
          <div className={$.error}>
            <NavLink className={$.errorLink} to="/declaration">
              오류 신고
            </NavLink>
          </div>
        </div>
      </div>
      <div className={$.menu}>
        <strong className={$.menuTitle}>메뉴판</strong>
        <ImageList isMoreContents={false} />
        <div className={$.price}>
          <div className={$.priceItem}>
            <span className={$.priceTitle}>감바스</span>
            <span className={$.priceValue}>8,000원</span>
          </div>
          <div className={$.priceItem}>
            <span className={$.priceTitle}>가츠동</span>
            <span className={$.priceValue}>8,500원</span>
          </div>
          <div className={$.priceItem}>
            <span className={$.priceTitle}>피자</span>
            <span className={$.priceValue}>13,000원</span>
          </div>
          <div className={$.priceItem}>
            <span className={$.priceTitle}>초코 아이스크림</span>
            <span className={$.priceValue}>18,000원</span>
          </div>
          <div className={$.priceItem}>
            <span className={$.priceTitle}>
              소불고기 소불고기 소불고기소불고기 소불고기소불고기
            </span>
            <span className={$.priceValue}>130,000원</span>
          </div>
          <NavLink className={$.priceLink} to="/more">
            더보기
            <MoreArrow className={$.moreArrow} />
          </NavLink>
        </div>
      </div>
      <div className={$.detail}>
        <strong className={$.detailTitle}>상세이미지</strong>
        <ImageList isMoreContents />
      </div>
    </div>
  );
}

export default Detail;
