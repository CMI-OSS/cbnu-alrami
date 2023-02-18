import { useState } from "react";
import { useParams } from "react-router-dom";

import { useArticleQuery } from "@hooks/api/article";

function Detail() {
  const { articleId } = useParams();
  const {
    data: article,
    error,
    isLoading,
  } = useArticleQuery(Number(articleId)!);
  const [ order, setOrder ] = useState(0);
  return <div></div>;
}

export default Detail;
