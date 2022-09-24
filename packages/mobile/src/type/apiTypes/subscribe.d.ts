declare namespace res {
  type SubscriptionBoard = {
    boardId: number;
    name: string;
    isNoticing: boolean;
    parents: {
      id: number;
      name: string;
    }[];
  };
}

declare namespace req {
  type Subscribe = {
    boardId: number
  }
}