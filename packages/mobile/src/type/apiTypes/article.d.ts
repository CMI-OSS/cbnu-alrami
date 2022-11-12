declare namespace res {
  type BoardArticle = {
    id: number;
    board: Board;
    title: string;
    hits: number;
    scraps: number;
    date: Date;
  };
  type Board = {
    id: number;
    name: string;
    parent?: Board;
  };
  type Image = {
    id: number;
    url: string;
  };
  type Article = {
    id: number;
    board: Board;
    title: string;
    content: string;
    hits: number;
    scraps: number;
    date: string;
    images: Image[];
    isBookmark?: boolean;
    // TODO: 백엔드 res 확인하기
    url: string;
  };
}

declare namespace req {
  type Article = {
    articleId: number;
    boardId: number;
  };
  type Pagination = {
    pageNo: number;
    boardId?: number;
  };
}
