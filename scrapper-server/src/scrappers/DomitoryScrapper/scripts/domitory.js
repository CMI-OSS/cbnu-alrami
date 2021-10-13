const script = {
  baseUrl: "https://dorm.chungbuk.ac.kr/home/sub.php?menukey=20041&type=",
  site: "학생생활관",
  category: "식단",
  domitories: [
    {
      name: "본관",
      typeQuery: "1",
    },
    {
      name: "양진재",
      typeQuery: "2",
    },
    {
      name: "양성재",
      typeQuery: "3",
    },
  ],

  timeIndex: {
    morning: "1",
    lunch: "2",
    evening: "3",
  },

  waitMainTableSelector: ".contTable_c.m_table_c.margin_t_30 > tbody",

  getFoodList: function (domitoryIndex) {
    const mainTableBody = document.querySelector(this.waitMainTableSelector);
    const weekTableRows = mainTableBody.querySelectorAll("tr");
    // 본관: [월 ~ 금]
    // 양진재, 양성재: [일 ~ 토]

    const restaurant_name = this.domitories[domitoryIndex].name;

    let result = [];

    for (const eachRow of weekTableRows) {
      const [day, date] = this.getDateInfo(eachRow);

      const foodCells = eachRow.querySelectorAll("td:nth-child(n+2)");

      for (const eachCell of foodCells) {
        const [foodTime, foodNameString] = this.getFoodInfo(eachCell);

        result.push({
          restaurant_name,
          food_name: foodNameString,
          date,
          day,
          time: this.timeIndex[foodTime],
        });
      }
    }
    return result;
  },

  getDateInfo: function (row) {
    const dateCell = row.querySelector("td");
    const isStrongTagExist = dateCell.querySelector("strong") ? true : false;
    // 당일 날짜가 <strong></strong> 으로 한번 더 감싸져 있음.

    const dateTextOuterTag = isStrongTagExist
      ? dateCell.querySelector("strong")
      : dateCell;

    const dateTexts = dateTextOuterTag.innerText.split(/\n/);
    // 개행문자로 요일과 날짜가 구분되어 있음.
    // ex) "월요일 \n 2021-10-12 \n" => ["월요일", "2021-10-12", ""]

    const day = dateTexts[0][0].trim(); // 월요일 => 월
    const date = dateTexts[1].trim();

    return [day, date];
  },

  getFoodInfo: function (cell) {
    const foodTime = cell.className;
    const foodNameString = cell.innerText.replace(/\n/g, " ").trim();
    // 개행문자로 구분되어 있는 각각의 메뉴를 공백문자로 구분함.

    return [foodTime, foodNameString];
  },
};

module.exports = script;
