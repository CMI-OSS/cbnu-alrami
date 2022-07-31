declare namespace res {
  type Popular = {
    id: number;
    title: string;
  };
  type Board = {
    id: number;
    name: string;
    parent?: Board;
  };
  type ArticleByBoardId = {
    id: number;
    board: Board;
    title: string;
    hits: number;
    scraps: number;
    dates: string;
  };
}
