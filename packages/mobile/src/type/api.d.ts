export type Pagination<T> = {
  pagination: {
    isEnd: boolean;
    totalItemCount: number;
    totalPageCount: number;
    pageNumber: number;
  };
  contents: T[];
};
