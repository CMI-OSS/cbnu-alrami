declare namespace res {
  type Cafeteria = {
    id: number;
    content: string;
    time: number;
  };
}

declare namespace req {
  type Cafeteria = {
    cafeteriaId: number;
    date: string;
  };
}
