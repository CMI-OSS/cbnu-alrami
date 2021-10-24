//몽고DB용

interface Menu {
  //T: 식당 종류
  date: Date;
  mainMenu: string;
  menus: string[]; //0번 메인메뉴, 이하 생략
  price: number[]; //0번 일반가, 1번 조합원가
}

interface DateMenu {
  //T: 식당 종류
  kind: string; //백반, 백반특식, 일품, 백반은 점심,저녁 이외 점심만
  time: string; //점심 or저녁

  menuOfToday: Menu[];
}

export interface WeekMenu {
  startDay: Date;
  endDay: Date;
  cafeteriaMenu: DateMenu[][]; //[0] 한빛 [1] 별빛 [2] 은하수
}
