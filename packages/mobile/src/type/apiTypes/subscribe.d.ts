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
