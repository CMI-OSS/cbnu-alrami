declare namespace res {
  type ArticleByBoard = {
    id: number;
    board: Board;
    title: string;
    hits: number;
    scraps: number;
    dates: string;
  };
}
