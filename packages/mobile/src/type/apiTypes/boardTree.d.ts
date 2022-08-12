declare namespace res {
  type BoardTree = {
    id: number;
    name: string;
    url?: string;
    isSubscribing?: boolean;
    isNoticing?: boolean;
    children?: BoardTree[];
  };
}

declare namespace req {
  type BoardTree = {
    uuid: string;
  };
}
