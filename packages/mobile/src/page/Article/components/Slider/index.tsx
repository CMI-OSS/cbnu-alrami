import { Link, useLocation } from "react-router-dom";

import { Star } from "@components/atoms/icon";
import { useSubscribeBoardsQuery } from "@hooks/api/board";
import classNames from "classnames";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  id: "bookmark" | "subscribe" | "popular" | string;
} & DefaultProps;

const SliderItem = ({ id, children }: Props) => {
  const kind = useLocation().pathname.split("/")[2];

  return (
    <Link
      className={classNames($["slider-item"], kind === id && $.active)}
      to={`/article/${id}`}
    >
      {children}
    </Link>
  );
};

function Slider() {
  const { data: subscribeBoardsData } = useSubscribeBoardsQuery();

  return (
    <div className={$.slider}>
      <SliderItem id="bookmark">
        <Star size={12} />
      </SliderItem>
      <SliderItem id="subscribe">최신</SliderItem>
      <SliderItem id="popular">인기</SliderItem>
      {subscribeBoardsData?.map((subscribeBoardData) => {
        const { id, combinedName } = subscribeBoardData;
        return (
          <SliderItem key={id} id={`${id}`}>
            {combinedName}
          </SliderItem>
        );
      })}
    </div>
  );
}

export default Slider;
