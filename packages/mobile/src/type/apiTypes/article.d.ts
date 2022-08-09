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
  type ArticleByBoard = {
    pagination: {
      isEnd: boolean;
    };
    contents: {
      id: number;
      board: Board;
      title: string;
      hits: number;
      scraps: number;
      dates: string;
    }[];
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
  };
}

// [
//   {
//     "id": 315,
//     "boardName": "학부공지",
//     "title": "[공지] 2022-2 1학년 지정반 수업시간표 안내",
//     "date": "2022-07-25T00:00:00.000Z",
//     "hits": 0,
//     "scraps": 1
//   },

declare namespace req {
  type Pagination = {
    pageNo: number;
  };
}
