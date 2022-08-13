declare namespace res {
  type SubscriptionBoard = {
    id: number;
    name: string;
    isNoticing: boolean;
    parents: {
      id: number;
      name: string;
    }[];
  };
}
