import axios from "../common/http";

interface CreateArticleProps {
  boardId: string;
  article: {
    title: string;
    content: string;
    url: string;
    date: string;
    images: Array<string>;
  };
}

export function createArticle({ boardId, article }: CreateArticleProps) {
  return axios.post(`/boards/${boardId}/article`, article);
}

interface IsDuplicationArticleProps {
  url: string;
}

export function isDuplicationArticle({ url }: IsDuplicationArticleProps) {
  return axios.get<{ isDuplication: boolean }>(
    `/articles/duplication?url=${encodeURIComponent(url)}`,
  );
}
