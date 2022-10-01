import { LeftArrow } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import { useBoardArticlesQuery } from "@hooks/api/article";
import { useBoardTreeQuery } from "@hooks/api/boardTree";
import { useIntersect } from "@hooks/UseIntersect";
import guideEmptyNotice from "src/assets/guide_empty_notice.png";
import { CMI_BOARD_ID } from "src/constants";
import useSearch from "src/hooks/useSearch";
import Article from "src/page/Notice/Article";

import Status from "../Status";
import $ from "./style.module.scss";

function Preview() {
  const boardId = Number(useSearch({ target: "boardId" }));
  const { data: boardData } = useBoardTreeQuery(boardId);
  const {
    data: articleData,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useBoardArticlesQuery(boardId);

  const articles = articleData?.pages;
  const type = boardId === CMI_BOARD_ID ? "cmi" : "cbnu";
  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      await fetchNextPage();
    }
  });

  return (
    <FullPageModalTemplate
      left={<LeftArrow stroke="#AAAAAA" size={16} />}
      title={boardData?.name}
      right={type === "cbnu" ? <Status boardId={boardId} /> : <></>}
    >
      {!articles?.[0].contents?.length && (
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
                {...{ id, title, date, hits, scraps, breadcrumb, type }}
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
