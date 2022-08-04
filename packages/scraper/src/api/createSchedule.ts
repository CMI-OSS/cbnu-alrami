import axios from "../common/http";

interface CreateNoticeProps {
  boardId: string;
  article: {
    title: string;
    content: string;
    url: string;
    date: string;
    images: Array<string>;
  };
}

export function createNotice({ boardId, article }: CreateNoticeProps) {
  return axios.post(`/boards/${boardId}/article`, article);
}
