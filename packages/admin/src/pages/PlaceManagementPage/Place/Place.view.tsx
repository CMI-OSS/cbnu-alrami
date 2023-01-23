import { PlaceItem } from "src/newApi/placeApi/getPlace";

import $ from "./Place.module.scss";

export interface PlaceViewProps extends PlaceItem {
  onClickEdit: () => void;
  onClickDelete: () => void;
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
  const { school, images, onClickImage, onClickEdit, onClickDelete } = props;
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

  return (
    <>
      <article className={$.article}>
        <h2 className={$.title}>{name}</h2>
        <hr className={$.hr} />
        {engs.map((eng, idx) => {
          if (eng)
            return (
              <div className={$.content} key={hanguls[idx] + eng}>
                <span className={$.bold}>{hanguls[idx]}: </span>
                <span className={$.text}>{eng}</span>
              </div>
            );
          return null;
        })}

        <div className={$["image-list"]}>
          {images?.length &&
            images.map((image, index) => {
              return (
                <div className={$["image-card"]} key={image.id}>
                  <div
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
        <button type="button" className={$.button} onClick={onClickEdit}>
          수정
        </button>
        <button type="button" className={$.button} onClick={onClickDelete}>
          삭제
        </button>
      </div>
    </>
  );
}
