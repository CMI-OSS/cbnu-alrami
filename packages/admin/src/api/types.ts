export interface Board {
  id: number;
  name: string;
  parent?: Board;
}

export type AuthorityBoard = Board;

export interface Article {
  id: number;
  board: Board;
  title: string;
  hits: number;
  scraps: number;
  date: string;
  updatedAt: string;
}

export interface ArticlePage {
  pagination: {
    isEnd: boolean;
    pageNumber: number;
    totalItemCount: number;
    totalPageCount: number;
  };
  contents: Article[];
}
