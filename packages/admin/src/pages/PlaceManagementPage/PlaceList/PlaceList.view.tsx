/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { PlaceSchoolDto } from "@shared/swagger-api/generated/models/PlaceSchoolDto";
import classnames from "classnames";

import $ from "./PlaceList.module.scss";

interface Props {
  places: PlaceSchoolDto[];
  onClickPlace: (placeId: number) => void;
}

export default function PlaceListView({ places, onClickPlace }: Props) {
  return (
    <div className={$.table}>
      <div className={classnames($.row, $.header)}>
        <div className={classnames($.cell, $.id)}>ID</div>
        <div className={classnames($.cell, $.title)}>이름</div>
        <div className={classnames($.cell, $.scraps)}>주소</div>
        <div className={classnames($.cell, $.id)}>건물 구역</div>
      </div>
      {places.map((place) => (
        <div
          className={$.row}
          key={place.id}
          onClick={() => onClickPlace(place.id)}
        >
          <div className={classnames($.cell, $.id)}>{place.id}</div>
          <div className={classnames($.cell, $.title)}>{place.name}</div>

          <div className={classnames($.cell)}>{place.address}</div>
          <div className={classnames($.cell)}>{place.school?.area}</div>
        </div>
      ))}
    </div>
  );
}
