import { PlaceSchoolDto } from "@shared/swagger-api/generated";
import Spot from "src/page/Map/Spot";

import $ from "./style.module.scss";

type Props = {
  schoolDatas: PlaceSchoolDto[];
};

function DetailGroup({ schoolDatas }: Props) {
  return (
    <>
      <div className={$.content}>
        <div className={$.image_list}>
          {schoolDatas.map((item) => {
            return (
              <Spot
                schoolData={item}
                key={`contruction-${item.id}`}
                type="place"
                url={item.images![0]?.url}
                placeId={item.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default DetailGroup;
