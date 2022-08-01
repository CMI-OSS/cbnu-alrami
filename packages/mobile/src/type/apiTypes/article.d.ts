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
}
