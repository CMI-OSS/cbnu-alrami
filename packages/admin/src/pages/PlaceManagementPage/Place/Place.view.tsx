import { useNavigate } from "react-router-dom";

import { PlaceItem } from "src/newApi/placeApi/getPlace";

import $ from "./Place.module.scss";

export interface PlaceViewProps extends PlaceItem {
  onClickImage: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number,
  ) => void;
}

const hanguls = [
  "위도",
  "경도",
  "주소",
  "연락처",
  "설명",
  "건물번호",
  "예전 건물번호",
  "위치",
];

export default function PlaceView(props: PlaceViewProps) {
  const { id, school, images, onClickImage } = props;
  const { name, latitude, longtitude, address, contact, description } = props;

  const engs = [
    latitude,
    longtitude,
    address,
    contact,
    description,
    school?.buildingNumber,
    school?.oldBuildingNumber,
    school?.area,
  ];

  const navigate = useNavigate();

  const handleClickEdit = () => {
    navigate(`/board/edit/articles/${id}`);
  };

  return (
    <>
      <article className={$.article}>
        <h2 className={$.title}>{name}</h2>
        <hr className={$.hr} />
        {engs.map((eng, idx) => {
          if (eng)
            return (
              <div className={$.content}>
                <span className={$.bold}>{hanguls[idx]}: </span>
                <span className={$.text}>{eng}</span>
              </div>
            );
          return null;
        })}

        <div className={$["image-list"]}>
          {images.length &&
            images.map((image, index) => {
              return (
                <div className={$["image-card"]}>
                  <div
                    key={image?.id}
                    className={$.image}
                    style={{ backgroundImage: `url(${image?.url})` }}
                    onClick={(e) => onClickImage(e, index)}
                  />
                </div>
              );
            })}
        </div>
      </article>
      <div style={{ textAlign: "center" }}>
        <input
          type="submit"
          value="수정"
          className={$.button}
          onClick={handleClickEdit}
        />
      </div>
    </>
  );
}
