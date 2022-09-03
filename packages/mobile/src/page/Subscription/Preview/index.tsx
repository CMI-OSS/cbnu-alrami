import { LeftArrow } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import { useBoardArticlesQuery } from "@hooks/api/article";
import { useIntersect } from "@hooks/UseIntersect";
import { useBoardTree } from "src/api/boardTree";
import { useSubscribeBoards } from "src/api/subscribe";
import guideEmptyNotice from "src/assets/guide_empty_notice.png";
import useSearch from "src/hooks/useSearch";
import Article from "src/page/Notice/Article";

import Status from "../Status";
import $ from "./style.module.scss";

function Preview() {
  const boardId = Number(useSearch({ target: "boardId" }));
  const { data: boardData } = useBoardTree(boardId);
  const {
    data: articleData,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useBoardArticlesQuery(boardId);
  const { data: subscribeData } = useSubscribeBoards();
  const articles = articleData?.pages;

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      await fetchNextPage();
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
      <div className={$["notification-list"]}>
        {articles?.map((article) => {
          return article.contents.map((articleData) => {
            const { id, title, date, hits, scraps } = articleData;
            const breadcrumb = `${articleData.board.parent?.name} > ${articleData.board.name}`;
            return (
              <Article
                key={id}
                {...{ id, title, date, hits, scraps, breadcrumb }}
              />
            );
          });
        })}
        <div ref={ref} />
      </div>
    </FullPageModalTemplate>
  );
}

export default Preview;
