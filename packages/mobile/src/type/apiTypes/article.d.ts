declare namespace res {
  type ArticleByBoard = {
    id: number;
    board: Board;
    title: string;
    hits: number;
    scraps: number;
    date: string;
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
  };
}

declare namespace req {
  type Article = {
    articleId: number;
  };
  type Pagination = {
    boardId: number;
  };
}
