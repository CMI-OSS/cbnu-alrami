import { useState } from "react";
import { Link } from "react-router-dom";

import { Setting, Star } from "@components/atoms/icon";
import classNames from "classnames";
import { DefaultProps } from "src/type/props";

import $ from "./style.module.scss";

type Props = {
  id: "북마크" | "최신" | "인기";
  kind: Props["id"] | string;
  setKind: (value: Props["kind"]) => void;
} & DefaultProps;

const SliderItem = ({ id, kind, setKind, className, children }: Props) => {
  return (
    <button
      type="button"
      className={classNames(
        className,
        $["slider-item"],
        kind === id && $.active,
      )}
      onClick={() => {
        return setKind(id);
      }}
    >
      {children}
    </button>
  );
};

function Article() {
  const [ kind, setKind ] = useState("최신");
  console.log({ kind });
  return (
    <div className={$.article}>
      <div className={$.header}>
        <span>공지사항</span>
        <Link to="/subscription">
          <Setting size={20} />
        </Link>
      </div>
      <div className={$.slider}>
        <SliderItem id="북마크" {...{ kind, setKind }}>
          <Star size={12} />
        </SliderItem>
        <SliderItem id="최신" {...{ kind, setKind }}>
          최신
        </SliderItem>
        <SliderItem id="인기" {...{ kind, setKind }}>
          인기
        </SliderItem>
      </div>
      <div className={$.content}></div>
    </div>
  );
}

export default Article;
