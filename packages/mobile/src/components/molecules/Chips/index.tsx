import { NavLink } from "react-router-dom";

import classNames from "classnames";
import { useAppDispatch } from "src/store";
import { setHashMenu } from "src/store/placeSlice";

import $ from "./style.module.scss";

type ItemProps = {
  id: number;
  name: string;
  path: string;
};

type Props = {
  list: ItemProps[];
};

function Chips({ list }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div className={$.hash}>
      {list.map((item, idx) => {
        return (
          <NavLink
            key={`menu-${item.id}`}
            to={item.path}
            className={({ isActive }) =>
              classNames($.hash_link, isActive ? $.active : "")
            }
            onClick={() => dispatch(setHashMenu({ hashNumber: idx }))}
          >
            {item.name}
          </NavLink>
        );
      })}
    </div>
  );
}

export default Chips;
