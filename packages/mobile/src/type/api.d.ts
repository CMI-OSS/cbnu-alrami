export type Pagination<T> = {
  pagination: {
    isEnd: boolean;
    pageNumber: number;
    totalItemCount: number;
    totalPageCount: number;
  };
  contents: T[];
};
