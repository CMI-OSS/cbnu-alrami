import { useState } from "react";
import { NavLink } from "react-router-dom";

import $ from "./style.module.scss";

type ItemProps = {
  id: number,
  name: string,
  path: string
}

type Props = {
  list: ItemProps[];
}

function Chips( { list } : Props) {
  const [ hash, setHash ] = useState(1);

  return (
    <div className={$.hash}>
      {list.map((item, idx) => {
        return (
          <NavLink
            key={`menu-${item.id}`}
            to={item.path}
            className={$.hash_link}
            onClick={() => setHash(idx)}
            aria-selected={hash === idx + 1}
          >
            {item.name}
          </NavLink>
        );
      })}
    </div>
  )
}

export default Chips;
