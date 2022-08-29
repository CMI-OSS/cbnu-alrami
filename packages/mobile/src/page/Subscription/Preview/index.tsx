import { LeftArrow } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import { useIntersect } from "@hooks/UseIntersect";
import { useArticlesByBoard } from "src/api/article";
import { useBoardTree } from "src/api/boardTree";
import { useSubscribeBoards } from "src/api/subscribe";
import guideEmptyNotice from "src/assets/guide_empty_notice.png";
import useSearch from "src/hooks/useSearch";
import Article from "src/page/Notice/Article";

import Status from "../Status";
import $ from "./style.module.scss";

function Preview() {
  // TODO: 확인
  const boardId = Number(useSearch({ target: "boardId" }));
  const { data: boardData } = useBoardTree(boardId);
  const {
    data: articleData,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useArticlesByBoard({ boardId });
  const { data: subscribeData } = useSubscribeBoards();
  const articles = articleData?.contents;
  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && isFetching) {
      fetchNextPage();
    }
  });
  const subscribe = subscribeData?.find((data) => {
    return data.boardId === boardId;
  });

  return (
    <FullPageModalTemplate
      left={<LeftArrow stroke="#AAAAAA" size={16} />}
      title={boardData?.data.name}
      right={
        <Status
          boardId={boardId}
          isNoticing={!!subscribe?.isNoticing}
          isSubscribing={!!subscribe}
        />
      }
    >
      {!articles?.length && (
        <img
          className={$["empty-img"]}
          src={guideEmptyNotice}
          alt="공지사항 미존재"
        />
      )}
      <div className={$["notification-list"]} ref={ref}>
        {articles?.map(({ id, title, date, hits, breadcrumb, scraps }) => {
          return (
            <Article
              key={id}
              {...{ id, title, date, hits, breadcrumb, scraps }}
            />
          );
        })}
      </div>
    </FullPageModalTemplate>
  );
}

export default Preview;
