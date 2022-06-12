import { useState } from "react";
import { NavLink } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "src/store";
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
  const { hashNumber } = useAppSelector((state) => state.placeReducer.hash);
  const dispatch = useAppDispatch();

  return (
    <div className={$.hash}>
      {list.map((item, idx) => {
        return (
          <NavLink
            key={`menu-${item.id}`}
            to={item.path}
            className={$.hash_link}
            onClick={() => dispatch(setHashMenu({ hashNumber: idx }))}
            aria-selected={hashNumber === idx}
          >
            {item.name}
          </NavLink>
        );
      })}
    </div>
  );
}

export default Chips;
