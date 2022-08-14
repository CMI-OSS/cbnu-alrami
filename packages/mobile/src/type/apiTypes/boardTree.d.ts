declare namespace res {
  type BoardTrees = {
    id: number;
    name: string;
    url?: string;
    isSubscribing?: boolean;
    isNoticing?: boolean;
    children?: BoardTrees[];
  };

  type BoardTree = {
    "id": number,
    "name": string,
    "parent": {
      BoardTree
    }
  }
}

declare namespace req {
  type BoardTree = {
    uuid: string;
  };
}
