import { Link, useLocation } from "react-router-dom";

import { Star } from "@components/atoms/icon";
import { useArticleSubscribeBoardsQuery } from "@hooks/api/subscribe1";
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
  const { data: articleSubscribeBoardsData } = useArticleSubscribeBoardsQuery({
    uuid: "1111",
  });

  return (
    <div className={$.slider}>
      <SliderItem id="bookmark">
        <Star size={12} />
      </SliderItem>
      <SliderItem id="subscribe">최신</SliderItem>
      <SliderItem id="popular">인기</SliderItem>
      {articleSubscribeBoardsData?.map((subscribeBoardData) => {
        const { id, name } = subscribeBoardData;
        return <SliderItem id={`${id}`}>{name}</SliderItem>;
      })}
    </div>
  );
}

export default Slider;
