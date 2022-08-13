import { LeftArrow } from "@components/atoms/icon";
import FullPageModalTemplate from "@components/templates/FullPageModalTemplate";
import { useArticlesByBoard } from "src/api/article";
import { useBoardTreeByBoard } from "src/api/boardTree";
import guideEmptyNotice from "src/assets/guide_empty_notice.png";
import useSearch from "src/hooks/useSearch";
import Article from "src/page/Notice/Article";

import Status from "../Status";
import $ from "./style.module.scss";

function Preview() {
  const boardIds = useSearch({ target: "boardId" })?.split(",") || [];
  const boardTrees = useBoardTreeByBoard(boardIds);
  const { data } = useArticlesByBoard(Number(boardIds.at(-1)), {
    pageNo: 1,
  });
  const articles = data?.contents;

  return (
    <FullPageModalTemplate
      left={<LeftArrow stroke="#AAAAAA" size={16} />}
      title={boardTrees?.parent?.name}
      right={
        <Status
          boardId={boardTrees?.parent?.id}
          isNoticing={boardTrees?.parent?.isNoticing}
          isSubscribing={boardTrees?.parent?.isSubscribing}
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
