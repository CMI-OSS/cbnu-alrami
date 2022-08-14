const script = {
  baseUrl: "https://dorm.chungbuk.ac.kr/home/sub.php?menukey=20041&type=",
  site: "학생생활관",
  category: "식단",
  domitory: "본관",
  typeQuery: "1",
  cafeteriaId:1,
  timeIndex: {
    morning: "1",
    lunch: "2",
    evening: "3",
  },

  waitMainTableSelector: ".contTable_c.m_table_c.margin_t_30 > tbody",

  getFoodList: function () {
    const mainTableBody = document.querySelector(this.waitMainTableSelector);
    const weekTableRows = mainTableBody.querySelectorAll("tr");
    // 본관: [월 ~ 금]
    // 양진재, 양성재: [일 ~ 토]

    const restaurant_name = this.domitory;

    let result = [];

    for (const eachRow of weekTableRows) {

      const foodCells = eachRow.querySelectorAll("td");

      for (const eachCell of foodCells) {
        if(eachCell.className === 'foodday') continue;

        result.push({
          restaurant_name,
          food_name: eachCell.innerText,
          date:eachRow.id,
          time: Number(this.timeIndex[eachCell.className]),
          cafeteriaId:this.cafeteriaId
        });
      }
    }
    return result;
  },
};

module.exports = script;
