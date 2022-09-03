import { Link, useLocation } from "react-router-dom";

import BorderBox from "@components/atoms/BorderBox";
import { LongArrow } from "@components/atoms/icon";
import classNames from "classnames";
import Status from "src/page/Subscription/Status";

import $ from "./style.module.scss";

type Props = {
  boardNames: string[];
  boardIds: string[];
  boardTree: res.BoardTrees;
};

const getDescription = (name: string) => {
  if (name === "공통") return "충북대학교의 다양한 공지사항을 확인해요";
  if (name === "전공") return "전공 별 공지사항을 확인해요";
  if (name === "학생회") return "학생회의 공지를 받아볼 수 있어요";
  return "";
};

function Selector({ boardNames, boardIds, boardTree }: Props) {
  const { id, isSubscribing, isNoticing, name, url, children } = boardTree;
  const isLast = isSubscribing !== undefined && isNoticing !== undefined;
  const to = isLast
    ? `/preview?boardId=${id}`
    : `${useLocation().pathname}?boardId=${boardIds}&boardName=${boardNames}`;

  return (
    <div className={$.selector}>
      <Link to={to}>
        <BorderBox
          height={87}
          background="#F6F5FB"
          className={classNames(isLast ? $.status : $.content)}
        >
          <span className={$.name}>
            {name}
            {isLast && <LongArrow size={6} stroke="#aaaaaa" />}
          </span>
          {(name === "공통" || name === "전공" || name === "학생회") && (
            <span className={$.description}>{getDescription(name)}</span>
          )}
          {isLast && (
            <Status boardId={boardTree.id} {...{ isSubscribing, isNoticing }} />
          )}
        </BorderBox>
      </Link>
    </div>
  );
}

export default Selector;
