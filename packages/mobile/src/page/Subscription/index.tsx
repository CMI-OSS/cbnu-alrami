import { Link, useLocation } from "react-router-dom";

import { useBeginningBoardTree, useBoardTreeByBoard } from "src/api/boardTree";
import BorderBox from "src/components/atoms/BorderBox";
import useSearch from "src/hooks/useSearch";
import SubscriptionModalTemplate from "src/page/Subscription/SubscriptionModalTemplate";

import $ from "./style.module.scss";

function Subscription() {
  const originBoardIds = useSearch({ target: "boardId" });
  const boardIds = originBoardIds?.split(",");

  const boardTrees = boardIds?.length
    ? useBoardTreeByBoard(boardIds)
    : useBeginningBoardTree();

  console.log(boardTrees);
  return (
    <SubscriptionModalTemplate>
      <div className={$.guide}>
        <div className={$.breadcrumb}>{boardTrees.breadcrumb}</div>
        {/* <div className={$.phrase}>{boardTrees.guide}</div> */}
      </div>
      {boardTrees?.content?.map((boardTree) => {
        const newBoardIds = boardIds
          ? [ ...boardIds, boardTree.id ]
          : [ boardTree.id ];
        return (
          <Link
            to={`${useLocation().pathname}?boardId=${newBoardIds}`}
            key={boardTree.id}
          >
            <BorderBox height={87} background="#F6F5FB" className={$.content}>
              <span className={$.name}>{boardTree.name}</span>
              {boardTree?.description && (
                <span className={$.description}>{boardTree?.description}</span>
              )}
            </BorderBox>
          </Link>
        );
      })}
    </SubscriptionModalTemplate>
  );
}

export default Subscription;
