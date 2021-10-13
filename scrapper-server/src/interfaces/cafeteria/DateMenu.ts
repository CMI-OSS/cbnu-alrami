//몽고DB용

export interface DateMenu {
  cafeteria: string;
  date: Date;
  kind: string; //백반, 백반특식, 일품, 백반은 점심,저녁 이외 점심만
  time: string; //점심 or저녁
  mainMenu: string;
  menus: string[];
  price: number[];
}
