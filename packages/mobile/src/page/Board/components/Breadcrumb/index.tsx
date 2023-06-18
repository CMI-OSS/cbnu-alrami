import { Link } from "react-router-dom";

import { useAppSelector } from "src/store";

import $ from "./style.module.scss";

function Breadcrumb() {
  const { breadcrumb } = useAppSelector((state) => {
    return state.boardReducer;
  });

  return (
    <div className={$.breadcrumb}>
      {breadcrumb.map(({ name, path }) => {
        return (
          <div key={path} className={$["breadcrumb-item"]}>
            <Link className={$.link} to={`${path}`}>
              {name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Breadcrumb;
