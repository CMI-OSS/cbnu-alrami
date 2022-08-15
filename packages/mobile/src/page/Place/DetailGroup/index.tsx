import Spot from "src/page/Map/Spot";

import $ from "./style.module.scss";

type Props = {
  schoolDatas: res.School[];
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
                url={item.image?.url}
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
