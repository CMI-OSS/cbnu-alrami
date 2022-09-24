declare namespace res {
  type BoardTrees = {
    id: number;
    name: string;
    children?: BoardTrees[];
    url?: string;
    isSubscribing?: boolean;
    isNoticing?: boolean;
  };

  type BoardTree = {
    id: number;
    name: string;
    parent: {
      BoardTree;
    };
  };
}

declare namespace req {
  type BoardTree = {
    boardId: number;
  };
}
