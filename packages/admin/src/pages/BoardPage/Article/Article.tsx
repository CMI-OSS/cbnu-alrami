import { useParams } from "react-router";

import ArticleView from "./Article.view";

export default function Article() {
  const { articleId } = useParams();

  return <ArticleView />;
}
