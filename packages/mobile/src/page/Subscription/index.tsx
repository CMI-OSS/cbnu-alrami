import { useBoardTreesQuery } from "@hooks/api/boardTree";
import useSearch from "src/hooks/useSearch";
import Selector from "src/page/Subscription/Selector";
import SubscriptionModalTemplate from "src/page/Subscription/SubscriptionModalTemplate";

import Guide from "./Guide";
import $ from "./style.module.scss";

const getBreadcrumb = (boardNames: string[]) => {
  let breadcrumb = "전체 > ";
  for (let i = 0; i < boardNames.length; i += 1) {
    const boardName = boardNames[i];
    breadcrumb += `${boardName} > `;
  }
  return breadcrumb.slice(0, -3);
};

const getBoardTrees = (boardIds: string[], data: res.BoardTrees[]) => {
  let boardTrees = data;
  for (let i = 0; i < boardIds.length; i += 1) {
    const boardId = boardIds[i];
    boardTrees =
      boardTrees.find((boardTree) => {
        return boardTree.id === Number(boardId);
      })?.children || [];
  }
  return boardTrees;
};

function Subscription() {
  const boardNames = useSearch({ target: "boardName" })?.split(",") || [];
  const boardIds = useSearch({ target: "boardId" })?.split(",") || [];
  const { data } = useBoardTreesQuery();
  if (!data) return <></>;
  const breadcrumb = getBreadcrumb(boardNames);
  const boardTrees = getBoardTrees(boardIds, data);

  return (
    <SubscriptionModalTemplate>
      <div className={$.guide}>
        <div className={$.breadcrumb}>{breadcrumb}</div>
        <Guide boardTrees={boardTrees} />
      </div>
      {boardTrees.map((boardTree) => {
        const { name, id } = boardTree;
        const newBoardNames = boardNames ? [ ...boardNames, name ] : [ name ];
        const newBoardIds = boardIds ? [ ...boardIds, `${id}` ] : [ `${id}` ];
        return (
          <Selector
            boardNames={newBoardNames}
            boardIds={newBoardIds}
            boardTree={boardTree}
          />
        );
      })}
    </SubscriptionModalTemplate>
  );
}

export default Subscription;
