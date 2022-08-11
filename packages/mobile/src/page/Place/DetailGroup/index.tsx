import { NavLink } from "react-router-dom";

import $ from "./style.module.scss";

type Props = {
  schoolDatas: res.School[];
};

function DetailGroup({ schoolDatas }: Props) {
  return (
    <>
      <div className={$.content}>
        <div className={$.image_list}>
          {schoolDatas.map((item, idx) => {
            return (
              <NavLink
                to={`/place/school/detail/${idx + 1}`}
                className={$.item}
                key={item.id}
              >
                <img
                  className={$.school_image}
                  src={item?.images?.url}
                  alt={item.name}
                />
                <div className={$.summary}>
                  <strong className={$.summary_title}>{item.name}</strong>
                  <span className={$.summary_description}>{item.address}</span>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default DetailGroup;
