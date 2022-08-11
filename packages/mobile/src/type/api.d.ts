export type Pagination<T> = {
  pagination: {
    isEnd: boolean;
  };
  contents: T[];
};
