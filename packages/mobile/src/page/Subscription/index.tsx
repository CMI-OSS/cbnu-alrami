import { Link, useLocation } from "react-router-dom";

import {
  LongArrow,
  Subscription as SubscriptionIcon,
} from "@components/atoms/icon";
import classNames from "classnames";
import { useBoardTreeByBoard } from "src/api/boardTree";
import BorderBox from "src/components/atoms/BorderBox";
import useSearch from "src/hooks/useSearch";
import SubscriptionModalTemplate from "src/page/Subscription/SubscriptionModalTemplate";

import Status from "./Status";
import $ from "./style.module.scss";

const getDescription = (name: string) => {
  if (name === "공통") return "충북대학교의 다양한 공지사항을 확인해요";
  if (name === "전공") return "전공 별 공지사항을 확인해요";
  if (name === "학생회") return "학생회의 공지를 받아볼 수 있어요";
  return "";
};

const getGuide = (content: res.BoardTree[]) => {
  const id = String(content[0].id);
  if ((id === "1" || id === "2") && id.length === 1) {
    return `어떤 공지를\n받아볼까요?`;
  }
  if (id[0] === "1" && id.length === 3) {
    return `재학중인 단과대학을\n선택해주세요`;
  }
  if (id[0] === "1" && id.length === 5) {
    return `재학중인 학과를\n선택해주세요`;
  }
  if (id[0] === "2" && id.length === 3) {
    return `어떤 기관의 공지를\n받아볼까요?`;
  }
  if (id[0] === "3" && id.length === 3) {
    return `어떤 학생회의 공지를\n받아볼까요?`;
  }
  return `를 터치하여\n원하는 공지를 구독해요!`;
};

function Subscription() {
  const boardIds = useSearch({ target: "boardId" })?.split(",");

  const boardTrees = useBoardTreeByBoard(boardIds || []);
  if (!boardTrees.content) return <></>;
  return (
    <SubscriptionModalTemplate>
      <div className={$.guide}>
        <div className={$.breadcrumb}>{boardTrees.breadcrumb}</div>
        <div className={$.phrase}>
          {getGuide(boardTrees.content).at(-1) === "!" && (
            <SubscriptionIcon size={36} stroke="#aaaaaa" />
          )}
          {getGuide(boardTrees.content)}
        </div>
      </div>
      {boardTrees.content.map((boardTree) => {
        const { id, name, isSubscribing, isNoticing, children } = boardTree;
        const newBoardIds = boardIds ? [ ...boardIds, id ] : [ id ];
        return (
          <Link
            to={
              children
                ? `${useLocation().pathname}?boardId=${newBoardIds}`
                : `/preview?boardId=${newBoardIds}`
            }
            key={id}
          >
            <BorderBox
              height={87}
              background="#F6F5FB"
              className={classNames(
                isSubscribing !== undefined && isNoticing !== undefined
                  ? $.status
                  : $.content,
              )}
            >
              <span className={$.name}>
                {name}
                {isSubscribing !== undefined && isNoticing !== undefined && (
                  <LongArrow size={6} stroke="#aaaaaa" />
                )}
              </span>
              {(name === "공통" || name === "전공" || name === "학생회") && (
                <span className={$.description}>{getDescription(name)}</span>
              )}
              {isSubscribing !== undefined && isNoticing !== undefined && (
                <Status
                  boardId={boardTree.id}
                  {...{ isSubscribing, isNoticing }}
                />
              )}
            </BorderBox>
          </Link>
        );
      })}
    </SubscriptionModalTemplate>
  );
}

export default Subscription;
