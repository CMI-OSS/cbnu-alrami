import $ from "./style.module.scss";

function ArticleItem() {
  return (
    <div className={$["article-item"]}>
      <div className={$["board-name"]}>제목</div>
      <div className={$.title}>충북대학교 인문대학 영상 공모전 안내</div>
      <div className={$.info}>
        <span>22-04-22</span>&nbsp;/&nbsp;<span>조회수&nbsp;123</span>
        &nbsp;/&nbsp;<span>좋아요&nbsp;55</span>
      </div>
    </div>
  );
}

export default ArticleItem;
