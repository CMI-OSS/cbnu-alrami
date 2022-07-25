declare namespace res {
  type BoardTreeChildren = {
    id: number;
    name: string;
    url: string;
    isSubscribing: boolean;
    isNoticing: boolean;
    children?: BoardTreeChildren[];
  };
  type BoardTree = {
    id: number;
    name: string;
    children: BoardTreeChildren[];
  };
}

declare namespace req {
  type BoardTree = {
    uuid: string;
  };
}
