import { NavLink, useNavigate } from "react-router-dom";

import { Call, LeftArrow, Map, Time } from "@components/atoms/icon";
import ImageList from "@components/molecules/ImageList";
import BorderBox from "src/components/atoms/BorderBox";

import detailImageList from "../../../__mocks__/detailImageList";
import $ from "./style.module.scss";

function MapDetail() {
  const navigate = useNavigate();
  const imageUrl =
    "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20180130_263%2F1517301583613dwuaL_JPEG%2FZh5SeEjUT12rWxcLJ2nstPaB.jpg";

  return (
    <div className={$.wrap}>
      <div className={$.header}>
        <button
          type="button"
          className={$["detail-button"]}
          onClick={() => {
            return navigate(-1);
          }}
        >
          <LeftArrow stroke="#fff" size={16} />
          <span className="blind">ㄴㅁㅇㄹ뒤로 가기</span>
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
      <BorderBox className={$.info}>
        <div className={$["info-inner"]}>
          <span className={$.text}>N15 / (구) 057</span>
          <strong className={$.title}>충북대학교 사회과학대학</strong>
          <ul className={$.list}>
            <li className={$.item}>
              <Map size={14} stroke="#aaa" />
              <span className={$["item-text"]}>
                충청북도 청주시 흥덕구 사창동 470
              </span>
            </li>
            <li className={$.item}>
              <Call size={18} stroke="#aaa" />
              <span className={$["item-text"]}>
                000-0000-0000 <br />
                000-0000-000
              </span>
            </li>
            <li className={$.item}>
              <Time size={18} stroke="#aaa" />
              <span className={$["item-text"]}>오전 9:00 ~ 오후 6:00</span>
            </li>
          </ul>
          <div className={$.error}>
            <NavLink className={$["error-link"]} to="/error">
              오류 신고
            </NavLink>
          </div>
        </div>
      </BorderBox>
      <BorderBox className={$.menu}>
        <strong className={$["description-title"]}>설명</strong>
        <p className={$["description-text"]}>
          유구한 역사와 전통에 빛나는 우리 대한국민은 3ㆍ1운동으로 건립된
          대한민국임시정부의 법통과 불의에 항거한 4ㆍ19민주이념을 계승하고,
          조국의 민주개혁과 평화적 통일의 사명에 입각하여 정의ㆍ인도와
          동포애로써 민족의 단결을 공고히 하고, 모든 사회적 폐습과 불의를
          타파하며, 자율과 조화를 바탕으로 자유민주적 기본질서를 더욱 확고히
          하여 정치ㆍ경제ㆍ사회ㆍ문화의
        </p>
      </BorderBox>
      <BorderBox className={$.detail}>
        <strong className={$["detail-title"]}>상세이미지</strong>
        <ImageList isMoreContents detailImageList={detailImageList} />
      </BorderBox>
    </div>
  );
}

export default MapDetail;
