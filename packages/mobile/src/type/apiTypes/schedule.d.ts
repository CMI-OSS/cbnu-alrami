declare namespace res {
  type Schedule = {
    id: number;
    content: string;
    priority: number;
    isHoliday: boolean;
    startDate: string;
    endDate: string;
  };
}

declare namespace req {
  type Schedule = {
    year: number;
    today: string;
  };
}
